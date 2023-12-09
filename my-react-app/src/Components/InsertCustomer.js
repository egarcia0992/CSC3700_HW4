import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";

function InsertCustomer(props) {
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [insertedCustomer, setInsertedCustomer] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting');
        try {
            const response = await fetch('http://localhost:3002/insertC', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({customerName, email}),
            });
            const data = await response.json();
            setInsertedCustomer(data.insertedCustomer);
            setTimeout(() => {
                navigate('/customers')
            }, 3000);
            // navigate('/customers')
        } catch (error) {
            console.error('Error inserting customer:', error);
        }
    }
    if (insertedCustomer) {
        return <div>Customer {insertedCustomer} has been inserted</div>;
    }
    return (
        <div>
            <h1>Insert New Customer</h1>
            <div style={{display: 'flex',}} className="container">

                <form>
                    <div className="form-group">
                        <label htmlFor="CustomerName">Name</label>
                        <input
                            type="text"
                            id="CustomerName"
                            name="customerName"
                            placeholder="Enter Name"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CustomerEmail">Email</label>
                        <input
                            type="text"
                            id="CustomerEmail"
                            name="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default InsertCustomer;