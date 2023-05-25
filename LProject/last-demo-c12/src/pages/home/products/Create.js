// Create.js
import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createProduct } from "../../../services/productService";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import 'bootstrap/dist/css/bootstrap.css';

export function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // Added state for image URL

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
            const url = URL.createObjectURL(event.target.files[0]);
            setImageUrl(url);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (image == null) return;
            const imageRef = ref(storage, `images/${image.name}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    values.image = url;
                    dispatch(createProduct(values)).then(() => {
                        window.alert("Product created successfully!");
                        navigate('/home');
                    });
                });
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <>
            <h3>Create Product</h3>
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    quantity: '',
                    category: '',
                    image: ''
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-3" style={{width:'20%'}}>
                        <Field type="text" placeholder="Name" name="name" className="form-control" />
                    </div>
                    <div className="mb-3" style={{width:'20%'}}>
                        <Field type="number" placeholder="Price" name="price" className="form-control" />
                    </div>
                    <div className="mb-3" style={{width:'20%'}}>
                        <Field type="number" placeholder="Quantity" name="quantity" className="form-control" />
                    </div>
                    <div className="mb-3" style={{width:'20%'}}>
                        <Field as="select" name="category" className="form-select">
                            <option value="">Select Category</option>
                            <option value="1">Cake</option>
                            <option value="2">Candy</option>
                        </Field>
                    </div>
                    <div className="mb-3">
                        <input type="file" onChange={handleImageChange} className="form-control" style={{width:'20%'}}/>
                    </div>
                    {imageUrl && ( // Display image if imageUrl is available
                        <div className="mb-3">
                            <img src={imageUrl} alt="Uploaded" className="img-fluid" />
                        </div>
                    )}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
