import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


function Sales(props) {
    const [allSales, setSales] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('http://localhost:3002/all-sales');
                const data = await response.json();
                setSales(data.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };
        fetchSales();
    }, []);
    return (
        <div style={{ display: 'flex' }} className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Sales</th>
                </tr>
                </thead>
                <tbody>
                {allSales.map((s, index) => (
                    <tr key={index}>
                        <td>{s.SalesDate}</td>
                        <td>{s.CustomerName}</td>
                        <td>{s.ItemName}</td>
                        <td>{s.Quantity}</td>
                        <td>${s.TotalSales}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;