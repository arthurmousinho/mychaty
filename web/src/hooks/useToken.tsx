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
        const token: string = cookies.get('token');
        return token;
    }

    function decodeToken(token: string) {
        const infos = jwtDecode(token);
        return infos as Token;  
    }
    
    function deleteToken() {
        removeCookie(TOKEN_KEY, { path: '/' }); 
    }

    return { 
        saveToken,
        getToken, 
        deleteToken,  
    };

}