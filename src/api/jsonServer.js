import axios from "axios";
//axios instance to make a request to that url
export default axios.create({
    baseURL: 'http://8fffe983905b.ngrok.io'
});