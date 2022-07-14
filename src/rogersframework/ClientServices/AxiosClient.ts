/* eslint-disable */
import IClient from "./IClient";
import axios from 'axios';
import { stopLoader, updateProgressCRM } from "../../Actions";
import Logger from "../Logger/Logger";
import { clientUitls } from "./apiClientUtil";
import { adalConfig, msalApp, requiresInteraction } from "src/Login/ADAL/auth-util";
import { setAuthContextByAxios } from "src/Login/MSAL/msalConfig";
axios.interceptors.response.use((response) => {
    return response
 },
 function (error) {
    console.log("Error AXIOS Said",error.config);
    if (error?.response?.status === 401 && error?.config?.url.includes("getLoggedInUserDetail")) {
      console.log("Returning Exception from path condition");
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        console.log("Got 401");
        originalRequest._retry = true;
        const request = {scopes:[adalConfig.clientId]};
        try{ 
        return msalApp.acquireTokenSilent(request).then((returnVal: any) => { 
            const token = returnVal
            console.log('token===', token);
            setAuthContextByAxios(token);
           // axios.defaults.headers.get['Authorization'] = 'Bearer ' + token.idToken.rawIdToken; 
            originalRequest.headers.Authorization = 'Bearer ' + token.idToken.rawIdToken; 
            // console.log("Renewed token",token);
            if(error?.config?.url.includes("upload")) {
                const data = originalRequest.data;
                console.log("ORG Data",data);
            }
            setTimeout(function () {console.log("From inside timeout",originalRequest);axios(originalRequest),500});
            return axios(originalRequest);
        }
        ).catch<any>(error => {
            // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
            // due to consent or interaction required ONLY
            console.log("In 401, landed to catch",error.errorCode);
            if (requiresInteraction(error.errorCode)) {
                return msalApp.acquireTokenRedirect(request)
            }
            else {
                console.error('Non-interactive error:', error.errorCode);
            }
        });
     } catch(e) {
         console.error("Something went wrong");
     }
    }
    return Promise.reject(error);
 });

export class AxiosClient implements IClient {
     clientStore: any;
     clientUtil: any;
    constructor(store: any) {
        this.clientStore = store;
        this.clientUtil = new clientUitls(store);
    }

