const typeWriter = function(txtEl, words, wait=2500) {
    this.txtEl =txtEl;
    this.words=words;
    //initirized  parameter.
    this.txt = '';
    this.wordIndex = 0;
    //which word are going on. array counter
    this.wait = parseInt(wait, 10);
    //same as parameter wait but it need to integer.
    console.log(this.wait, parseInt(wait, 10));
    this.type();
    //main arithmetic core.
    this.isDelet = false;
    //After typing anim we need to delet anim. it for that.
}




//type method



//init on Dom load
document.addEventListener('DOMContentLoaded', init);
//init App?
function init(){
    const txtEl = document.querySelector('.home__title');
    const words = JSON.parse(txtEl.getAttribute('data-words'));
    //data-wards is just string, so using JSON.parse, make them array
    const wait = txtEl.getAttribute('data-wait');
    // Init Typewiter(function init)
    new typeWriter(txtEl, words, wait);
}