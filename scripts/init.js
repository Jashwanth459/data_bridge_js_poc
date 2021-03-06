/**
 * it is used for initialsing/ updating content in complete application
 * @param {Page Information} page
 */
function render(page)
{
    document.getElementById('spinner').style = 'display: unset'
    fetch('http://localhost:3000/data', {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((res) => {
        window.posts_list = res
        prepareHTML(res, page)
    })
    .catch(function (error) {
        console.log('hey you ended up with error: ', error);
    })
}
// Initialising functionality when application starts
setTimeout(render, 1000)

/**
 * assists preparing HTML on initilisation, updation
 * @param {Data response from data source} res 
 * @param {Page Inforamtion} page 
 */
function prepareHTML(res, page) {
    var container = document.getElementById('container')
    var posts_list = document.createElement('ul')
    posts_list.id = 'posts_list'
    posts_list.className = 'posts_list'
    document.getElementById('spinner').style = 'display: none'
    const PAGENUMBER  = page ? Number(page && page[2]) ? page[2] : 4 : 1
    var dataLength = res.length
    var recentPosts = res.reverse()
    window.dataLength = Number(res[0].id)

    if(PAGENUMBER*2 <= dataLength && PAGENUMBER*2 > dataLength-2 && PAGENUMBER == 1) {
        let prev_button = document.getElementById('page_prev')
        prev_button.style = 'background-color: #bbbbbb;'
        let next_button = document.getElementById('next_prev_2')
        next_button.style = 'background-color: #bbbbbb;'
    } else if (PAGENUMBER == 1) {
        if (page && page[2]) {
            let prev_button = document.getElementById(`page_prev_1`)
            prev_button.id = 'page_prev'
            let next_button = dataLength == 4 || dataLength == 3 ? document.getElementById('page_next') : document.getElementById('page_next_3')
            next_button.id = `page_next_2`
            next_button.style = 'background-color: #8bc34a;'
            prev_button.style = 'background-color: #bbbbbb;'

        } else {
            let button = document.getElementById('page_prev')
            button.style = 'background-color: #bbbbbb;'
            let next_button = document.getElementById('page_next_2')
            next_button.style = 'background-color: #8bc34a;'
        }
    } else if(PAGENUMBER*2 == dataLength || PAGENUMBER*2 == dataLength+1) {
    
        let next_button = document.getElementById(`page_next_${page[2]}`)
        let prev_button = page[2] == 2 ? document.getElementById(`page_prev`) : document.getElementById(`page_prev_${Number(page[2])-2}`)
        prev_button.id = `page_prev_${Number(page[2])-1}`
        next_button.id = 'page_next'
        next_button.style = 'background-color: #bbbbbb;'
        prev_button.style = 'background-color: #8bc34a;'
    } else if(page[1] == 'next') {
        let prev_button = page[2] == 2 ? document.getElementById(`page_prev`) : document.getElementById(`page_prev_${Number(page[2])-2}`)
        if(PAGENUMBER*2 == dataLength) {
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
        let next_button = PAGENUMBER*2 < dataLength && PAGENUMBER*2 >= dataLength-2   ? document.getElementById(`page_next`) : document.getElementById(`page_next_${Number(page[2])+2}`)
        prev_button.id = `page_prev_${Number(page[2])-1}`
        next_button.id = `page_next_${Number(page[2])+1}`
        prev_button.style = 'background-color: #8bc34a;'
        next_button.style = 'background-color: #8bc34a;'
    }

    // Rendeting posts based on the page upon page initialisation or using pagination
    for (let index=(PAGENUMBER-1)*2; index<=PAGENUMBER*2-1 && index<res.length;index++) {
        let element = recentPosts[index]
        let listElem = document.createElement('li')
        listElem.className = 'post_card'
        listElem.id = `post_${index+1}`
        let divElem = document.createElement('div')

        if (element?.media_content?.length > 0) {
            let carouselUnorderedList = document.createElement('ul')
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
            prevImg.addEventListener('click', carouselButtonClick)

            let nextImg = document.createElement('a')
            nextImg.className = 'carousel_slide next'
            nextImg.id = `next_${index+1}_1`
            nextImg.title = 'Next Image'
            nextImg.text = '»'
            nextImg.addEventListener('click', carouselButtonClick)

            carouselUnorderedList.appendChild(prevImg)
            carouselUnorderedList.appendChild(nextImg)

            divElem.appendChild(carouselUnorderedList)
        }

        var deleteButton = document.createElement('button')
        deleteButton.className = 'delete_button'
        var deleteIcon = document.createElement('i')
        deleteIcon.className = 'fa fa-trash'
        deleteIcon.id = element.id
        deleteButton.appendChild(deleteIcon)
        deleteButton.id = element.id
        deleteButton.addEventListener('click', handleDeletePost)

        var editButton = document.createElement('button')
        editButton.className = 'edit_button'
        var editIcon = document.createElement('i')
        editIcon.className = 'fa fa-edit'
        editIcon.id = element.id
        editButton.appendChild(editIcon)
        editButton.id = element.id
        editButton.addEventListener('click', handleEditPost)
        
        divElem.appendChild(deleteButton)
        divElem.appendChild(editButton)

        var postHead = document.createElement('h2')
        postHead.className = 'post_title'       

        postHead.id = `post_title_${element.id}`
        postHead.textContent = element?.title || 'Click edit to add Title'

        var postMessage = document.createElement('p')
        postMessage.className = 'post_message'
        postMessage.id = `post_message_${element.id}`
        postMessage.textContent = element?.message || 'Clck edit to add Description'

        divElem.appendChild(postHead)
        divElem.appendChild(postMessage)

        listElem.appendChild(divElem)
        posts_list.appendChild(listElem)
        container.appendChild(posts_list)
    }
}
