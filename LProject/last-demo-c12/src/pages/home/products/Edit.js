import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, fetchProductById } from "../../../services/productService";
import { useNavigate, useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import 'bootstrap/dist/css/bootstrap.css';

export function Edit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // Added state for preview image
    const product = useSelector(state => state.products.item);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleSubmit = async (values) => {
        try {
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                values.image = await getDownloadURL(imageRef);
            }

            dispatch(updateProduct({ id, updatedProduct: values })).then(() => {
                window.alert('Product updated successfully!');
                navigate('/home');
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage)); // Generate preview image URL
        }
    };

    return (
        <>
            <h3>Edit Product</h3>
            <Formik
                initialValues={{
                    name: product?.name || '',
                    price: product?.price || '',
                    quantity: product?.quantity || '',
                    category: product?.category ? product.category.id.toString() : '',
                    image: product?.image || ''
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-3">
                        <Field type="text" placeholder="Name" name="name" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <Field type="number" placeholder="Price" name="price" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <Field type="number" placeholder="Quantity" name="quantity" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <Field as="select" name="category" className="form-control">
                            <option value="">Select a category</option>
                            <option value="1">Cake</option>
                            <option value="2">Candy</option>
                        </Field>
                    </div>
                    <div className="mb-3">
                        <input type="file" name="image" onChange={handleImageChange} />
                    </div>
                    {previewImage && (
                        <div className="mb-3">
                            <img src={previewImage} alt="Preview" style={{ maxWidth: '200px' }} />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </>
    );
}
