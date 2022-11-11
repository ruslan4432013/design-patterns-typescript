namespace TemplateMethodPurpleSchoolExample {
    class Form {
        constructor(public name: string) {
        }
    }

    abstract class SaveForm<T> {
        public save(form: Form) {
            const res = this.fill(form)
            this.log(res)
            this.send(res)
        }

        protected abstract fill(form: Form): T;

        protected log(data: T): void {
            console.log(data)
        };

        protected abstract send(data: T): void
    }

    class FirstAPI extends SaveForm<string> {
        protected fill(form: Form): string {
            return form.name
        }

        protected send(data: string): void {
            console.log(`Sending: ${data}`)
        }
    }

    class SecondAPI extends SaveForm<{ fio: string }> {
        protected fill(form: Form): { fio: string } {
            return {fio: form.name}
        }

        protected send(data: { fio: string }): void {
            console.log(`Sending: ${data}`)
        }
    }


    const form1 = new FirstAPI()
    form1.save(new Form('Vasya'))

    const form2 = new SecondAPI()
    form2.save(new Form('Vasya'))

}


namespace TemplateMethodGeekBrainsExample {
    //     Разные пользователи выбирают разные методы доставки уведомлений. Реализация доставки
    // уведомления на электронную почту отличается от доставки через Facebook, Twitter или по SMS, но в
    // то же время имеется и сходство. Процесс состоит из:
    // 1. Входа в систему доставки сообщений.
    // 2. Собственно отправки.
    // 3. Выхода.

    //Абстрактный класс нотификатора описывает последовательность действий

    abstract class Notifier {
        protected log_list: [string, string, string][] = []

        // войти в систему доставки сообщений
        protected abstract login(): void

        // отправка сообщения
        protected abstract send(address: string, subject: string, message: string): void

        // выход
        protected abstract logout(): void

        // внутреннее логирование, задаем поведение по умолчанию
        protected log(address: string, subject: string, message: string): void {
            this.log_list.push([address, subject, message])
        }

        public notify(address: string, subject: string, message: string) {
            this.login()
            this.send(address, subject, message)
            this.logout()
            this.log(address, subject, message)
        }
    }

    // Реализации конкретных нотификаторов осуществляют только подзадачи основного алгоритма, не
    // влияя на последовательность действий

    class EmailNotifier extends Notifier {
        public mailFrom: string = ''

        protected login(): void {
            // no need to login
        }

        protected send(mail_to: string, subject: string, message: string): void {
            // send_mail(this.mail_from, mail_to, subject, message)
            console.log(`send_mail: ${mail_to}, ${subject}, ${message}`)
        }

        protected logout(): void {
            // no need to logout
        }
    }

    class FacebookNotifier extends Notifier {
        protected login(): void {
            // login to facebook
            console.log('login to facebook')
        }

        protected send(address: string, subject: string, message: string): void {
            // send facebook message
            console.log(`send facebook message: ${address}, ${subject}, ${message}`)
        }

        protected logout(): void {
            // logout from facebook
            console.log('logout from facebook')
        }

        // переопределяем поведение шага внутреннего логирования
        protected log(address: string, subject: string, message: string) {
            // не будем внутренне логировать нотификацию по FB, это избыточно
        }
    }

    class NotifierFabric {

        static notifiers = {
            'EMAIL': EmailNotifier,
            'FACEBOOK': FacebookNotifier
        }

        static getNotifier(communicationType: keyof typeof NotifierFabric.notifiers): Notifier {
            return new NotifierFabric.notifiers[communicationType]()
        }
    }

    // инстанциируем объект конкретного нотификатора, используя Фабричный метод
    const notifier_1 = NotifierFabric.getNotifier('EMAIL')
    notifier_1.notify('patterns@geekbrains.ru', 'notify_1', 'hello world')

    // инстанциируем объект конкретного нотификатора
    const notifier_2 = NotifierFabric.getNotifier('FACEBOOK')
    notifier_2.notify('patterns_facebook', 'notify_2', 'hi')
}
