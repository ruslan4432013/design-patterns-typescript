interface IProvider {
    sendMessage(message: string): void

    connect(config: unknown): void

    disconnect(): void
}

class TelegramProvider implements IProvider {
    connect(config: string): void {
        console.log(config)
    }

    disconnect(): void {
        console.log('disconnected TG')
    }

    sendMessage(message: string): void {
        console.log(message)
    }
}

class WhatsAppProvider implements IProvider {
    connect(config: string): void {
        console.log(config)
    }

    disconnect(): void {
        console.log('disconnected WA')
    }

    sendMessage(message: string): void {
        console.log(message)
    }
}

class NotificationSender {
    constructor(private provider: IProvider) {
    }

    send() {
        this.provider.connect('connect')
        this.provider.sendMessage('message')
        this.provider.disconnect()
    }
}

class DelayNotificationSender extends NotificationSender {
    sendDelayed() {

    }
}

const sender = new NotificationSender(new TelegramProvider())
sender.send()

const sender2 = new NotificationSender(new WhatsAppProvider())
sender2.send()
