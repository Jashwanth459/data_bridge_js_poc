/**
 *  handles Delete post functionality
 * @param {event} e - target event of delete button of the post
 */
function handleDeletePost(e) {
    // Asks user to confirm the delete post choice, if no -- does nothing
    
    if(e.target.id && confirm('Do you really want to delete the post..?')) {
        fetch(`http://localhost:3000/data/${e.target.id}`, {
            method: 'DELETE',
        }).then(response => { 
            window.open('/', '_self'); 
            return response.json();
        })
    }
}

/**
 * Handles submit button in the popup
 * @param {event} e - target event of submit button
 */
function handleSubmitPost (e) {
    e.preventDefault();
    if (e.target.id && confirm('Do you really want to update the post..?')) {
        let postTitle = document.getElementById('post_title')
        let postDescription = document.getElementById('post_description')
        fetch(`http://localhost:3000/data/${e.target.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postTitle.value,
                message: postDescription.value
            })
        }).then( () => {
            window.open('/', '_self');   
        })
    } else {
        return
    }
    
}

/**
 *  handles Edit post functionality
 * @param {event} e - target event of edit button of the post
 */
function handleEditPost(e) {
    var form_model = document.getElementById('my_modal')
    form_model.style.display = 'unset';
    var inputTitle = document.getElementById(`post_title_${e.target.id}`)
    var inputMessage = document.getElementById(`post_message_${e.target.id}`)

    var postTitle = document.getElementById('post_title')
    var postDescription = document.getElementById('post_description')
    var formPopup = document.getElementById('form_popup')
    // formPopup.onsubmit = null
    postTitle.value = inputTitle.innerText
    postDescription.value = inputMessage.innerText
    console.log('comeon', formPopup)
    formPopup.onsubmit = function() {
        handleSubmitPost(e)
    }
    // formPopup.addEventListener("submit", handleSubmitPost)
    // formPopup.setAttribute('onsubmit', () => {
    //     handleSubmitPost(e)
    // })
    console.log('comeon', formPopup)
}

