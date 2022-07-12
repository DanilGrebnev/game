import { random, $, $all } from './fn.js'
const data = {
    //Получение кнопок сложности
    a: $all('ul li'),
    difInf: $all('.difficult-info span'),
    //Сдаться
    surrender: $('#surrender'),
    //Окно меню
    menu: $('#menu'),
    //Окно победы
    win: $('#win'),
    //Вывод количества попыток
    winInfo: $('#win-info'),
    //Поле вывода текста
    attemp: $('#attemp-val'),
    //Вывод введённыъ значений
    attempNmb:$('#attemp-nmb'),
    //Окно алерт
    al: $('#alert'),
    //Начать
    start: $('#start'),
    //Настройки
    setting: $('#setting'),
    settings: $('#settings'),
    //игровое поле
    game: $('#game'),
    form: $('form'),
    //Инкремент декремент значения
    inc: $('#inc'),
    dec: $('#dec'),
    difficult_p: $('#difficult p'),
    //Обёртка списка кнопок сложности
    ul: $('#difficult ul'),
    input: $('form input'),
}
export { data }