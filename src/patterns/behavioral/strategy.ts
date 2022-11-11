namespace StrategyPurpleSchoolExample {
    class User {
        githubToken: string
        jwtToken: string
    }

    interface AuthStrategy {
        auth(user: User): boolean
    }


    class Auth {

        constructor(private strategy: AuthStrategy) {
        }

        setStrategy(strategy: AuthStrategy) {
            this.strategy = strategy
        }


        public authUser(user: User): boolean {
            return this.strategy.auth(user);
        }
    }

    class JWTStrategy implements AuthStrategy {
        auth(user: User): boolean {
            return !!user.jwtToken;
        }
    }

    class GithubStrategy implements AuthStrategy {
        auth(user: User): boolean {
            return !!user.githubToken;
        }
    }

    const user = new User()
    user.jwtToken = 'token'
    const auth = new Auth(new JWTStrategy())
    console.log(auth.authUser(user))
    auth.setStrategy(new GithubStrategy())
    console.log(auth.authUser(user))
}

namespace StrategyGeekBrainsExample {
    abstract class PaymentStrategy {
        abstract pay(amount: number): void
    }

    class PayPalPaymentStrategy extends PaymentStrategy {

        constructor(public email: string, public token: string) {
            super();
        }

        pay(amount: number): void {
            console.log(`processing ${amount} via PayPal account ${this.email}`)
        }
    }

    class CreditCard {
        constructor(protected _number: string) {
        }

        getNumber() {
            return this._number
        }
    }

    class CreditCardPaymentStrategy extends PaymentStrategy {
        constructor(public card: CreditCard) {
            super();
        }

        pay(amount: number): void {
            console.log(`processing ${amount} via credit card ${this.card.getNumber()}`)
        }
    }

    class Item {
        constructor(public name: string, public price: number) {
        }
    }

    class Order {
        protected items: Item[] = []

        pay(strategy: PaymentStrategy) {
            const total = this.getTotal()
            strategy.pay(total)
        }

        getTotal() {
            let total = 0

            for (const _item of this.items) {
                total += _item.price
            }
            return total
        }

        addItem(item: Item) {
            this.items.push(item)
        }
    }

    // client code

    // товары
    const item1 = new Item('Book', 515)
    const item2 = new Item('Magazine', 298)

    // создаём и наполняем заказ
    const order = new Order()
    order.addItem(item1)
    order.addItem(item2)

    // выбор конкретной Стратегии и оплата заказа
    const paypalPaymentStrategy = new PayPalPaymentStrategy('patterns@geekbrains.com', 'token')
    order.pay(paypalPaymentStrategy)

    // выбор конкретной Стратегии и оплата заказа
    const creditCard = new CreditCard('1234 5678 9101 2131 4156')
    const creditCardPaymentStrategy = new CreditCardPaymentStrategy(creditCard)
    order.pay(creditCardPaymentStrategy)


}

