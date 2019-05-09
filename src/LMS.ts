import { Transport as ITransport } from './interfaces/services/Transport';
import { News } from './services/News';
import { Blog } from './services/Blog';
import { Users } from './services/Users';

export class LMS {
    private static transport: ITransport;

    static setTransport(transport: ITransport) {
        LMS.transport = transport;
    }

    static getTransport(): ITransport {
        return LMS.transport;
    }

    news(): News {
        const result = new News();
        result.setTransport(LMS.getTransport());
        return result;
    }

    blog(): Blog {
        const result = new Blog();
        result.setTransport(LMS.getTransport());
        return result;
    }

    users(): Users {
        const result = new Users();
        result.setTransport(LMS.getTransport());
        return result;
    }
}