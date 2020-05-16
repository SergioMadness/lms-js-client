import { AuthCredentials as IAuthCredentials } from '../../interfaces/models/Users/AuthCredentials';

export class AuthCredentials implements IAuthCredentials {
    private accessToken: string;
    private refreshToken: string;
    private tokenType: string;
    private expires: Date;

    setAccessToken(token: string): AuthCredentials {
        this.accessToken = token;

        return this;
    }

    getAccessToken(): string {
        return this.accessToken;
    }

    setRefreshToken(token: string): AuthCredentials {
        this.refreshToken = token;

        return this;
    }

    getRefreshToken(): string {
        return this.refreshToken;
    }

    setTokenType(type: string): AuthCredentials {
        this.tokenType = type;

        return this;
    }

    getTokenType(): string {
        return this.tokenType;
    }

    setExpiresDate(date: Date): AuthCredentials {
        this.expires = date;

        return this;
    }

    getExpiresDate(): Date {
        return this.expires;
    }

    needRefresh(): boolean {
        return this.getExpiresDate() < new Date();
    }

    isAuthorized(): boolean {
        return this.getAccessToken() && !this.needRefresh();
    }
}