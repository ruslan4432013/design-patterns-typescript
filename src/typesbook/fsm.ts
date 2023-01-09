declare function read(): string

enum Connection {
    OPEN,
    CLOSED
}

// My variant
class FinalStateMachine {
    private connection: Connection = Connection.CLOSED

    connect() {
        this.connection = Connection.OPEN
    }

    disconnect() {
        this.connection = Connection.CLOSED
    }

    process() {
        switch (this.connection) {
            case Connection.CLOSED:
                this.connect()
                break
            case Connection.OPEN:
                const sub = read()
                if (sub.length === 0) {
                    this.disconnect()
                } else {
                    console.log(sub)
                }
                break
            default:
                throw new Error('Unknown connection type')
        }
    }
}

// example from book
class Connect {
    private doProcess: () => void = this.processClosedConnection

    public process() {
        this.doProcess()
    }

    private processClosedConnection() {
        this.doProcess = this.processOpenConnection
    }

    private processOpenConnection() {
        const value: string = read()
        if (value.length === 0) {
            this.doProcess = this.processClosedConnection
        } else {
            console.log(value)
        }
    }
}
