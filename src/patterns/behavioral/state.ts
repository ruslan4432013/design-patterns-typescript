namespace PurpleSchoolExample {
    class DocumentItem {
        public text: string;
        private state: DocumentItemState

        constructor() {
            this.setState(new DraftDocumentItemState())
        }

        getState() {
            return this.state
        }

        setState(state: DocumentItemState) {
            this.state = state
            this.state.setContext(this)
        }

        publishDoc() {
            this.state.publish()
        }

        deleteDoc() {
            this.state.delete()
        }
    }

    abstract class DocumentItemState {
        public name: string
        public item: DocumentItem

        public setContext(item: DocumentItem) {
            this.item = item
        }

        public abstract publish(): void

        public abstract delete(): void
    }

    class DraftDocumentItemState extends DocumentItemState {

        constructor() {
            super()
            this.name = 'DraftDocument'

        }

        delete(): void {
            console.log('Документ удален')
        }

        publish(): void {
            console.log(`На сайт отправлен текст ${this.item.text}`)
            this.item.setState(new PublishDocumentItemState())
        }
    }

    class PublishDocumentItemState extends DocumentItemState {

        constructor() {
            super()
            this.name = 'PublishDocumentItemState'

        }

        delete(): void {
            console.log('Снято с публикации')
            this.item.setState(new DraftDocumentItemState())
        }

        publish(): void {
            console.log('Нельзя опубликовать опубликованный документ')
        }
    }

    const item = new DocumentItem()
    item.text = 'Мой пост'
    console.log(item.getState())
    item.publishDoc()
    console.log(item.getState())
    item.publishDoc()
    item.deleteDoc()
    console.log(item.getState())
}
