//Функции
import { showWin, $, $id, $all, random, toggleWindow, backToMenu, delay, add, remove, toggle } from './fn.js';
import { data as d } from './var.js'
//d (data) - хранилище пременных

window.addEventListener('load', main)
let multiVal = {
    turn: true,
    player1: {
        steps: 0,
        value: Number(''),
        a: [],
    },
    player2: {
        steps: 0,
        value: Number(''),
        a: [],
    },
};
function main() {
    let onePlayer = true

    let { player1, player2, turn, } = multiVal;
    //Количество попыток
    let count = 0;
    //Приходит из уровня сложности
    let number;
    //генерация случайного числа
    let rand = random(number)
    //Массив с введёнными значениями
    let a = []
    let { attempNmb, attempNmb2, attemp, al, surrender, form, game, win } = d;
    //Сброс данных 
    const reset = () => {
        d.input.value = ''
        count = 0;
        rand = random();
        a = [];
        attempNmb.innerText = '';
        attemp.innerText = 'Нет введённых значений';
        al.innerText = '';
        surrender.innerText = 'Назад';
        turn = true;
        player1.steps = 0;
        player1.value = '',
            player1.a = [],
            player2.steps = 0;
        player2.value = '',
            player2.a = [],
            attempNmb.innerText = ''
        attempNmb2.innerText = ''
    }
    const p = $('#form p')

    //ПРОВЕРКА ЧИСЛА ВО ВРЕМЯ ОТПРАВКИ ФОРМЫ
    form.addEventListener('submit', e => {
        e.preventDefault()
        let value = +input.value
        if (value === '' || value === null || value === undefined) return

        if (onePlayer) {
            examination(+input.value)
            a = [...a, +input.value];
            if (a.length === 1) {
                attemp.innerText = 'значение:'
            } else if (a.length > 1) {
                attemp.innerText = 'значения:'
            }
            attempNmb.innerText = a;
        } else if (!onePlayer) {
            attemp.innerText = ''
            addValuePlayers()
            if (turn) {
                p.innerHTML = 'Ход <b>1</b> игрока'
            }
            else {
                p.innerHTML = 'Ход <b>2</b> игрок'
            }
        }
        count++
        surrender.innerText = 'сдаться'

    })

    //Функция проверки числа
    function examination(value) {
        if (rand > value) {
            al.innerHTML = `Число, которое я загадал, <b>больше ${input.value}</b> `
        } else if (rand < value) {
            al.innerHTML = `Число, которое я загадал, <b>меньше ${input.value}</b>`
        } else if (rand === value) {
            if (value === player1.value) {
                showWin(game, win, rand, player1.steps, player1.value, turn)
                return
            } else if (value === player2.value) {
                showWin(game, win, rand, player2.steps, player2.value, turn)
                return
            } else
                count++
            showWin(game, win, rand, count)
            attemp
        }

    }

    function addValuePlayers() {
        let value = +input.value
        if (turn) {
            player1.steps++
            player1.value = value
            player1.a = [...player1.a, value]
            attempNmb.innerText = `Значения первого игрока:
            ${player1.a}`
            examination(+player1.value)
            turn = false;
            // console.log('1 игрок')
            // console.log(player1.a)
            // console.log(+player1.value)
        } else if (!turn) {
            player2.steps++
            player2.value = value
            player2.a = [...player2.a, value]
            attempNmb2.innerText = `Значения второго игрока: 
            ${player2.a}`;
            examination(player2.value)
            turn = true
            // console.log('2 игрок')
            // console.log(player2.a)
            // console.log(player2.value)
        }

    }















    //Инкремент значения в поле
    const { inc, dec, ul, input, difInf, difficult_p, } = d;
    inc.addEventListener('click', () => {
        input.value++
    })
    dec.addEventListener('click', () => {
        input.value--
    })
    //==============================================================================================
    //Выбор сложности
    ul.addEventListener('click', e => {
        const df = e.target.dataset.difficult
        if (df) {
            number = df
            difInf.forEach(el => el.innerText =
                `${e.target.innerText} (0 - ${df})`)
            rand = random(number)
        }
    })
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
            reset()
            rand = random(number)
            console.log(rand)
            onePlayer = true;
            p.innerText = 'Введите значение'
        }

        if (el === $id("setting")) {
            setTimeout(toggleWindow, 1000, settings)
        }

        if (el === $id('multi')) {
            p.innerHTML = 'Ход <b>1</b> игрока'
            setTimeout(toggleWindow, 0, game)
            reset()
            console.log("rand: ", rand)
            onePlayer = false
        }
    })
    //Открытие и закрытие списка сложности
    difficult_p.addEventListener('click', () => {
        if (difficult_p.classList.contains('active')) {
            delay(difficult_p, 'active', 800)
        } else {
            add(difficult_p, 'active')
        }
        toggle(ul, 'active')
    });
    //Задержки для анимации меню настроек
    let setId;
    ul.addEventListener('click', e => {
        const i = e.target;
        if (i.dataset.difficult) {
            //Удаляет класс со всех кнопок
            d.a.forEach(el => remove(el, 'active'))
            //Закрывает список через время
            delay(ul, "active", 1500)
            delay(difficult_p, "active", 2000)
            //Через время вызывает интервал
            setTimeout(setId = setInterval(toggle, 300, i, 'active'), 400)
            //Удаляет интервал
            setTimeout(() => {
                clearInterval(setId)
                add(i, 'active')
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
export { multiVal }
