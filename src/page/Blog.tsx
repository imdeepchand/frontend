import React, { useEffect, useState } from 'react';
import BlogService from '../services/blog.service';
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
interface Blog {
    _id: string;
    title: string;
    description: string;
    postTime: string;
    imageLink: string;
}

const Blog: React.FC = () => {
    const Navigate = useNavigate()
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string>('');
    const handleEdit = async (id:string) => {
        try{

            const result = await BlogService.lockedBlog(id)
            if (result.status === 403) {
                console.log("if")
            } else {
                Navigate(`/edit-blog?postId=${id}`)
            }
        } catch(error:any) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await BlogService.listBlog({});
                setBlogs(response.data.data);
            } catch (err) {
                setError('Error fetching blogs');
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Blog List</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    {blogs.map(blog => (
                        <div key={blog._id} className="col-md-4">
                            <div className="card mb-4">
                                <img src={`http://localhost:5000/${blog.imageLink}`} className="card-img-top" alt={blog.title} />
                                <div className="card-body">
                                    <button className="btn btn-sm float-end" onClick={() => handleEdit(blog._id)}><i className="bi bi-pencil-square"></i></button>
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.description}</p>
                                    <p className="card-text"><small className="text-muted">Posted on {new Date(parseInt(blog.postTime)).toLocaleString()}</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default Blog;
