import { Variant } from 'src/utils'

namespace VisitorExample {

    function visit<T1, T2, T3, U1, U2, U3>(
        variant: Variant<T1, T2, T3>,
        func1: (value: T1) => U1,
        func2: (value: T2) => U2,
        func3: (value: T3) => U3,
    ): Variant<U1, U2, U3> {
        switch (variant.index) {
            case 0:
                return Variant.make1(func1(<T1>variant.value))
            case 1:
                return Variant.make2(func2(<T2>variant.value))
            case 2:
                return Variant.make3(func3(<T3>variant.value))
            default:
                throw new Error()
        }
    }

    class Renderer {
        renderParagraph(paragraph: Paragraph) {
            console.log('render paragraph', paragraph)
        }

        renderPicture(picture: Picture) {
            console.log('render picture', picture)
        }

        renderTable(table: Table) {
            console.log('render table', table)
        }
    }

    class ScreenReader {
        readParagraph(paragraph: Paragraph) {
            console.log('read paragraph', paragraph)
        }

        readPicture(picture: Picture) {
            console.log('read picture', picture)
        }

        readTable(table: Table) {
            console.log('read table', table)
        }
    }

    class Paragraph {
        p1 = 'p1'
    }

    class Picture {
        img = 'img'
    }

    class Table {
        table = 'table'
    }

    let renderer = new Renderer()

    let doc: Variant<Paragraph, Picture, Table>[] = [
        Variant.make1(new Paragraph()),
        Variant.make3(new Table())
    ]

    for (let item of doc) {
        visit(
            item,
            (paragraph: Paragraph) => renderer.renderParagraph(paragraph),
            (picture: Picture) => renderer.renderPicture(picture),
            (table: Table) => renderer.renderTable(table),
        )
    }
}

