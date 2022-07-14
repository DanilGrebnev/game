import { $, $all, $id, } from './fn.js'
const data = {
    //Получение кнопок сложности
    a: $all('ul li'),
    difInf: $all('.difficult-info span'),
    //Сдаться
    surrender: $id('surrender'),
    //Окно меню
    menu: $id('menu'),
    //Окно победы
    win: $id('win'),
    //Вывод информации победителя
    winInfo: {
        player: $id('win-player'),
        count: $id('win-info'),
        value: $id('win-value')
    },
    player: $id('player'),
    //Поле вывода текста
    attemp: $id('attemp-val'),
    //Вывод введённыъ значений
    attempNmb: $id('attemp-nmb'),
    attempNmb2: $id('attemp-nmb2'),
    //Окно алерт
    al: $id('alert'),
    //Начать
    start: $id('start'),
    //Настройки
    setting: $id('setting'),
    settings: $id('settings'),
    //игровое поле
    game: $id('game'),
    form: $('form'),
    //Инкремент декремент значения
    inc: $id('inc'),
    dec: $id('dec'),
    difficult_p: $('#difficult p'),
    //Обёртка списка кнопок сложности
    ul: $('#difficult ul'),
    input: $('form input'),
    //Кнопка начала мультиплеера
    multi: $id('multi'),
}

export { data }