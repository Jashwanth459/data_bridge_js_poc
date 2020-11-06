var slideIndex = 0; 
showSlides(); // call showslide method 
   
function showSlides() { 
    // var i; 
    // var slides = document.getElementsByClassName("image-sliderfade");  
    // var dots = document.getElementsByClassName("dot");  
    // for (i = 0; i < slides.length; i++) { 
    //     slides[i].style.display = "none";  
    // } 
    // slideIndex++;  
   
    // if (slideIndex > slides.length) { 
    //     slideIndex = 1; 
    // } 
   
    // for (i = 0; i < dots.length; i++) { 
    //     dots[i].className = dots[i].className. 
    //                         replace(" active", ""); 
    // } 
   
    // slides[slideIndex - 1].style.display = "block"; 
    // dots[slideIndex - 1].className += " active"; 
  
    // setTimeout(showSlides, 1000);  
} 

function carouselPrevClick(e) {
    let oppositeMatching = {next: 'prev', prev: 'next'}
    var carouselButton = document.getElementById(e.target.id);
    var tracking_id = e.target.id.split('_')
    let carousel_id = `carousel_${tracking_id[1]}`
    var carouselImages  = document.getElementById(carousel_id)
    var carouselImagesList = carouselImages.getElementsByClassName('image-sliderfade')
    var dots = carouselImages.getElementsByClassName('dot')
    carouselImagesList[tracking_id[2]-1].className = 'image-sliderfade fade'
    dots[tracking_id[2]-1].className = 'dot'

    if (tracking_id[0] === 'prev') {
        var nextCarouselbutton = document.getElementById(`${oppositeMatching[tracking_id[0]]}_${tracking_id[1]}_${tracking_id[2]}`)
        if (tracking_id[2] == 1) {
            carouselImages.getElementsByClassName('image-sliderfade')[carouselImagesList.length-1].className = 'image-sliderfade fade active'
            dots[carouselImagesList.length-1].className = 'dot active' 
            tracking_id[2] = carouselImagesList.length;
            console.log(tracking_id[2])
            nextCarouselbutton.id = `next_${tracking_id[1]}_${tracking_id[2]}`
            carouselButton.id = `prev_${tracking_id[1]}_${tracking_id[2]}`
        } else {
            carouselImages.getElementsByClassName('image-sliderfade')[tracking_id[2]-2].className = 'image-sliderfade fade active'
            dots[tracking_id[2]-2].className = 'dot active' 
            tracking_id[2] = tracking_id[2]-1;
            nextCarouselbutton.id = `next_${tracking_id[1]}_${tracking_id[2]}`
            carouselButton.id = `prev_${tracking_id[1]}_${tracking_id[2]}`
        }
    }
    if (tracking_id[0] === 'next') {
        var prevCarouselbutton = document.getElementById(`prev_${tracking_id[1]}_${tracking_id[2]}`)
        if (carouselImagesList.length == tracking_id[2]) {
            carouselImages.getElementsByClassName('image-sliderfade')[0].className = 'image-sliderfade fade active'
            dots[0].className = 'dot active' 
            tracking_id[2] = 1;
            prevCarouselbutton.id = `prev_${tracking_id[1]}_1`
            carouselButton.id = `next_${tracking_id[1]}_1`
        } else {
            carouselImages.getElementsByClassName('image-sliderfade')[tracking_id[2]].className = 'image-sliderfade fade active'
            dots[tracking_id[2]].className = 'dot active' 
            tracking_id[2] = Number(tracking_id[2])+1;
            prevCarouselbutton.id = `prev_${tracking_id[1]}_${tracking_id[2]}`
            carouselButton.id = `next_${tracking_id[1]}_${tracking_id[2]}`
        }
    }
}

// function carouselNextClick(e) {
//     var carouselButton = document.getElementById(e.target.id);
//     var tracking_id = e.target.id.split('_')
//     let carousel_id = `carousel_${tracking_id[1]}`
//     var carouselImages  = document.getElementById(carousel_id)
//     var prevCarouselbutton = document.getElementById(`prev_${tracking_id[1]}_${tracking_id[2]}`)
//     var carouselImagesList = carouselImages.getElementsByClassName('image-sliderfade')
//     var dots = carouselImages.getElementsByClassName('dot')
//     carouselImagesList[tracking_id[2]-1].className = 'image-sliderfade fade'
//     dots[tracking_id[2]-1].className = 'dot'

//     if (carouselImagesList.length == tracking_id[2]) {
//         carouselImages.getElementsByClassName('image-sliderfade')[0].className = 'image-sliderfade fade active'
//         dots[0].className = 'dot active' 
//         tracking_id[2] = 1;
//         prevCarouselbutton.id = `prev_${tracking_id[1]}_1`
//         carouselButton.id = `next_${tracking_id[1]}_1`
//     } else {
//         carouselImages.getElementsByClassName('image-sliderfade')[tracking_id[2]].className = 'image-sliderfade fade active'
//         dots[tracking_id[2]].className = 'dot active' 
//         tracking_id[2] = Number(tracking_id[2])+1;
//         prevCarouselbutton.id = `prev_${tracking_id[1]}_${tracking_id[2]}`
//         carouselButton.id = `next_${tracking_id[1]}_${tracking_id[2]}`
//     }
// }

