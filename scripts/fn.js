import { data as d } from './var.js'
import { multiVal } from './index.js'
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
    [d.game, d.settings, d.al, d.win].forEach(el => remove(el, 'active'))
    add(menu, 'active')
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

//Показать окно победы
let { player1, player2 } = multiVal;
const showWin = (par1, par2, rand, count, value) => {
    if (value === player1.value) {
        d.winInfo.player.innerHTML = 'Победил <strong>1</strong> игрок!'
    } else if (value === player2.value) {
        d.winInfo.player.innerHTML = 'Победил <strong>2</strong> игрок!'
    }
    remove(par1, 'active')
    add(par2, 'active')
    d.winInfo.count.innerText = count;
    d.winInfo.value.innerText = rand;
}

export { showWin, $, $all, random, toggleWindow, backToMenu, delay, add, remove, toggle, $id }
