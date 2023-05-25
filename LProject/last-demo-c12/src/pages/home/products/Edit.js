// Edit.js
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
    const product = useSelector(({ products }) => products.item);

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

            dispatch(updateProduct(values)).then(() => {
                window.alert('Product updated successfully!');
                navigate('/home');
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
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
                        <input type="file" name="image" onChange={handleImageChange} className="form-control" />
                    </div>
                    {product?.image && (
                        <div className="mb-3">
                            <p>Current Image:</p>
                            <img
                                src={product.image}
                                alt="Product"
                                width="50"
                                height="50"
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <Field as="select" name="category" className="form-select">
                            <option value="">Select category</option>
                            <option value="1">Cake</option>
                            <option value="2">Candy</option>
                        </Field>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
