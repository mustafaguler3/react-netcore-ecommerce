import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:5001/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve,1000));

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
},(error: AxiosError) => {
    const {data,status} = error.response as AxiosResponse;
    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 500:
            router.navigate("/server-error",{state:{error:data}})
            break;
        default:
            break;        
    }
    return Promise.reject(error.response);
});

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url:string, body:{}) => axios.post(url, body).then(responseBody),
    put: (url:string,body:{}) => axios.put(url, body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody)    
}

const Catalog = {
    list: () => request.get("products"),
    details: (id:number) => request.get(`products/${id}`)
}
const TestErrors = {
    get400Error:() => request.get("buggy/bad-request"),
    get401Error:() => request.get("buggy/unauthorized"),
    get404Error:() => request.get("buggy/not-found"),
    get500Error:() => request.get("buggy/server-error"),
    getValidationError:() => request.get("buggy/validation-error"),
}
const Basket = {
    get: () => request.get("Basket"),
    addItem: (productId:number,quantity=1) => request.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId:number,quantity=1) => request.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;