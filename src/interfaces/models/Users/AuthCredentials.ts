/** 
 * Interface for authorization data
 */
export interface AuthCredentials {
    getAccessToken(): string;

    getRefreshToken(): string;

    getTokenType(): string;

    getExpiresDate(): Date;

    needRefresh(): boolean;

    isAuthorized(): boolean;
}