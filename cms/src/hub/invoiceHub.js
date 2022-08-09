import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

class InvoiceHub {
    constructor() {
        this.client = new HubConnectionBuilder()
            .withUrl('http://localhost:5298/hub')
            .configureLogging(LogLevel.Information)
            .build()
    }
    start() {
        this.client.start().then(res=>console.log(res));
    }
}

export default new InvoiceHub();