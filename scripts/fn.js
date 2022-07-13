import { data as d } from './var.js'
//Найти элемент
const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);
const $id = (selector) => document.getElementById(selector);
//Получить случайное число
const random = (number = 10) => Math.floor(Math.random() * number);
//Навигация по онкам в меню
const toggleWindow = (el) => {
    menu.classList.remove('active');
    el.classList.add('active');
}
//Закрытие всех вкладок, переход в меню
const backToMenu = () => {
    [d.game, d.settings, d.al, d.win].forEach(el => el.classList.remove('active'))
    menu.classList.add('active')
}
const delay = (el, className, delay) => {
    setTimeout(() => {
        el.classList.remove(className)
    }, delay)
}
//Добавить класс 
const add = (el, className) => {
    el.classList.add(className);
}
const remove = (el, className) => {
    el.classList.remove(className);
}
const toggle = (el, className) => {
    el.classList.toggle(className)
}


export { $, $all, random, toggleWindow, backToMenu, delay, add, remove, toggle, $id }
