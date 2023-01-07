// Реализуйте тип Percentage, отражающий значение от 0 до 100.
// Значения меньше 0 должны преобразовываться в 0, а значения больше 100 — в 100.

declare const PercentageType: unique symbol

class Percentage {
    readonly value: number
    [PercentageType]: void

    private constructor(value: number) {
        this.value = value
    }

    static makePercentage(value: number): Percentage {
        if (value < 0) return new Percentage(0)
        if (value > 100) return new Percentage(100)
        return new Percentage(value)
    }
}


const percentageUp = Percentage.makePercentage(150)
const percentageDown = Percentage.makePercentage(-30)
const percentageCorrect = Percentage.makePercentage(30)

console.log(percentageUp.value)
console.log(percentageDown.value)
console.log(percentageCorrect.value)

declare const roublesType: unique symbol
declare const dollarType: unique symbol
class Roubles {
    readonly value: number
    [roublesType]: void
    constructor(value: number) {
        this.value = value
    }
}
class Dollars {
    readonly value: number
    [dollarType]: void
    constructor(value: number) {
        this.value = value
    }
}
const getSalaryInRubles = (dollars: Dollars) => {
    return dollars.value * 60
}
const dollars = new Dollars(50), roubles = new Roubles(300)

console.log(getSalaryInRubles(dollars))
// console.log(getSalaryInRubles(roubles)) // error

class Cat {
    meow() {
        console.log('meow')
    }
}


const serialized = JSON.stringify(new Cat())

const deserialized = Object.assign(new Cat(), JSON.parse(serialized)) as Cat

deserialized.meow()
