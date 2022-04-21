import axios from 'axios';
import { useState, useEffect } from 'react';

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type APIErrorType = {status: number, message: string};

type APIDataType<T>= Array<T> | null;

interface ApiReturnType<T> {
    data: APIDataType<T> | null,
    isPending: boolean,
    error: APIErrorType | null
}

const useApiHook = <T>(url: string, method: HTTPMethod = "GET"): ApiReturnType<T> => {
    const [data, setData] = useState<APIDataType<T> | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<APIErrorType | null>(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        axios({
            method: method,
            url: url,
            cancelToken: source.token
        }).then(response => {
            // console.log("from useapihook then", response);
            if(response.status === 200) {
                setData(response.data);
            } else {
                setError({status: response.status, message: response.data})
            }
            setIsPending(false);
        }).catch(err => {
            if(!axios.isCancel(err)) {
                console.log("from error", err);
                console.error(err.response);
                setIsPending(false);
                setError({ status: err.response.status, message: err.response.data});
            }
        })
        return () => source.cancel("Axios request cancelled");
    }, [url, method]);
    
    return {data, isPending, error};
}

export default useApiHook;