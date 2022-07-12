import { random, $, $all } from './fn.js'
const data = {
    difInf: $all('.difficult-info span'),
    //Сдаться
    surrender: $('#surrender'),
    //Окно меню
    menu: $('#menu'),
    //Окно победы
    win: $('#win'),
    //Кнопка закрытия окна победы
    closeWin: $('#win #close'),
    //Вывод количества попыток
    winInfo: $('#win-info'),
    //Поле вывода ведённых значений
    attemp: $('#attemp-val'),
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
console.log(data.difInf)
export { data }