import axios from "axios"
const API_URL = "http://localhost:5000/api/v1/"
class AuthService {
    static async login (body:{username: string, password: string}) {
        return axios.post(`${API_URL}user/login`,body)
    }
    
}

export default AuthService