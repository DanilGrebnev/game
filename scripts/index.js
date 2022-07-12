//Функции
import { $, $all, random, toggleWindow, backToMenu, delay, add, remove, toggle } from './fn.js';
import { data as d } from './var.js'

window.addEventListener('load', main)

function main() {
    //Число, получаемое с формы
    let value;
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
        d.al.innerText = '';
        d.surrender.innerText = 'Назад'
    }

    //Навигацию по меню
    d.start.addEventListener('click', e => {
        add(e.target, 'animate')
        delay(e.target, 'animate', 200)
        setTimeout(toggleWindow, 1000, game)
    })

    d.setting.addEventListener('click', e => {
        add(e.target, 'animate')
        delay(e.target, 'animate', 200)
        setTimeout(toggleWindow, 1000, settings)
    })

    //Выход в меню по стрелке
    $all('.arrow').forEach(el => el.addEventListener('click', backToMenu))

    //Выбор сложности
    d.ul.addEventListener('click', e => {
        if (e.target?.dataset?.difficult) {
            number = e.target.dataset.difficult
            d.difInf.forEach(el => el.innerText = `${e.target.innerText} (0 - ${e.target.dataset.difficult})`)
            rand = random(number)
        }
    })
    d.input.addEventListener('input', (e) => {
        value = +e.target.value
    })

    //Прибавить или отнять единицу от числа;
    d.inc.addEventListener('click', () => {
        d.input.value++
        value = +d.input.value;
    })
    d.dec.addEventListener('click', () => {
        d.input.value--
        value = +d.input.value;
    })

    //ПРОВЕРКА ЧИСЛА
    d.form.addEventListener('submit', e => {
        console.log('rand:', rand, 'value:', value)
        e.preventDefault()
        if (value === null || value === ' ' || value === undefined) return

        a = [...a, value]

        if (rand > value) {
            d.al.innerText = 'Число, которое я загадал, больше твоего'
        } else if (rand < value) {
            d.al.innerText = 'Число, которое я загадал, меньше твоего'
        } else if (rand === value) {
            count++
            d.attemp.innerText = `Вы ввели: ${a}`;
            remove(d.game, 'active')
            add(d.win, 'active')
            d.winInfo.innerText = count;
            count = 0
            reset()
            return
        }
        count++;
        if (count > 0) d.surrender.innerText = 'Сдаться'
        d.attemp.innerText = `Вы ввели: ${a}`;
    })

    d.closeWin.addEventListener('click', backToMenu)

    let setId;
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
        //Получение кнопок сложности
        const a = $all('ul li');
        const v = e.target;
        if (v.dataset.difficult) {
            //Удаляет класс со всех кнопок
            a.forEach(el => remove(el, 'active'))
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

    //Переключение чекбокса смены темы 
    $("#checkbox div").addEventListener('click', e => {
        toggle(e.target, 'active')
    })

    //Сдаться
    d.surrender.addEventListener('click', () => {
        let accept
        if (count === 0) {
            backToMenu()
            return
        }
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
}


