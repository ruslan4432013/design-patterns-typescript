interface IInsurance {
    id: number;
    status: string;

    setVehicle(vehicle: any): void

    submit(): Promise<boolean>
}


class TFInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }

    async submit(): Promise<boolean> {
        const res = await fetch('', {
            method: 'POST',
            body: JSON.stringify({vehicle: this.vehicle})
        })

        const data = await res.json()

        return data.isSuccess
    }
}


class ABInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }

    async submit(): Promise<boolean> {
        const res = await fetch('', {
            method: 'POST',
            body: JSON.stringify({vehicle: this.vehicle})
        })
        const data = await res.json()
        return data.yes
    }
}

abstract class InsuranceFactory {
    db: {
        save(id: number, status: string): void
    }

    abstract createInsurance(): IInsurance

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}


const tfInsuranceFactory = new TFInsuranceFactory()
const ins = tfInsuranceFactory.createInsurance()
tfInsuranceFactory.saveHistory(ins)

// with abstract factory method

const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance,
};

type IT = typeof INSURANCE_TYPE

class InsuranceFactoryAlt {
    db: {
        save(id: number, status: string): void
    }

    createInsurance<T extends keyof IT>(type: T): IT[T] {
        return INSURANCE_TYPE[type]
    }

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt()

const ins2 = new (insuranceFactoryAlt.createInsurance('tf'))
insuranceFactoryAlt.saveHistory(ins2)


// gb example
abstract class PriceProvider {
    abstract getPrice(article: number): number
}

abstract class DocProvider {
    abstract getDoc(id: number): string
    abstract sendPayment(payment: number): void
}

abstract class MarketingProvider {
    abstract claimSales(): void
    abstract getBonus(): void
}

abstract class ExchangeFactory {
    abstract createPriceProvider(): PriceProvider
    abstract createDocProvider(): DocProvider
    abstract createMarketingProvider(): MarketingProvider
}

class CitilinkPriceProvider extends PriceProvider {
    getPrice(article: number): any {
        return 0
    }
}

class CitilinkExchangeFactory extends ExchangeFactory {
    createDocProvider(): DocProvider {
        return new class extends DocProvider {
            getDoc(id: number): string {
                return "";
            }

            sendPayment(payment: number): void {
            }
        };
    }
 
    createMarketingProvider(): MarketingProvider {
        return new class extends MarketingProvider {
            claimSales(): void {
            }

            getBonus(): void {
            }
        }
    }

    createPriceProvider(): PriceProvider {
        return new CitilinkPriceProvider();
    }

}
