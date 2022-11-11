class Notify {
    send(template: string, to: string) {
        console.log(`Отправляю ${template}: ${to}`)
    }
}


class Log {
    log(message: string) {
        console.log(message)
    }
}

class Template {
    private templates = [
        {name: 'other', template: '<h1>Шаблон!</h1>>'}
    ]

    getByName(name: string) {
        return this.templates.find(t => t.name === name)
    }
}

class NotificationFacade {
    private notification: Notify
    private logger: Log
    private template: Template

    constructor() {
        this.notification = new Notify()
        this.logger = new Log()
        this.template = new Template()

    }


    send(to: string, templateName: string) {
        const data = this.template.getByName(templateName)
        if (!data) {
            this.logger.log('Не найден шаблон')
            return
        }
        this.notification.send(data.template, to)
        this.logger.log('Шаблон отправлен')
    }
}

const s = new NotificationFacade()
s.send('2@2.ru', 'other')
