import axios from "axios"
const API_URL = "http://localhost:5000/api/v1/"
class BlogService {
    static async createBlog (body:any) {
        return axios.post(`${API_URL}blog/create`,body)
    }
    static async editBlog (body:any) {
        return axios.post(`${API_URL}blog/update`,body)
    }
    static async listBlog (body:any) {
        return axios.post(`${API_URL}blog/list`,body)
    }
    static async blog (id:string) {
        return axios.get(`${API_URL}blog?postId=${id}`)
    }
    static async lockedBlog (id:string) {
        return axios.post(`${API_URL}blog/lock?postId=${id}`)
    }
}

export default BlogService