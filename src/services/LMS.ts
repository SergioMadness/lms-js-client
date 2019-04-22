export class LMS {
    private static transport: Interfaces.Services.Transport;

    static setTransport(transport: Interfaces.Services.Transport) {
        LMS.transport = transport;
    }

    static getTransport(): Interfaces.Services.Transport {
        return LMS.transport;
    }

    news(): Services.News {
        const result = new Services.News();
        result.setTransport(LMS.getTransport());
        return result;
    }

    blog(): Services.Blog {
        const result = new Services.Blog();
        result.setTransport(LMS.getTransport());
        return result;
    }
}