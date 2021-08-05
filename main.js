'use strict'
//project silder
const rightArrow = document.querySelector(".silde__right");
const leftArrow = document.querySelector(".silde__left");
const projectScreen = document.querySelector(".silder__container");
const projectItems = Array.from(document.querySelectorAll(".project__item"));
const slideBtns = Array.from(document.querySelectorAll(".slide__btn"));
const projectWidth = projectItems[1].clientWidth ;




function pjcallback(entries, pjObserver) {
    entries.forEach(entry => {
        
        if(entry.isIntersecting && entry.intersectionRatio > 0){
            const findProjectIndex = (element) => {if(element.id == `${entry.target.id}`) return true; };
            const pjindex = projectItems.findIndex(findProjectIndex);

            let selectedBtn = slideBtns[pjindex];

            function activeSlideBtn() {
                slideBtns.forEach(entry =>{
                    if(selectedBtn.id == entry.id){
                        selectedBtn.classList.add("active");
                    } else{
                        entry.classList.remove("active");
                    }
                })
            };

            switch (pjindex){
                case 0: 
                    leftArrow.classList.add("display_none");
                    rightArrow.classList.remove("display_none");
                    activeSlideBtn();
                    
                    break;
                case 1 :
                    
                    leftArrow.classList.remove("display_none");
                    rightArrow.classList.add("display_none");
                    activeSlideBtn();
                    break;
                }
            }
        
        }
    )}

rightArrow.addEventListener("click", () => {
    projectScreen.style.transform = `translateX(-${projectWidth}px)`;
    console.log(projectScreen);
    console.log(projectWidth);
    });

leftArrow.addEventListener("click", () => {
    projectScreen.style.transform = `translateX(0px)`;
});


let pjOptions = {
    root: document.querySelector(".project__main"),
    rootmargin: '0px',
    threshold: 0.5
}

const pjObserver = new IntersectionObserver(pjcallback, pjOptions);

projectItems.forEach(project__item => pjObserver.observe(project__item));




// formspree.io API Scripts

const directForm = document.getElementById("contectForm");

async function handleSubmit(event) {
  event.preventDefault();
  let status = document.getElementById("direct__mail-status");
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: directForm.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.classList.add('success');
    status.innerHTML = "Successfully sent!";

    directForm.reset()
  }).catch(error => {
    status.classList.add('error');
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
directForm.addEventListener("submit", handleSubmit);


// toggle scrolling move
const arrowTop = document.querySelector('.arrowTop');

arrowTop.addEventListener('click', () =>{
    scrollTo('#home');
})

document.addEventListener('scroll', () => {

    if(window.scrollY > homeHeight/2){
        arrowTop.classList.add('visible');
    } else {
        arrowTop.classList.remove('visible');
    }}
)

function scrollTo (selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
};

// scrolling move trnasparent
const home = document.querySelector('#home');
const homeHeight = home.scrollHeight;
const screenWidth = window.innerWidth;

document.addEventListener('scroll', () => {
    if(screenWidth > 425){
        home.style.opacity = 1.2 - window.scrollY / homeHeight;
    }
});


//navbar active effect (더 세분화된 선택자 참고. map 메쏘드 공부 참고)
const sectionID =[
    '#home',
    '#skills',
    '#projects',
    '#about',
    '#connect' 
];
const sections = sectionID.map(id =>document.querySelector(id));
const navItems = sectionID.map(id =>document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectedIndex(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}
const observerOption = {
    root: null,
    rootmargin: 0,
    threshold:0.2,
};

function obvcallback(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionID.indexOf(`#${entry.target.id}`)
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index +1;
            } else {
                selectedNavIndex = index -1;
            }
        }
    }
    );
};

const observer = new IntersectionObserver( obvcallback, observerOption);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', ()=>{
    selectedIndex(navItems[selectedNavIndex]);
});

// navber scrolling color change

const navbar =  document.querySelector('#navbar');
const navbarHeights = navbar.scrollHeight;
document.addEventListener('scroll', () =>{
 if(navbarHeights < window.scrollY){
   navbar.classList.add('navbar-color');
 } else{
    navbar.classList.remove('navbar-color');
 }
}
)


// navber menu click scrolling
const checkBox = document.querySelector('#menu__icon');
const nav_menu = document.querySelector('.navbar__menu');
nav_menu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;}
    scrollTo(link);
    nav_menu.classList.remove('open');
    checkBox.checked = false;
})



// navbar toggle menu down
const menuicon = document.querySelector("#menu__icon");

menuicon.addEventListener('click', (e)=>{
    if(menuicon.checked === true){
        nav_menu.classList.add('open');
    } else {
        nav_menu.classList.remove('open');
    }
})


// Home typing text function part

const typeWriter = function(txtEl, words, wait=2500) {
    this.txtEl =txtEl;
    this.words=words;
    //initirized  parameter.
    this.txt = '';
    this.wordIndex = 0;
    //which word are going on. array counter
    this.wait = parseInt(wait, 10);
    //same as parameter wait but it need to integer.
    this.type();
    //main arithmetic core.
    this.isDelet = false;  //After typing anim we need to delet anim. it for that.

}

//type method

typeWriter.prototype.type = function(){
    // Current index of word = showing word from array
    const currentWord = this.wordIndex % this.words.length;   // wordindex is 0 so if using % ans length

    // Get full of text length  current word.
    const fulltxt = this.words[currentWord]; // this line read word from array.

    // Check if you want to delet
    if(this.isDelet){
        //delet function
        this.txt =fulltxt.substring(0, this.txt.length -1);
    } else {
        //add text
        this.txt =fulltxt.substring(0, this.txt.length +1); //만약 txt가 ''; 상태가 아니면 생성
    }
    // Insert txt into Elements
    this.txtEl.innerHTML=`<span class="text">${this.txt}</span>`;

    // initial type speed(change speed)
    let typeSpeed = 100;

    if(this.isDelet){
        typeSpeed /= 2;
    }



    //if word is finished work.
    if(!this.isDelet && this.txt === fulltxt){
        // making pause at end part
        typeSpeed = this.wait;
        // Set delete to true
        this.isDelet = true;

    } else if(this.isDelet && this.txt === '') {
        this.isDelet = false;
        // move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;

    }

    setTimeout(() => this.type(), typeSpeed)    //second parameter is millesecond = typing speed, main goal is each time we show up text
}


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
