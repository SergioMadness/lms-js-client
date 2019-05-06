/// <reference path="../interfaces/services/Users.ts" />
/// <reference path="../interfaces/services/Transport.ts" />

namespace Services {
    export const METHOD_REGISTRATION = '/api/v1/registration';

    export const METHOD_GET_USER = '/api/v1/users/{id}';

    /**
     * Class to work with user services
     */
    export class Users implements Interfaces.Services.Users {
        private transport: Interfaces.Services.Transport;

        async register(user: Interfaces.Models.Users.User): Promise<Interfaces.Models.Users.User> {
            const response = await this.getTransport().send(METHOD_REGISTRATION, HTTP_METHOD_POST, user.toArray());
            return this.create(response.shift());
        }

        login(login: string, password: string): Promise<Interfaces.Models.Users.User> {
            throw new Error("Method not implemented.");
        }

        get(id: number): Promise<Interfaces.Models.Users.User> {
            throw new Error("Method not implemented.");
        }

        create(attributes?: Map<string, any>): Interfaces.Models.Users.User {
            return new Models.Users.User(attributes);
        }

        setTransport(transport: Interfaces.Services.Transport): Services.Users {
            this.transport = transport;
            return this;
        }

        getTransport(): Interfaces.Services.Transport {
            return this.transport;
        }
    }
}