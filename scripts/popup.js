var modal = document.getElementById("my_modal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

console.log(btn)
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
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
