enum ImageFormat {
    Png = 'png',
    Jpeg = 'jpeg'
}

interface IResolution {
    width: number
    height: number
}

interface IImageConversion extends IResolution {
    format: ImageFormat
}

class ImageBuilder {
    private formats: ImageFormat[] = []
    private resolutions: IResolution[] = []

    addPng() {
        if (!this.formats.includes(ImageFormat.Png)) {
            this.formats.push(ImageFormat.Png)
        }
        return this
    }

    addJpeg() {
        if (!this.formats.includes(ImageFormat.Jpeg)) {
            this.formats.push(ImageFormat.Jpeg)
        }
        return this
    }

    addResolution(width: number, height: number) {
        this.resolutions.push({width, height})
        return this
    }

    build(): IImageConversion[] {
        const res: IImageConversion[] = []

        for (const r of this.resolutions) {
            for (const f of this.formats) {
                res.push({
                    format: f,
                    width: r.width,
                    height: r.height,
                })
            }
        }
        return res
    }
}


console.log(
    new ImageBuilder()
        .addJpeg()
        .addPng()
        .addResolution(100, 50)
        .addResolution(200, 100)
        .build()
)

// Пример из gb. Создание сообщения электронной почты. Есть обязательные опции (кому) и множество
// факультативных, использование которых, скорее всего, будет различным в каждой конкретной
// ситуации


class MimeMessage {
    session: any
    _fromAddress: string
    _toAddress: string
    _ccAddress: string
    _subject: string
    _body: string


    constructor(session: any) {
        this.session = session
    }

}

// построитель сообщения электронной почты
class MimeMessageBuilder {
    message: MimeMessage

    constructor(session: MimeMessage) {
        this.message = new MimeMessage(session)
    }

    from_addr(address: string) {
        this.message._fromAddress = address
        return this
    }

    toAddr(address: string) {
        this.message._toAddress = address
        return this
    }

    ccAddr(address: string) {
        this.message._ccAddress = address
        return this
    }

    subject(subject: string) {
        this.message._subject = subject
        return this
    }

    body(body: string) {
        this.message._body = body
        return this
    }

    build() {
        return this.message
    }
}

// клиентский код
class Client {
    sendMail(session: any) {
        const message = new MimeMessageBuilder(session)
            .from_addr('me')
            .toAddr('you')
            .ccAddr('someone')
            .subject('test')
            .body('hello')
            .build()
    }
}

// Второй вариант реализации Builder на примере создания столов.
class TableDirector {
    _builder: AbstractTableBuilder

    construct(builder: AbstractTableBuilder) {
        this._builder = builder
        this._builder._buildTabletop()
        this._builder._buildLegs()
        this._builder._buildCoverage()
    }
}

class Table {
    tabletop: number = 0
    legs: number = 0
    coverage: string = ''
}


abstract class AbstractTableBuilder {
    product: Table = new Table()

    abstract _buildTabletop(): void
    abstract _buildLegs(): void
    abstract _buildCoverage(): void
}

class BigTableBuilder extends AbstractTableBuilder {
    _buildCoverage(): void {
        this.product.tabletop = 120
    }

    _buildLegs(): void {
        this.product.legs = 4
    }

    _buildTabletop(): void {
        this.product.coverage = 'vanish'
    }

}


class SmallTableBuilder extends AbstractTableBuilder {
    _buildCoverage(): void {
        this.product.tabletop = 80
    }

    _buildLegs(): void {
        this.product.legs = 3
    }

    _buildTabletop(): void {
        this.product.coverage = 'yacht lacquer'
    }

}


const bigTableBuilder = new BigTableBuilder()
const smallTableBuilder = new SmallTableBuilder()

const director = new TableDirector()

director.construct(bigTableBuilder)
director.construct(smallTableBuilder)

const bigTable1 = bigTableBuilder.product
const smallTable1 = smallTableBuilder.product


console.log(bigTable1)
console.log(smallTable1)















