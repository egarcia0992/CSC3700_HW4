import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";

function Home(props) {
    const [topCustomers, setTopCustomers] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchTopCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3002/top-customers');
                const data = await response.json();
                setTopCustomers(data.data);
            } catch (error) {
                console.error('Error fetching top-spending customers:', error);
            }
        };
        const fetchSales = async () => {
            try {
                const response = await fetch('http://localhost:3002/sales');
                const data = await response.json();
                setSalesData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchTopProducts = async () => {
            try {
                const response = await fetch('http://localhost:3002/top-products');
                const data = await response.json();
                setTopProducts(data.data);
            } catch (error) {
                console.error('Error fetching top-selling products:', error);
            }
        };
        fetchTopCustomers();
        fetchTopProducts();
        fetchSales();
    }, []);
    const navigate = useNavigate();
    return (
        <div style={{display: 'flex'}}>
        <div className="container" style={{ display: 'flex' }}>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Top Customers</th>
                </tr>
                </thead>
                <tbody>
                {topCustomers.map((c, index) => (
                    <tr key={index}>
                        <td>{c.CustomerName}: ${c.TotalSpent}</td>
                    </tr>
                ))}
                </tbody>
                <Button onClick={ () => navigate('customers') }> Show All </Button>
            </table>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Top Products</th>
                </tr>
                </thead>
                <tbody>
                {topProducts.map((p, index) => (
                    <tr key={index}>
                        <td>{p.ItemName}: ${p.TotalSales}</td>
                    </tr>
                ))}
                </tbody>
                <Button onClick={ () => navigate('products') }> Show All </Button>

            </table>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Sales</th>
                </tr>
                </thead>
                <tbody>
                {salesData.map((s, index) => (
                    <tr key={index}>
                        <td>{s.Year}, {s.Month}: ${s.TotalSales}</td>
                    </tr>
                ))}
                </tbody>
                <Button onClick={ () => navigate('sales') }> Show All </Button>

            </table>
        </div>
    </div>);
}

export default Home;