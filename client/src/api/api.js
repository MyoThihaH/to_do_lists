import axios from 'axios';
//export const posturl = 'http://localhost:5000/lists';
const url = 'https://to-do-lists-for-fun.herokuapp.com/lists';

export const fetchPost = async () => {
    const response = await axios.get(url);
   
    return response.data;
    
} 

export const postData = async (data) => {
    const response = await axios.post(url, data);
    
    return response.data;
     
  
  }

export const deleteData = async ({_id}) => {
    const response = await axios.post(url+'/delete', {_id:_id});

    return response.data;
}

export const updateData = async (data) => {
    const response = await axios.post(url+'/update',data);
    return response.data;
}

export const allComplete = async () => {
    const response = await axios.get(url+'/allComplete');
    return response.data;
}

export const allUnComplete = async () => {
    const response = await axios.get(url+'/allUnComplete');
    return response.data;
}

export const clearComplete = async () => {
    const response = await axios.get(url+'/clearComplete');
    return response.data;
}

