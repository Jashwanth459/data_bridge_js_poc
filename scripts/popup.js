var modal = document.getElementById("my_modal");
var btn = document.getElementById("add_new_post");
var span = document.getElementsByClassName("close")[0];
var post_submit = document.getElementById("post_submit")
var formPopup = document.getElementById('form_popup')
var postTitle = document.getElementById('post_title')
var postDescription = document.getElementById('post_description')

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  postTitle.value = `What's Up`
  postDescription.value = `This is your first post here...`
  formPopup.addEventListener('submit', (event) => {
    handlePostSubmit(event)
  })
}

post_submit.onclick = function() {
  modal.style.display = "none";
}

// Hide Popup upon hitting ESC button in the keyboard
window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
        modal.style.display = "none";
        postTitle.value = `What's Up`
        postDescription.value = `This is your first post here...`
        formPopup.addEventListener('submit', (event) => {
          handlePostSubmit(event)
        })
    }
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    postTitle.value = `What's Up`
    postDescription.value = `This is your first post here...`
    formPopup.addEventListener('submit', (event) => {
      handlePostSubmit(event)
    })
  }
}
