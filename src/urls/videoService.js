import axios from 'axios';
import { BASE_URL } from './baseUrl'

//Create video Information .
export const SaveVideoInfo = (data) => {
    return axios.post(BASE_URL + `/save`, data).then((response) => response.data);
};

//upload Video File .
export const UplaodVideo = (video, id , options) => {
    let formData = new FormData();
    formData.append("video", video);
    return axios.post(BASE_URL + `/upload/${id}`, formData, options,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((response) => response.data);
};

//Get All Videos .
export const GetAllVideos = () => {
    return axios.get(BASE_URL + `/all`);

};

export const loadUser  =  (id) => {
    return  axios.get(BASE_URL+`/get/${id}`)
};

export const DeletePostService=(id) => {
    
    axios.delete(BASE_URL+`/${id}`).then((resp)=>{
console.log("response" ,resp);
    }).catch((error)=>{
        console.log(error);
    });   
};