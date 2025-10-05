/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Auth } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode';

class AccessToken {
    private static tokenName: string = 'accessToken';

    static get(): string {
        return window.localStorage.getItem(AccessToken.tokenName) as string;
    }

    static async getBearerToken(auth: Auth): Promise<string> {
        const token = await AccessToken.getValidToken(auth);
        return `Bearer ${token}`;
    }

    static set(token: string): void {
        window.localStorage.setItem(AccessToken.tokenName, token);
    }

    static isExpired(token: string) {
        const decoded: any = jwtDecode(token);
        const { exp: expInSecond } = decoded;
        const expInMilliSecond = expInSecond * 1e3;
        return Date.now() > expInMilliSecond;
    }

    /**
     * Will check expiry data of token and return the new one if it's expired
     */
    static async getValidToken(auth: Auth): Promise<string> {
        let token = AccessToken.get();

        // Check expired
        if (AccessToken.isExpired(token)) {
            token = (await auth.currentUser?.getIdToken()) as string;
        }

        return token;
    }
}

export { AccessToken };
