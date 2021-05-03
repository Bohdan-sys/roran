

//burger menu

export const burger = document.querySelector('.burger'),
    menu = document.querySelector('.menu'),
    items = document.querySelectorAll('.menu__item');

export const toggler = () => {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    document.querySelector('body').classList.toggle('is-active');
}

