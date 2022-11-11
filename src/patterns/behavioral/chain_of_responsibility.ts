interface IMiddleware {
    next(mid: IMiddleware): IMiddleware

    handle(request: any): any
}

abstract class Middleware implements IMiddleware {
    private nextMiddleware: IMiddleware

    handle(request: any): any {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request)
        }
        return
    }

    next(mid: IMiddleware): IMiddleware {
        this.nextMiddleware = mid
        return mid
    }
}

class AuthMiddleware extends Middleware {
    override handle(request: any): any {
        console.log('AuthMiddleware')
        if (request.userId === 1) {
            return super.handle(request)
        }
        return {
            error: 'Вы не авторизованы'
        }
    }
}


class ValidateMiddleware extends Middleware {
    override handle(request: any): any {
        console.log('ValidateMiddleware')
        if (request.body) {
            return super.handle(request)
        }
        return {
            error: 'Нет body'
        }
    }
}


class Controller extends Middleware {

    override handle(request: any): any {
        console.log('Controller')
        if (request.body) {
            return super.handle(request)
        }
        return {
            success: request
        }
    }
}


const controller = new Controller()
const validate = new ValidateMiddleware()
const auth = new AuthMiddleware()

auth.next(validate).next(controller)

console.log(auth.handle({
    userId: 1,
    body: 'I am Ok'
}))


// gb example
interface IHandler {
    handle(request: CustomRequest): any

    link(next: IHandler): IHandler
}

abstract class Handler implements IHandler {
    private next: IHandler

    handle(request: CustomRequest): any {
        if (this.next) {
            this.next.handle(request)
        }
    }

    link(next: IHandler): IHandler {
        this.next = next
        return this.next
    }
}

class Operator extends Handler {
    private probability: number = 0.75

    constructor(public name: string) {
        super();
    }


    override handle(request: CustomRequest): any {
        if (this.isBusy()) {
            console.log(`Оператор ${this.name} занят`)
            super.handle(request)
        } else {
            console.log(`Оператор ${this.name} обрабатывает: "${request.getData()}"`)
        }
    }

    isBusy(): boolean {
        return Math.random() < this.probability
    }
}

class BusyHandler extends Handler {
    public request: any

    override handle(request) {
        if (this.request === request) {
            console.log('Все операторы заняты, пожалуйста подождите')
        } else {
            this.request = request
            super.handle(request)
        }
    }
}

const handler = new BusyHandler()

handler.link(new Operator('#1')).link(new Operator('#2')).link(new Operator('#3')).link(handler)

class CustomRequest {
    public body: string = 'Вопрос по новинке'

    public getData(): string {
        return 'Вопрос по новинке'
    }
}


for (let i = 0; i < 13; i++ ) {
    handler.handle(new CustomRequest())
}
