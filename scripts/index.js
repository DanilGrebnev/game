//Функции
import { showWin, $, $id, $all, random, toggleWindow, backToMenu, delay, add, remove, toggle } from './fn.js';
import { data as d } from './var.js'
//d (data) - хранилище пременных

window.addEventListener('load', main)

function main() {
    let setId;
    //Число, получаемое с формы
    let value;
    let togglePlay = true
    let multiVal = {
        counter: 1,
        pl1: 0,
        pl2: 0,
        vl1: [],
        vl2: [],
    };
    //Количество попыток
    let count = 0;
    //генерация случайного числа
    let number;
    let rand = random(number)
    //Массив с введёнными значениями
    let a = []


    //Сброс данных 
    const reset = () => {
        d.input.value = ''
        value = '';
        count = 0;
        rand = random();
        a = [];
        d.attemp.innerText = 'Нет введённых значений';
        d.attempNmb.innerText = a;
        d.al.innerText = '';
        d.surrender.innerText = 'Назад';
        // multiVal = {
        //     counter: 1,
        //     pl1: 0,
        //     pl2: 0,
        //     vl1: [],
        //     vl2: [],
        // }
    }

    //Навигацию по меню
    document.addEventListener('click', e => {
        const el = e.target
        //Если целью является один из элементов меню
        $all('menu li').forEach(elem => {
            if (el === elem) {
                add(e.target, 'animate')
                delay(e.target, 'animate', 200)
            }
        })

        if (el === $id("start")) {
            setTimeout(toggleWindow, 1000, game)
            togglePlay = false
        }

        if (el === $id("setting")) setTimeout(toggleWindow, 1000, settings)

        if (el === $id('multi')) {
            setTimeout(toggleWindow, 1000, game)
            togglePlay = true
        }
    })

    //Выбор сложности
    d.ul.addEventListener('click', e => {
        if (e.target?.dataset?.difficult) {
            number = e.target.dataset.difficult
            d.difInf.forEach(el => el.innerText =
                `${e.target.innerText} (0 - ${e.target.dataset.difficult})`)
            rand = random(number)
        }
    })

    d.input.addEventListener('input', (e) => {
        if (!togglePlay) {
            value = e.target.value

        } else if (togglePlay) {

        }

    })

    //Прибавить или отнять единицу от числа;
    d.inc.addEventListener('click', () => {
        let val = d.input.value;
        val++
        d.input.value = +val
        if (!togglePlay) {
            value = val
        } else {
            // multiVal = val;
        }
    })
    d.dec.addEventListener('click', () => {
        let val = +d.input.value
        val--
        d.input.value = +val
        if (!togglePlay) {
            value = val
        } else {
            multiVal = val;
        }

    })

    //ПРОВЕРКА ЧИСЛА
    d.form.addEventListener('submit', e => {
        e.preventDefault()
        if (!togglePlay) {
            if (value === null || value === ' ' || value === undefined) return
            a = [...a, value]
            if (rand > value) {
                d.al.innerText = 'Число, которое я загадал, больше твоего'
            } else if (rand < value) {
                d.al.innerText = 'Число, которое я загадал, меньше твоего'
            } else if (rand === +value) {
                count++
                d.attempNmb.innerText = a
                showWin(d.game, d.win, rand, count)
                reset()
                return
            }
            d.attemp.innerText = `Вы ввели: `;
            d.attempNmb.innerText = a;
            count++;
            if (count > 0) { d.surrender.innerText = 'Сдаться' }
            return
        } else if (togglePlay) {
            conditionMulti()
            console.log(rand)
        }

    })

    function conditionMulti() {
        switch (multiVal.counter) {
            case 1: {
                multiVal.pl1++
                multiVal.counter++
                multiVal.vl1 = [...multiVal.vl1, +d.input.value]
                break;
            }
            case 2: {
                multiVal.pl2++
                multiVal.vl2 = [...multiVal.vl2, +d.input.value]
                multiVal.counter = 1
                break
            }
        }
        if (multiVal.vl1.includes(rand)) {
            showWin(d.game, d.win, rand, multiVal.pl1)
            add(d.win, 'active')
        } else if (multiVal.vl2.includes(rand)) {
            showWin(d.game, d.win, rand, multiVal.pl2)
        }

        console.log(
            `
                multiVal.counter: ${multiVal.counter}
                multiVal.pl1: ${multiVal.vl1}
                multiVal.pl2: ${multiVal.vl2}
                `)



    }

    //Открытие и закрытие списка сложности
    d.difficult_p.addEventListener('click', () => {
        if (d.difficult_p.classList.contains('active')) {
            delay(d.difficult_p, 'active', 800)
        } else {
            add(d.difficult_p, 'active')
        }
        toggle(d.ul, 'active')
    });
    //Задержки для анимации меню настроек
    d.ul.addEventListener('click', e => {
        const v = e.target;
        if (v.dataset.difficult) {
            //Удаляет класс со всех кнопок
            d.a.forEach(el => remove(el, 'active'))
            //Закрывает список через время
            delay(d.ul, "active", 1500)
            delay(d.difficult_p, "active", 2000)
            //Через время вызывает интервал
            setTimeout(setId = setInterval(toggle, 300, v, 'active'), 400)
            //Удаляет интервал
            setTimeout(() => {
                clearInterval(setId)
                add(v, 'active')
            }, 2500)
        }
    })

    //Сдаться
    d.surrender.addEventListener('click', () => {
        let accept
        if (count === 0) {
            backToMenu()
            return
        } else
            accept = confirm('вы уверены?')
        if (accept) {
            alert(`
                    Загаданным числом было: ${rand}
                    попыток использовано: ${count}
                `)
            reset()
            backToMenu()
        }
    })




    //Закрытие алерта победы
    d.win.addEventListener('click', backToMenu)
    //Выход в меню по стрелке
    $all('.arrow').forEach(el => el.addEventListener('click', backToMenu))
    //Переключение чекбокса смены темы 
    $("#checkbox div").addEventListener('click', e => {
        toggle(e.target, 'active')
    })
}


