// пример с защитой
interface IPaymentAPI {
    getPaymentDetails(id: number): IPaymentDetail | undefined
}

interface IPaymentDetail {
    id: number
    sum: number
}


class PymentAPI implements IPaymentAPI {
    private data = [{id: 1, sum: 10000}]

    getPaymentDetails(id: number): IPaymentDetail | undefined {
        return this.data.find(d => d.id === id)
    }
}

class PaymentAccessProxy implements IPaymentAPI {
    constructor(
        private api: PymentAPI,
        private userId: number
    ) {
    }

    getPaymentDetails(id: number): IPaymentDetail | undefined {
        if (this.userId === 1) {
            return this.api.getPaymentDetails(id)
        }
        console.log('Попытка получить данные платежа')
        return undefined
    }
}

const paymentAPI = new PymentAPI()

const proxy = new PaymentAccessProxy(paymentAPI, 1)
const proxy2 = new PaymentAccessProxy(paymentAPI, 2)

console.log(proxy.getPaymentDetails(1))
console.log(proxy2.getPaymentDetails(1))


// Пример из gb с кэшированием
interface CurrencyRateService {
    getCurrencyRate(currency: string): number
}

class CbrCurrencyRateService implements CurrencyRateService {
    getCurrencyRate(currency: string): number {
        // ... особенности реализации опущены
        return 0.57;
    }
}

class ProxyCurrencyRateService implements CurrencyRateService {
    rates: Record<string, number>

    constructor(
        // ссылка на реальный сервис
        private currencyRateService = new CbrCurrencyRateService()
    ) {
        // кэш курсов
        this.rates = {}
    }

    getCurrencyRate(currency: string): number {
        if (currency in this.rates) {
            console.log(`${currency}: from cache`)
            return this.rates[currency]
        }

        // если курс уже имеется в кэше, выдать из кеша
        console.log(`${currency}: from service`)

        // если ещё нет, то запросить реальный (медленный) сервис
        const rate = this.currencyRateService.getCurrencyRate(currency)
        this.rates[currency] = rate

        return rate;
    }
}

//client code

// создаём сервис
const currency_rate_service = new ProxyCurrencyRateService()
// получаем курс из кеша или от ЦБ (это решает прокси)
const yen_rate_request_1 = currency_rate_service.getCurrencyRate('yen')
console.log(yen_rate_request_1)
const yen_rate_request_2 = currency_rate_service.getCurrencyRate('yen')
console.log(yen_rate_request_2)

