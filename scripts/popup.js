var modal = document.getElementById("my_modal");
var btn = document.getElementById("add_new_post");
var span = document.getElementsByClassName("close")[0];
var post_submit = document.getElementById("post_submit");

console.log('hey', btn)
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

post_submit.onclick = function() {
  modal.style.display = "none";
}

window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
        modal.style.display = "none";
    }
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