     get<T>(url: string, data?: any, options?: any) {
        if (data.hasOwnProperty("authToken") && data.authToken !== "") {
            axios.defaults.headers.get['Authorization'] = "Bearer " + data.authToken
        }
        // this.getResponse(url).then((resJson: any) => { return resJson });
    }
    async getResponse(url: any, data: any) {
        
        axios.defaults.headers.common.Accept = "application/json";
        if (data.hasOwnProperty("authToken") && data.authToken !== "") {
            axios.defaults.headers.get['Authorization'] = "Bearer " + data.authToken
        }
        console.log('data===', data);
        console.log('url===', url);
        return axios.get(url, {
            
            headers: {
                'Content-Type': 'application/json'
            }, data: {}
        })
            .then((res: any) => {
                return res.data;
            }).catch((error) => {
                if (error.response) {
                     console.log('error.response.data===', error.response.data);
                    Logger.getInstance().printWarnLogs(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    Logger.getInstance().printWarnLogs(error.request);
                } else {
                    Logger.getInstance().printWarnLogs('Error while invoking api', error.message);
                }
                // console.log("Getting error",error.response.status);
                const errorObject = { status: error.response.status, errorData: error.response.data };
                this.clientUtil.checkAndReportError(errorObject);
                return errorObject;
            });

    }

     post(requestType: any, options: any, payload: any) {
        const contType = "Content-Type";
        axios.defaults.headers.common.Accept = "application/json";
        axios.defaults.headers.post[contType] = "application/json";
        if (options.hasOwnProperty("authToken")) {
             axios.defaults.headers.get['Authorization'] = "Bearer " + options.authToken
        }
        return axios({
            data: payload,
            method: 'post',
            url: options.url,
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
        })
            .then(res => {
                // this.clientStore.dispatch(stopLoader({}));
                return JSON.parse(JSON.stringify(res.data));
            }).catch((error) => {
                if (error.response) {
                    // console.log("Failed ",error.response.data);
                    Logger.getInstance().printWarnLogs("Status with failure", error?.response?.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    Logger.getInstance().printWarnLogs(error.request);
                } else {
                    Logger.getInstance().printWarnLogs('Error', error.message);
                }
                if (!error.hasOwnProperty("response")) {
                    error = { response: { status: 500, data: "" } };
                }
                const errorObject = { status: error?.response?.status, errorData: error?.response?.data };
                this.clientUtil.checkAndReportError(errorObject);
                return errorObject;
            });
    }

     put(requestType: any, options: any, payload: any) {
        const contType = "Content-Type";
        axios.defaults.headers.common.Accept = "application/json";
        axios.defaults.headers.post[contType] = "application/json";
        if (options.hasOwnProperty("authToken")) {
            axios.defaults.headers.get['Authorization'] = "Bearer " + options.authToken
        }
        return axios({
            data: payload,
            method: 'put',
            url: options.url
        })
            .then(res => {
                // this.clientStore.dispatch(stopLoader({}));
                return res.data;
            }).catch((error) => {
                if (error.response) {
                    // console.log("Failed ",error.response.data);
                    Logger.getInstance().printWarnLogs("Status with failure", error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    Logger.getInstance().printWarnLogs(error.request);
                } else {
                    Logger.getInstance().printWarnLogs('Error', error.message);
                }
                if (!error.hasOwnProperty("response")) {
                    error = { response: { status: 500, data: "" } };
                }
                const errorObject = { status: error.response.status, errorData: error.response.data };
                this.clientUtil.checkAndReportError(errorObject);
                return errorObject;
            });
    }



     postAndDownload(requestType: any, options: any, payload: any) {
        const contType = "Content-Type";
        axios.defaults.headers.common.Accept = "application/json";
        axios.defaults.headers.post[contType] = "application/json";
        if (options.hasOwnProperty("authToken")) {
            axios.defaults.headers.get['Authorization'] = "Bearer " + options.authToken
        }
        return axios({
            data: payload,
            method: 'post',
            url: options.url,
            responseType: 'arraybuffer'
        })
            .then(res => {
                // this.clientStore.dispatch(stopLoader({}));
                return {
                    data: res.data,
                    headers: res.headers
                }
                // console.log("Return data",res.headers['content-disposition'])
                // return res.data;
            }).catch((error) => {
                if (error.response) {
                    // console.log("Failed ",error.response.data);
                    Logger.getInstance().printWarnLogs("Status with failure", error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    Logger.getInstance().printWarnLogs(error.request);
                } else {
                    Logger.getInstance().printWarnLogs('Error', error.message);
                }
                if (!error.hasOwnProperty("response")) {
                    error = { response: { status: 500, data: "" } };
                }
                const errorObject = { status: error.response.status, errorData: error.response.data };
                this.clientUtil.checkAndReportError(errorObject);
                return errorObject;
            });
    }

     delete(options: any, payload: any) {
        const contType = "Content-Type";
        axios.defaults.headers.common.Accept = "application/json";
        axios.defaults.headers.post[contType] = "application/json";
        if (options.hasOwnProperty("authToken")) {
            axios.defaults.headers.get['Authorization'] = "Bearer " + options.authToken
        }
        return axios({
            data: payload,
            method: 'delete',
            url: options.url
        })
            .then(res => {
                this.clientStore.dispatch(stopLoader({}));
                return res.data;
            }).catch((error) => {
                if (error.response) {
                    // console.log("Failed ",error.response.data);
                    Logger.getInstance().printWarnLogs("Status with failure", error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    Logger.getInstance().printWarnLogs(error.request);
                } else {
                    Logger.getInstance().printWarnLogs('Error', error.message);
                }
                // console.log(error.config);
                return { status: error.response.status, errorData: error.response.data };
            });
    }

     postFiles(options: any, payload: any) {
        const contType = "Content-Type";
        axios.defaults.headers.common.Accept = "application/json";
        axios.defaults.headers.post[contType] = "multipart/form-data";
        axios.defaults.maxContentLength = Infinity;
        if (options.hasOwnProperty("authToken")) {
            axios.defaults.headers.get['Authorization'] = "Bearer " + options.authToken
        }
        if(!payload) {
            console.log("The payload is empty");
        }
        return axios({
            data: payload,
            method: 'post',
            url: options.url,
            onUploadProgress: (progressEvent: any) => {
                try{
                    console.log(" progress ", progressEvent.loaded, " total", progressEvent.total, " %", (progressEvent.loaded / progressEvent.total) * 100, " Progress if ", ((progressEvent.loaded / progressEvent.total) * 100) <= 97);
                    if (((progressEvent.loaded / progressEvent.total) * 100) <= 97) {
                        this.clientStore.dispatch(updateProgressCRM({ data: progressEvent }));
                    }
                    else if (((progressEvent.loaded / progressEvent.total) * 100) >= 97) {
                        const fakeProgEvent = { loaded: progressEvent.loaded, total: progressEvent.total };
                        fakeProgEvent.loaded = progressEvent.total - ((progressEvent.total/100)*3);
                        this.clientStore.dispatch(updateProgressCRM({ data: fakeProgEvent }));
                    }
                }catch(e) {

                }
                

            }
        })
            .then(res => {

                return res.data;
            }).catch((error) => {
                if (error.response) {
                    // console.log("Failed ",error.response.data);
                    Logger.getInstance().printWarnLogs("Status with failure", error?.response?.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    Logger.getInstance().printWarnLogs(error?.request);
                } else {
                    Logger.getInstance().printWarnLogs('Error', error.message);
                }
                // console.log(error.config);
                if(error?.response && error?.response?.status)
                return { status: error.response.status, errorData: error.response.data };
                else 
                return { status: 500, errorData: "" };
            });
    }
}
export default AxiosClient;
