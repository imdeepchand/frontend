import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BlogService from '../services/blog.service';
import Navbar from '../component/Navbar';
import { useSearchParams } from 'react-router-dom';
interface Blog {
  _id: string;
  title: string;
  description: string;
  postTime: string;
  imageLink: string;
}

const EditBlog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId') || '';
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    imageLink: ''
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    imageLink: ''
  });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if(postId) {
          const response = await BlogService.blog(postId);
          const blogData = response.data.data;
          setBlog(blogData);
          setFormValues({
            title: blogData.title,
            description: blogData.description,
            imageLink: blogData.imageLink
          });
        }
      } catch (err) {
        setMessage('Error fetching blog data');
      }
    };

    fetchBlog();
  }, [postId]);

  const validate = (values: typeof formValues) => {
    const errors = {
      title: '',
      description: '',
      imageLink: ''
    };
    if (!values.title) {
      errors.title = 'Title is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    if (!values.imageLink) {
      errors.imageLink = 'Image link is required';
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (!errors.title && !errors.description && !errors.imageLink) {
      try {
        await BlogService.editBlog({...formValues,postId:postId});
        setMessage('Blog updated successfully');
        navigate('/'); // Redirect to Blog List after successful update
      } catch (err) {
        setMessage('Error updating blog');
      }
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Edit Blog</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                    value={formValues.title}
                    onChange={handleChange}
                  />
                  {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                    value={formValues.description}
                    onChange={handleChange}
                  />
                  {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="imageLink">Image Link</label>
                  <input
                    type="text"
                    id="imageLink"
                    name="imageLink"
                    className={`form-control ${formErrors.imageLink ? 'is-invalid' : ''}`}
                    value={formValues.imageLink}
                    onChange={handleChange}
                  />
                  {formErrors.imageLink && <div className="invalid-feedback">{formErrors.imageLink}</div>}
                </div>
                <div className="form-group">
                  <label>Post Time</label>
                  <p>{new Date(parseInt(blog.postTime)).toLocaleString()}</p>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update Blog</button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default EditBlog;
