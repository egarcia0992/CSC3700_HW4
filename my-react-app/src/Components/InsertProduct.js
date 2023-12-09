import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function InsertProduct(props) {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    let insertedProduct = false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting');
        try {
            const response = await fetch('http://localhost:3002/insertP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({itemName, price}),
            });
            const data = await response.json();
            insertedProduct = true;

            // navigate('/customers')
        } catch (error) {
            console.error('Error inserting product:', error);
        }
        setTimeout(() => {
            navigate('/products')
        }, 2000);
    }
    return (
        <div>
            <h1>Insert New Product</h1>
            <div style={{display: 'flex',}} className="container">

                <form>
                    <div className="form-group">
                        <label htmlFor="CustomerName">Name</label>
                        <input
                            type="text"
                            id="ItemName"
                            name="itemName"
                            placeholder="Enter Item Name"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CustomerEmail">Price</label>
                        <input
                            type='number'
                            step='0.01'
                            id="Price"
                            name="price"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default InsertProduct;