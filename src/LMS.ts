import { Transport as ITransport } from './interfaces/services/Transport';
import { News } from './services/News';
import { Blog } from './services/Blog';
import { Users } from './services/Users';
import { Courses } from './services/Courses/Courses';
import { Tasks } from './services/Courses/Tasks';
import { Courses as ICourses } from "./interfaces/services/Courses/Courses";
import { Programs as IPrograms } from "./interfaces/services/Programs/Programs";
import { Tasks as ITasks } from "./interfaces/services/Courses/Tasks";
import { Index as IIndex } from "./interfaces/services/Courses/Index";
import { News as INews } from "./interfaces/services/News";
import { Blog as IBlog } from "./interfaces/services/Blog";
import { Index } from './services/Courses/Index';
import { AuthCredentials } from './interfaces/models/Users/AuthCredentials';
import { Profile } from './interfaces/services/Profile';
import { Profile as ProfileService } from './services/Profile';
import { Programs } from './services/Programs/Programs';
import { Attempts } from './services/Courses/Attempts';
import { Attempts as IAttempts } from './interfaces/services/Attempts/Attempts';
import { Offline } from './services/Courses/Offline';
import { Proctoring } from './services/Courses/Proctoring';
import { Offline as IOffline } from './interfaces/services/Courses/Offline';
import { Proctoring as IProctoring } from './interfaces/services/Courses/Proctoring';
import { Certificates } from './services/Courses/Certificates';
import { Storage } from './services/Storage';
import { Webinars } from './services/Courses/Webinars';
import { Webinars as IWebinars } from './interfaces/services/Courses/Webinars';
import { CameraProctoring } from './services/Courses/CameraProctoring';
import { CameraProctoring as ICameraProctoring } from './interfaces/services/Courses/CameraProctoring';
import { Tutor } from './services/Courses/Tutor';
import { Tutor as ITutor } from './interfaces/services/Courses/Tutor';
import { Comments } from './services/Comments';
import { Comments as IComments } from './interfaces/services/Comments';
import { Gamification } from './services/Gamification';
import { Gamification as IGamification } from './interfaces/services/Gamification';
import { Orders } from './services/Orders';
import { Orders as IOrders } from './interfaces/services/Orders';

export class LMS {
    private static transport: ITransport;

    private static credentials: AuthCredentials;

    static setTransport(transport: ITransport) {
        LMS.transport = transport;
    }

    static getTransport(): ITransport {
        LMS.transport.setAuthCredentials(LMS.credentials);
        return LMS.transport;
    }

    static setCredentials(credentials: AuthCredentials) {
        const transport = LMS.getTransport();
        LMS.credentials = credentials;
        if (transport !== null) {
            transport.setAuthCredentials(credentials);
        }
    }

    static getCredentials(): AuthCredentials {
        return LMS.credentials;
    }

    constructor(credentials: AuthCredentials) {
        if (credentials) {
            LMS.setCredentials(credentials);
        }
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
        const result = new Users(LMS.getCredentials());
        result.setTransport(LMS.getTransport());
        return result;
    }

    courses(): ICourses {
        const result = new Courses();
        result.setTransport(LMS.getTransport());
        return result;
    }

    programs(): IPrograms {
        const result = new Programs();
        result.setTransport(LMS.getTransport());
        return result;
    }

    tasks(): ITasks {
        const result = new Tasks();
        result.setTransport(LMS.getTransport());
        return result;
    }

    attempts(): IAttempts {
        const result = new Attempts();
        result.setTransport(LMS.getTransport());
        return result;
    }

    proctoring(): IProctoring {
        const result = new Proctoring();
        result.setTransport(LMS.getTransport());
        return result;
    }

    cameraProctoring(): ICameraProctoring {
        const result = new CameraProctoring();
        result.setTransport(LMS.getTransport());
        return result;
    }

    webinars(): IWebinars {
        const result = new Webinars();
        result.setTransport(LMS.getTransport());
        return result;
    }

    tutor(): ITutor {
        const result = new Tutor();
        result.setTransport(LMS.getTransport());
        return result;
    }

    offline(): IOffline {
        const result = new Offline();
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

    certificates(): Certificates {
        const result = new Certificates();
        result.setTransport(LMS.getTransport());
        return result;
    }

    comments(): IComments {
        const result = new Comments();
        result.setTransport(LMS.getTransport());
        return result;
    }

    gamification(): IGamification {
        const result = new Gamification();
        result.setTransport(LMS.getTransport());
        return result;
    }

    orders(): IOrders {
        const result = new Orders();
        result.setTransport(LMS.getTransport());
        return result;
    }

    storage(): Storage {
        const result = new Storage();
        result.setTransport(LMS.getTransport());
        return result;
    }
}