import { Transport as ITransport } from './interfaces/services/Transport';
import { News } from './services/News';
import { Blog } from './services/Blog';
import { Users } from './services/Users';
import { Courses } from './services/Courses/Courses';
import { Tasks } from './services/Courses/Tasks';
import { Courses as ICourses } from "./interfaces/services/Courses/Courses";
import { Tasks as ITasks } from "./interfaces/services/Courses/Tasks";
import { Index as IIndex } from "./interfaces/services/Courses/Index";
import { News as INews } from "./interfaces/services/News";
import { Blog as IBlog } from "./interfaces/services/Blog";
import { Index } from './services/Courses/Index';

export class LMS {
    private static transport: ITransport;

    static setTransport(transport: ITransport) {
        LMS.transport = transport;
    }

    static getTransport(): ITransport {
        return LMS.transport;
    }

    news(): INews {
        const result = new News();
        result.setTransport(LMS.getTransport());
        return result;
    }

    blog(): IBlog {
        const result = new Blog();
        result.setTransport(LMS.getTransport());
        return result;
    }

    users(): Users {
        const result = new Users();
        result.setTransport(LMS.getTransport());
        return result;
    }

    courses(): ICourses {
        const result = new Courses();
        result.setTransport(LMS.getTransport());
        return result;
    }

    tasks(): ITasks {
        const result = new Tasks();
        result.setTransport(LMS.getTransport());
        return result;
    }

    index(): IIndex {
        const result = new Index();
        result.setTransport(LMS.getTransport());
        return result;
    }
}