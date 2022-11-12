class KVDatabase {
    private db: Map<string, string> = new Map()

    save(key: string, value: string) {
        this.db.set(key, value)
    }
}

class PersistentDB {
    savePersistent(data: Object) {
        console.log(data)
    }
}

class PersistenceDBAdapter extends KVDatabase {
    constructor(public database: PersistentDB) {
        super()
    }

    override save(key: string, value: string) {
        this.database.savePersistent({key, value})
    }

}


function run(base: KVDatabase) {
    base.save('key', 'myValue')
}

run(new PersistenceDBAdapter(new PersistentDB()))


// gb example class adapter

interface Roundable {
    _radius: number

    getRadius(): number
}

class Circle implements Roundable {
    _radius: number;

    constructor(radius: number) {
        this._radius = radius
    }

    getRadius() {
        return this._radius
    }
}

class Square {
    protected _side: number

    constructor(side: number) {
        this._side = side
    }

    getSide() {
        return this._side
    }

}

class RoundableSquare extends Square implements Roundable {
    _radius: number;

    getRadius(): number {
        return this.getSide() * Math.sqrt(2) / 2
    }
}

const circle_1 = new Circle(5)
const roundable_square_1 = new RoundableSquare(5)

console.log('gb examples')
console.log('class adapter')
console.log(circle_1.getRadius())
console.log(roundable_square_1.getRadius())


// gb example object adapter
class RoundableSquareAdapter implements Roundable {
    _radius: number;
    _adaptee: Square

    constructor(adaptee: Square) {
        this._adaptee = adaptee
    }

    getRadius(): number {
        return this._adaptee.getSide() * Math.sqrt(2) / 2
    }

}

// client code
const circle1 = new Circle(5)
const circle2 = new Circle(2)
const square1 = new Square(5)
const square2 = new Square(2)

const isSquare = (item: Circle | Square): item is Square => {
    return !(item as Circle)._radius;

}

const getRadius = (item: Roundable): number => {
    return item.getRadius()
}

const figures = [circle1, square1, circle2, square2]
console.log('object adapter')

figures.forEach((el) => {

    let circle: Roundable;

    if (isSquare(el)) {
        circle = new RoundableSquareAdapter(el)
    } else {
        circle = el
    }
    console.log(getRadius(circle))
})
