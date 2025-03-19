import { getCookie } from "cookies-next";

interface ApiRes {
    statusCode: number,
    message?: string,
    data?: any
}
export async function fetchApi(url: string, data: any, method: string = "POST"): Promise<ApiRes> {
    try {
        let param: any = data ? JSON.parse(data) : ''
        console.log({param});
        
        let queryString: string = (method === "GET" && param != '') ? Object?.keys(param.params).map(key => key + '=' + param.params[key]).join('&') : '';
        console.log({queryString});
        
        let apiUrl: string = process.env.API_ENDPOINT + url + (queryString ? '?' + queryString : '');
        
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getCookie('acsmailtkn') || ""
            },
            body: method === "POST" ? data : undefined
        })
        return { statusCode: response.status, data: await response.json() }
    } catch (e) {
        console.log(e, "e==============")
        return { statusCode: 400, data: { message: 'Internal server erroradadsds' } }
    }
}