import { User } from "../../interfaces/models/Users/User";

export interface Profile {
    get(): Promise<User>;
}