abstract class DeliveryItem {
    items: DeliveryItem[] = []

    addItem(item: DeliveryItem) {
        this.items.push(item)
    }

    getItemPrices(): number {
        return this.items.reduce((acc: number, i: DeliveryItem) => acc + i.getPrice(), 0)
    }

    abstract getPrice(): number
}

class DeliveryShop extends DeliveryItem {
    constructor(private deliveryFee: number) {
        super();
    }


    getPrice(): number {
        return this.getItemPrices() + this.deliveryFee
    }
}


class Package extends DeliveryItem {
    getPrice(): number {
        return this.getItemPrices()
    }
}

class Product extends DeliveryItem {
    constructor(private price: number) {
        super();
    }

    getPrice(): number {
        return this.price
    }
}

const shop = new DeliveryShop(100)
shop.addItem(new Product(1000))

const pack1 = new Package()
pack1.addItem(new Product(200))
pack1.addItem(new Product(300))
shop.addItem(pack1)

const pack2 = new Package()
pack2.addItem(new Product(30))
shop.addItem(pack2)

console.log(shop.getPrice())


// gb example

abstract class Component {
    abstract operation(): void
}

class MachineOperation extends Component {

    constructor(public name: string) {
        super();
    }

    operation(): void {
        console.log(this.name)
    }
}

class CompositesOperation extends Component {

    private children: Set<Component> = new Set<Component>()

    operation(): void {
        this.children.forEach((child) => {
            child.operation()
        })
    }

    append(component: Component) {
        this.children.add(component)
    }

    remove(component: Component) {
        this.children.delete(component)
    }
}

const operation_1 = new MachineOperation('drill 5 mm')
const operation_2 = new MachineOperation('drill 15 mm')
const composite_1 = new CompositesOperation()
composite_1.append(operation_1)
composite_1.append(operation_2)

const operation_3 = new MachineOperation('assemble')
const operation_4 = new MachineOperation('paint')
const composite_2 = new CompositesOperation()
composite_2.append(composite_1)
composite_2.append(operation_3)
composite_2.append(operation_4)

composite_2.operation()
operation_1.operation()
