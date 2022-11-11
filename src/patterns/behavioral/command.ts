namespace PurpleSchoolExample {
    class User {
        constructor(public userID: number) {
        }
    }

    class CommandHistory {
        public commands: Command[] = []

        push(command: Command) {
            this.commands.push(command)
        }

        remove(command: Command) {
            this.commands = this.commands.filter(c => c.commandId !== command.commandId)
        }
    }

    abstract class Command {
        public commandId: number

        abstract execute(): void

        constructor(public history: CommandHistory) {
            this.commandId = Math.random()
        }
    }

    class AddUserCommand extends Command {
        constructor(
            private user: User,
            private receiver: UserService,
            history: CommandHistory
        ) {
            super(history);
        }

        execute(): void {
            this.receiver.saveUser(this.user)
            this.history.push(this)
        }

        undo() {
            this.receiver.deleteUser(this.user.userID)
            this.history.remove(this)
        }
    }

    class UserService {
        saveUser(user: User) {
            console.log(`Сохраняю пользователя с id ${user.userID}`)
        }

        deleteUser(userId: number) {
            console.log(`Удаляем пользователя с id ${userId}`)
        }

    }


    class Controller {
        receiver: UserService
        history: CommandHistory = new CommandHistory()

        addReceiver(receiver: UserService) {
            this.receiver = receiver
        }

        run() {
            const addUserCommand = new AddUserCommand(
                new User(1),
                this.receiver,
                this.history
            )
            addUserCommand.execute()
            console.log(addUserCommand.history)
            addUserCommand.undo()
            console.log(addUserCommand.history)
        }
    }

    const controller = new Controller()
    controller.addReceiver(new UserService())
    controller.run()
}


namespace GeekBrainsExample {

    abstract class Command {

        constructor(protected _receiver: CommandsReceiver) {
        }

        abstract execute(): void
    }

    class ActionCommand extends Command {
        execute() {
            this._receiver.action()
        }
    }

    class PauseCommand extends Command {
        execute() {
            this._receiver.pause()
        }

    }

    class CommandsReceiver {
        action() {
            console.log('action in receiver')
        }

        pause() {
            console.log('pause in receiver')
        }
    }

    class CommandsInvoker {
        protected _commands_list: Command[] = []

        storeCommand(command: Command) {
            this._commands_list.push(command)
        }

        executeCommands() {
            this._commands_list.forEach(command => {
                command.execute()
            })
        }
    }

    const commandsReceiver = new CommandsReceiver()

    const actionCommand = new ActionCommand(commandsReceiver)
    const pauseCommand = new PauseCommand(commandsReceiver)

    const commandsInvoker = new CommandsInvoker()

    commandsInvoker.storeCommand(actionCommand)
    commandsInvoker.storeCommand(pauseCommand)

    commandsInvoker.executeCommands()
}


