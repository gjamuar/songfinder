import axios from 'axios';

class ApiService {

    upload(data) {
        console.log('uploading file')
        return axios.post("http://127.0.0.1:5001/file-upload", data);
    }
}

export default new ApiService();