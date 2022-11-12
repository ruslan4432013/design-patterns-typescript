namespace ObserverPurpleSchoolExample {
    interface Observer {
        update(subject: Subject): void
    }

    interface Subject {
        attach(observer: Observer): void

        detach(observer: Observer): void

        notify(): void
    }

    class Lead {
        constructor(public name: string, public phone: string) {

        }
    }

    class NewLead implements Subject {
        private observers: Observer[] = []
        public state: Lead

        attach(observer: Observer): void {
            if (this.observers.includes(observer)) {
                return
            }
            this.observers.push(observer)
        }

        detach(observer: Observer): void {
            const observerIndex = this.observers.indexOf(observer)
            if (observerIndex === -1) {
                return
            }
            this.observers.slice(observerIndex, 1)
        }

        notify(): void {
            for (const observer of this.observers) {
                observer.update(this)
            }
        }

    }

    class NotificationService implements Observer {
        update(subject: Subject): void {
            console.log('Notification service get message')
            console.log(subject)
        }
    }

    class LeadService implements Observer {
        update(subject: Subject): void {
            console.log('LeadService service get message')
            console.log(subject)
        }
    }

    const subject = new NewLead()
    subject.state = new Lead('Vasilya', '89999999999')

    const s1 = new NotificationService()
    const s2 = new LeadService()

    subject.attach(s1)
    subject.attach(s2)

    subject.notify()

    subject.detach(s2)

    subject.notify()
}

namespace ObserverGeekBrainsExample {
    // Нагреватель с термостатом.
    // Датчик температуры, класс Sensor — владелец информации о температуре.
    // Кроме того, в системе участвуют: DisplayObserver (дисплей отображения температуры) и HeaterObserver («нагреватель»).
    // Задача класса — держать температуру в указанном диапазоне путем нагрева (повышения температуры) датчика.
    // Система состоит из двух логических частей:
    // 1. Ядро системы — Sensor (владелец информации, Издатель).
    // 2. Зависимые части — Подписчики

    // Сначала опишем интерфейс Наблюдателя.
    // Подходит как для PUSH-, так и для PULL-модели, подробности будут в разных его имплементациях

    const isSensor = (x: Subject | Sensor | null): x is Sensor => {
        if (x) {
            return 'name' in x
        }
        return false
    }

    abstract class Observer {
        public subject: Subject | Sensor | null
        protected observerState: any

        abstract update(arg: number): void
    }

    // Абстрактный издатель, ответственность класса — подписка/отписка и
    // нотификация Наблюдателей, представленных абстрактными интерфейсами.
    abstract class Subject {
        protected observers: Set<Observer> = new Set()
        protected subjectState: number

        public attach(observer: Observer) {
            observer.subject = this
            this.observers.add(observer)
        }

        public detach(observer: Observer) {
            observer.subject = null
            this.observers.delete(observer)
        }

        public notify() {
            for (const observer of this.observers) {
                observer.update(this.subjectState)
            }
        }
    }

    // Владелец информации наследует поведение абстрактного Издателя (при этом возможно использование композиции) и
    // нотифицирует Подписчиков при возникновении изменений в его состоянии.
    class Sensor extends Subject {
        public name: string = 'sensor'

        get t() {
            return this.subjectState
        }

        set t(t: number) {
            this.subjectState = t
            this.notify()
        }
    }

    // Конкретные подписчики.
    // Индикатор температуры отображает температуру при получении сообщения — типичный PUSH-клиент,
    // получает температуру как payload вызова update().
    class DisplayObserver extends Observer {
        update(arg: number): void {
            console.log(`${this.constructor.name} temperature ${arg}`)
        }
    }

    // Наблюдатель-нагреватель — типичный PULL-клиент, не обращает внимания на payload,
    // состояние наблюдаемого объекта получает и модифицирует вызовом его методов.
    class HeaterObserver extends Observer {

        constructor(public lowThreshold: number, public step: number) {
            super();

        }

        update(arg: number): void {
            if (isSensor(this.subject)) {
                const sensor = this.subject

                let t = sensor.t

                const deltaLow = t - this.lowThreshold

                if (deltaLow < 0) {
                    t += this.step
                    console.log(`${this.constructor.name} heat impulse +${this.step}`)
                }
            }
        }
    }

    // client code

    // демо
    const sensor = new Sensor()

    // подключаем наблюдателей за сенсором
    sensor.attach(new DisplayObserver())
    sensor.attach(new HeaterObserver(40, 20))

    // начальное значение
    sensor.t = 20

    // цикл энтропии - естественное охлаждение сенсора
    for (let i = 0; i < 5; i++) {
        const random_t = Math.random() * 10
        sensor.t = sensor.t - random_t


    }


}