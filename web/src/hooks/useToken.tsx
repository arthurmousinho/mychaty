import { jwtDecode } from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";

export interface Token {
    name: string;
    email: string;
    sub: string;
    exp: number;
}

export function useToken() {

    const TOKEN_KEY = 'mychaty-token'

    const [, setCookie, removeCookie] = useCookies();

    function saveToken(token: string) {
        const tokenDecoded = decodeToken(token);
        setCookie(
            TOKEN_KEY, 
            token, 
            { 
                path: "/" ,
                maxAge: tokenDecoded.exp
            }
        );
    }

    function getToken() {
        const cookies = new Cookies();
        const token: string = cookies.get(TOKEN_KEY);
        return token;
    }

    function decodeToken(token: string) {
        const infos = jwtDecode(token);
        return infos as Token;  
    }
    
    function deleteToken() {
        removeCookie(TOKEN_KEY, { path: '/' }); 
    }

    function hasToken() {
        if (getToken()) return true;
        return false;
    }

    function getTokenInfos() {
        const token = getToken();
        return decodeToken(token);
    }

    return { 
        saveToken,
        getToken, 
        deleteToken,  
        hasToken,
        getTokenInfos
    };

}