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
import { AuthCredentials } from './interfaces/models/Users/AuthCredentials';
import { Profile } from './interfaces/services/Profile';
import { Profile as ProfileService } from './services/Profile';

export class LMS {
    private static transport: ITransport;

    private credentials: AuthCredentials;

    static setTransport(transport: ITransport) {
        LMS.transport = transport;
    }

    static getTransport(): ITransport {
        return LMS.transport;
    }

    constructor(credentials: AuthCredentials) {
        if (credentials) {
            this.setCredentials(credentials);
        }
    }

    setCredentials(credentials: AuthCredentials): LMS {
        this.credentials = credentials;

        return this;
    }

    getCredentials(): AuthCredentials {
        return this.credentials;
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

    profile(): Profile {
        const result = new ProfileService();
        result.setTransport(LMS.getTransport());
        return result;
    }
}