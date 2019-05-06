/// <reference path="./interfaces/services/Transport.ts" />
/// <reference path="./services/News.ts" />
/// <reference path="./services/Blog.ts" />
/// <reference path="./services/Users.ts" />
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

    users(): Services.Users {
        const result = new Services.Users();
        result.setTransport(LMS.getTransport());
        return result;
    }
}