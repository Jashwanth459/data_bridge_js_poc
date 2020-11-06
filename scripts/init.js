function init(page)
{
    document.getElementById('spinner').style = 'display: unset'
    fetch('http://localhost:3000/data', {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((res) => {
        window.posts_list = res
        prepareHTML(res, page)
        console.log(res);
    })
    .catch(function (error) {
        console.log(error);
    })
}
setTimeout(init, 2000)

function prepareHTML(res, page) {
    var container = document.getElementById('container')
    var posts_list = document.createElement('ul')
    posts_list.id = 'posts_list'
    posts_list.className = 'posts_list'
    document.getElementById('spinner').style = 'display: none'
    console.log('hey there', page)
    let pageNumber  = page ? Number(page && page[2]) ? page[2] : 4 : 1
    // let pageNumber  = Number(page && page[2]) || 1
    let dataLength = res.length
    console.log('length is', dataLength%2)
    // let roundedDataLength = dataLength%2 == 0 ? dataLength : dataLength+1
    if(pageNumber*2 == dataLength && pageNumber == 1) {
        let prev_button = document.getElementById('page_prev')
        prev_button.style = 'background-color: #bbbbbb;'
        let next_button = document.getElementById('next_prev_2')
        next_button.style = 'background-color: #bbbbbb;'

    } else if (pageNumber == 1) {
        if (page && page[2]) {
            let prev_button = document.getElementById(`page_prev_1`)
            prev_button.id = 'page_prev'
            let next_button = page && document.getElementById('page_next_3')
            next_button.id = `page_next_2`
            next_button.style = 'background-color: #8bc34a;'
            prev_button.style = 'background-color: #bbbbbb;'

        } else {
            let button = document.getElementById('page_prev')
            button.style = 'background-color: #bbbbbb;'
            let next_button = document.getElementById('page_next_2')
            next_button.style = 'background-color: #8bc34a;'
        }
    } else if(pageNumber*2 == dataLength) {
    
        let next_button = document.getElementById(`page_next_${page[2]}`)
        let prev_button = document.getElementById(`page_prev_${Number(page[2])-2}`)
        prev_button.id = `page_prev_${Number(page[2])-1}`
        next_button.id = 'page_next'
        next_button.style = 'background-color: #bbbbbb;'
        console.log('next button', next_button)
        // console.log('button ', button)
        prev_button.style = 'background-color: #8bc34a;'
        // console.log('button listen', button)
    } else if(page[1] == 'next') {
        let prev_button = page[2] == 2 ? document.getElementById(`page_prev`) : document.getElementById(`page_prev_${Number(page[2])-2}`)
        if(pageNumber*2 == dataLength) {
            let next_button = document.getElementById(`page_next_${page[2]}`)
            next_button.id = 'page_next'
            next_button.style = 'background-color: brown'
        } else {
            let next_button = document.getElementById(`page_next_${page[2]}`)
            next_button.id = `page_next_${Number(page[2])+1}`
            next_button.style = 'background-color: #8bc34a;'
        }
        prev_button.id = `page_prev_${Number(page[2])-1}`
        prev_button.style = 'background-color: #8bc34a;'
    }  else if(page[1] == 'prev') {
        let prev_button = document.getElementById(`page_prev_${page[2]}`)
        let next_button = page[2] == 3 ? document.getElementById(`page_next`) : document.getElementById(`page_next_${Number(page[2])+2}`)
        prev_button.id = `page_prev_${Number(page[2])-1}`
        next_button.id = `page_next_${Number(page[2])+1}`
        prev_button.style = 'background-color: #8bc34a;'
        next_button.style = 'background-color: #8bc34a;'
    }

    for (index=(pageNumber-1)*2; index<=pageNumber*2-1 && index<res.length;index++) {
        var element = res[index]
        let listElem = document.createElement('li')
        listElem.className = 'post_card'
        listElem.id = `post_${index+1}`
        var divElem = document.createElement('div')
        if (element?.media_content?.length > 0) {
            var carouselUnorderedList = document.createElement('ul')
            carouselUnorderedList.id = `carousel_${index+1}`
            carouselUnorderedList.className = 'carousel'
            element.media_content.forEach((media_element, media_index) => {
                let imageListElem = document.createElement('li')
                imageListElem.className = media_index == 0 ? 'image-sliderfade fade active' : 'image-sliderfade fade'

                let imgTag = document.createElement('img')
                imgTag.src = media_element
                imageListElem.appendChild(imgTag)
                carouselUnorderedList.appendChild(imageListElem)
            })

            let dots = document.createElement('ul')
            dots.className = 'active_dots'

            for(i=0; i<element.media_content.length; i++) {
                let dotElem = document.createElement('li')
                dotElem.className = i == 0 ? 'dot active' : 'dot'
                dots.appendChild(dotElem)
            }

            carouselUnorderedList.appendChild(dots)

            let prevImg = document.createElement('a')
            prevImg.className = 'carousel_slide prev'
            prevImg.id = `prev_${index+1}_1`
            prevImg.title = 'Previous Image'
            prevImg.text = '«'
            prevImg.addEventListener('click', carouselPrevClick)

            let nextImg = document.createElement('a')
            nextImg.className = 'carousel_slide next'
            nextImg.id = `next_${index+1}_1`
            nextImg.title = 'Next Image'
            nextImg.text = '»'
            nextImg.addEventListener('click', carouselPrevClick)

            carouselUnorderedList.appendChild(prevImg)
            carouselUnorderedList.appendChild(nextImg)

            divElem.appendChild(carouselUnorderedList)
        }

        let postHead = document.createElement('h3')
        postHead.textContent = element?.title || 'Click edit to add Title'
        // postHead.id = res.id

        let postMessage = document.createElement('p')
        postMessage.textContent = element?.message || 'Clck edit to add Description'

        divElem.appendChild(postHead)
        divElem.appendChild(postMessage)

        console.log(listElem, 'hey')
        listElem.appendChild(divElem)
        posts_list.appendChild(listElem)
        container.appendChild(posts_list)
        console.log(element)
        // internal_index++;
    }

    // res.data.forEach((element, index) => {
    //     let listElem = document.createElement('li')
    //     listElem.className = 'post_card'
    //     listElem.id = `post_${index+1}`
    //     var divElem = document.createElement('div')
    //     if (element?.media_content?.length > 0) {
    //         var carouselUnorderedList = document.createElement('ul')
    //         carouselUnorderedList.id = `carousel_${index+1}`
    //         carouselUnorderedList.className = 'carousel'
    //         element.media_content.forEach((media_element, media_index) => {
    //             let imageListElem = document.createElement('li')
    //             imageListElem.className = media_index == 0 ? 'image-sliderfade fade active' : 'image-sliderfade fade'

    //             let imgTag = document.createElement('img')
    //             imgTag.src = media_element
    //             imageListElem.appendChild(imgTag)
    //             carouselUnorderedList.appendChild(imageListElem)
    //         })

    //         let dots = document.createElement('ul')
    //         dots.className = 'active_dots'

    //         for(i=0; i<element.media_content.length; i++) {
    //             let dotElem = document.createElement('li')
    //             dotElem.className = i == 0 ? 'dot active' : 'dot'
    //             dots.appendChild(dotElem)
    //         }

    //         carouselUnorderedList.appendChild(dots)

    //         let prevImg = document.createElement('a')
    //         prevImg.className = 'carousel_slide prev'
    //         prevImg.id = `prev_${index+1}_1`
    //         prevImg.title = 'Previous Image'
    //         prevImg.text = '«'
    //         prevImg.addEventListener('click', carouselPrevClick)

    //         let nextImg = document.createElement('a')
    //         nextImg.className = 'carousel_slide next'
    //         nextImg.id = `next_${index+1}_1`
    //         nextImg.title = 'Next Image'
    //         nextImg.text = '»'
    //         nextImg.addEventListener('click', carouselPrevClick)

    //         carouselUnorderedList.appendChild(prevImg)
    //         carouselUnorderedList.appendChild(nextImg)

    //         divElem.appendChild(carouselUnorderedList)
    //     }

    //     let postHead = document.createElement('h3')
    //     postHead.textContent = element?.title || 'Click edit to add Title'

    //     let postMessage = document.createElement('p')
    //     postMessage.textContent = element?.message || 'Clck edit to add Description'

    //     divElem.appendChild(postHead)
    //     divElem.appendChild(postMessage)

    //     console.log(listElem, 'hey')
    //     listElem.appendChild(divElem)
    //     post_list.appendChild(listElem)
    //     console.log(element)
    // });
}
