import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function Customers(props) {
    const [allCustomers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3002/customers');
                const data = await response.json();
                setCustomers(data.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div style={{display: 'flex'}} className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">All Customers</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total Sales</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {allCustomers.map((c, index) => (
                    <tr key={index}>
                        <td>{c.CustomerName}</td>
                        <td>{c.CustomerEmail}</td>
                        <td>${c.TotalSpent}</td>
                        <td>
                            <Button onClick={() => navigate('/edit-c')}> Update </Button>
                        </td>
                        <td>
                            <Button onClick={() => navigate('/delete-c')}> Delete </Button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <Button onClick={() => navigate('/insert-c')}> Insert Customer </Button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Customers;