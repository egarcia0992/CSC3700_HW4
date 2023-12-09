import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

function Products(props) {
    const [allProducts, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3002/products');
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div style={{ display: 'flex' }} className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">All Products</th>
                    <th scope="col">Total Sales</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {allProducts.map((p, index) => (
                    <tr key={index}>
                        <td>{p.ItemName}</td>
                        <td>${p.TotalSales}</td>
                        <td>
                            <Button onClick={() => navigate('/update-c')}> Update </Button>
                        </td>
                        <td>
                            <Button onClick={() => navigate('/delete-c')}> Delete </Button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <Button onClick={() => navigate('/insert-p')}> Insert Product </Button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Products;