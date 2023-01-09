//Реализуйте функцию first().
// Она должна принимать массив значений типа T и функ- цию pred (предикат),
// получающую в качестве аргумента значение типа T и возвра- щающую boolean.
// Функция first() должна возвращать первый элемент массива, для которого pred() вернет true или undefined,
// если pred() возвращает false для всех элементов.

type First = <T>(arr: T[], pred: (T) => boolean) => T | undefined

const first: First = (arr, pred) => {
    for (let item of arr) {
        if (pred(item)) {
            return item
        }
    }
}


const strings = ['apple', 'pineapple', 'pen', 'macbook']

// check
// console.log(first(strings, (el: string) => el.startsWith('pe')))

//Реализуйте функцию all(). Она должна принимать массив значений типа T и функ- цию pred (предикат),
// получающую в качестве аргумента значение типа T и возвращающую boolean.
// Функция all() должна возвращать true, если pred() возвращает true для всех элементов массива,
// и false в противном случае

const all = <T>(arr: T[], pred: (arg: T) => boolean): boolean => {
    if (arr.length === 0) return false

    for (let item of arr) {
        if (!pred(item)) {
            return false
        }
    }
    return true
}


// check
// console.log(all(strings, (el) => el.startsWith('a')))
