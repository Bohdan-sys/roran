//modules
import Swiper, { Navigation, Pagination } from 'swiper';
import { burger, items, toggler } from './burger.js';
import FormValidator from '@yaireo/validator';


window.addEventListener('DOMContentLoaded', function () {

    if (window.innerWidth < 768) {
        burger.addEventListener('click', () => toggler(burger));
        items.forEach((item, i) => { item.addEventListener('click', () => toggler(item)) });
    };

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }



    //swiper
    Swiper.use([Navigation, Pagination])
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        watchOverflow: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,

            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,

            }

        },
        loop: true,
        grabCursor: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    //sort container

    let sortBtn = document.querySelectorAll('.js-button--sort'),
        articles = document.querySelectorAll('.js-card'),
        row = document.querySelector('.js-row');

    sortBtn.forEach(item => {
        item.addEventListener('click', () => {
            let filter = Array.from(articles).filter(article => {
                if (item.value == 'all') {
                    return articles
                } else {
                    return article.dataset.option == item.value
                }
            });
            let map = filter.map(current => current.outerHTML).join("")
            row.innerHTML = map;
        });
    });


    const valid = (a, b) => {
        let form = a.querySelectorAll(b);
        form.forEach(item => {
            let validator = new FormValidator();
            validator.texts.email = 'Email must be look like "name@mail.com"';

            // on form "submit" event
            item.addEventListener('blur', function (e) {
                validator.checkField(e.target)
            }, true);

            item.addEventListener('input', function (e) {
                validator.checkField(e.target);
            }, true);

            item.addEventListener('change', function (e) {
                validator.checkField(e.target)
            }, true);

            item.onsubmit = function (e) {
                let submit = true,
                    validatorResult = validator.checkAll(this);
                console.log(validatorResult);
                return !!validatorResult.valid;
            };
        });
    };
    valid(document, '.js-form')


    const arrowTop = document.querySelector('.js-button--up')

    arrowTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })


    window.onscroll = function () { myFunction() };

    const navbar = document.querySelector(".js-section--sticky");
    let sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("active")
        } else {
            navbar.classList.remove("active");
        }
    }
});