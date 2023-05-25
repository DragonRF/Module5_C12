// List.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../../services/productService";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import 'bootstrap/dist/css/bootstrap.css';

export function List() {
    const dispatch = useDispatch();
    const products = useSelector(({ products }) => products.list);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(productId));
        }
    };

    const getImageUrl = async (imagePath) => {
        const storageRef = ref(storage, imagePath);
        return await getDownloadURL(storageRef);
    };

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}$</td>
                        <td>{item.quantity}</td>
                        <td>{item.category.name}</td>
                        <td>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt="Product"
                                    width="50"
                                    height="100%"
                                />
                            )}
                        </td>
                        <td>
                            <Link to={`/home/edit/${item.id}`}>
                                <button className="btn btn-primary me-2">Edit</button>
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
