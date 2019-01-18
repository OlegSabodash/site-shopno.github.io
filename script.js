let sectionServices = document.querySelector('.services');
let blockWrapperTeam = document.querySelectorAll('.wrapper-team div.cell-team');
let buttonsSwitch = document.querySelector('.buttons-switch');
let informationAboutSlide = document.querySelector('.information');
let wrapperCoverSlide = document.querySelector('.wrapper-cover');
let arrayImgForSectionAbout = ['https://my-full-house.com/wp-content/uploads/2016/08/home-office-2-800x1000.jpg',
    'https://my-full-house.com/wp-content/uploads/2016/11/slow-work-6-800x1000.jpg',
    'https://my-full-house.com/wp-content/uploads/2016/08/home-office-19-800x1000.jpg',
    'http://prodesign.od.ua/wp-content/uploads/2017/10/kitchen-prodesign-2-1-800x1000.jpg'
];
let arraySrcTeams = ['./image/worker1.png',
    './image/worker2.png',
    './image/worker3.png',
    './image/worker4.png',
    './image/worker5.png',
    './image/worker1.png']
let hamburger = document.querySelector('#checkbox2');
let navMenu = document.querySelector('nav');
let nextPrevBtn = document.querySelector('.next-prev-btn');
let stateBtn = 0;
let slides = document.querySelector('.wrapper-team-slider');

nextPrevBtn.parentNode.children[0].children[0].classList.add('active-btn');
buttonsSwitch.children[0].classList.add('active-btn');

function handlerInSectionService(e) {
    let block = e.target.parentNode.children;
    if (e.target.localName === 'button') {
        if (e.target.classList[0] === 'show-all') {
            sort(block);
            e.target.parentNode.classList.add('active');
        }
        else {
            sort(block);
            e.target.parentNode.classList.remove('active');
        }
    }
}

function sort(block) {
    for (let i = 1; i < block.length; i++) {
        if (block[i].className.indexOf('hide') !== -1) {
            block[i].classList.remove('hide');
        }
        else {
            block[i].classList.add('hide');
        }
    }
}

function addHandler(blockWrapperTeam) {
    for (let i = 0; i < blockWrapperTeam.length; i++) {
        blockWrapperTeam[i].addEventListener('mouseenter', handlerInSectionTeam);
        blockWrapperTeam[i].addEventListener('mouseleave', handlerInSectionTeam);
    }
}
function handlerInSectionTeam(e) {
    if (e.type === 'mouseenter') {
        e.target.children[0].classList.remove('hide');
    }
    if (e.type === 'mouseleave') {
        e.target.children[0].classList.add('hide');
    }
}

sectionServices.addEventListener('click', handlerInSectionService);
addHandler(blockWrapperTeam);

buttonsSwitch.addEventListener('click', function (e) {
    if (e.target.type === 'submit' && !e.target.getAttribute('disabled')) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].classList[1] === 'active-btn') {
                this.children[i].classList.remove('active-btn');
                this.children[i].removeAttribute('disabled');
                break;
            }
        }
        e.target.classList.add('active-btn');
        e.target.setAttribute('disabled', 'disabled');
        $(wrapperCoverSlide).animate({ opacity: 0, marginRight: '10%' }, 1000);
        $(informationAboutSlide).animate({ opacity: 0, marginLeft: '20%' }, 1000);
        $(wrapperCoverSlide).animate({ opacity: 1, marginRight: '5%' }, 1000);
        $(informationAboutSlide).animate({ opacity: 1, marginLeft: '5%' }, 1000);
        setTimeout(() => {
            wrapperCoverSlide.children[0].children[0].src = arrayImgForSectionAbout[+e.target.getAttribute('data-number')];
        }, 1000)
    }
})


hamburger.addEventListener('click', function (e) {
    if (this.getAttribute('checked')) {
        this.removeAttribute('checked');
        navMenu.classList.remove('showMenu');
    }
    else {
        this.setAttribute('checked', 'checked');
        navMenu.classList.add('showMenu');
    }
})


nextPrevBtn.addEventListener('click', function (e) {
    e.target.setAttribute('disabled', 'disabled');
    if (e.target.type === 'submit') {
        nextPrevBtn.parentNode.children[0].children[stateBtn].classList.remove('active-btn');
        if (e.target === this.children[0] && stateBtn !== 0) {
            $(slides).animate({ opacity: 0, marginLeft: '20%' }, 500)
                .animate({ marginRight: '20%', marginLeft: '0%' }, 10).animate({ marginRight: '0%', opacity: '1' }, 500);
            stateBtn--;
        }
        if (e.target === this.children[1] && stateBtn !== 5) {
            $(slides).animate({ opacity: 0, marginRight: '20%' }, 500)
                .animate({ marginLeft: '20%', marginRight: '0%' }, 10).animate({ marginLeft: '0%', opacity: '1' }, 500);
            stateBtn++;
        }
        let promise = new Promise((resolve) => {
            setTimeout(() => {
                slides.children[0].children[0].src = arraySrcTeams[stateBtn];
                resolve();
                console.log('1');
            }, 500);
            nextPrevBtn.parentNode.children[0].children[stateBtn].classList.add('active-btn');
        });
        promise.then(() => {
            setTimeout(() => {
                e.target.removeAttribute('disabled');
            }, 500);
        })
    }
})

$(function(){
    $('a[href^="#"]').bind('click.smoothscroll', function(){
        let target = $(this).attr('href'),
        bl_top = $(target).offset().top;
        $('body, html').animate({scrollTop: bl_top}, 1000);
        return false;
    })
});