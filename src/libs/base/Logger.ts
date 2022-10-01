
export class Logger {

    constructor(
        public showLogs = true,
    ) {

    }

    log(message: any | any[], optionalParams?: any[]) {
        if (!this.showLogs) return
        return console.log(message, optionalParams)
    }

    error(message: any | any[], optionalParams?: any[]) {
        if (!this.showLogs) return
        return console.error(message, optionalParams)
    }

    warn(message: any | any[], optionalParams?: any[]) {
        if (!this.showLogs) return
        return console.error(message, optionalParams)
    }

}

const logger = new Logger(true);
export default logger; 