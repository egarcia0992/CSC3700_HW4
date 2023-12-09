const express = require('express');
const app = express();
const port = 3002;
const mysql = require("mysql2/promise");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = {
    // host : 'localhost',a
    host : '45.55.136.114',
    user : 'F2023_egarcia14',
    // database : 'node-complete',
    database : 'F2023_egarcia14',
    password: "BrushTailedKanger00!"
};

app.post('/insertP', async (req, res) => {
    try {
        const { itemName, price } = req.body;
        const connection = await mysql.createConnection(db);
        const numberPrice = parseFloat(price);
        const [result] = await connection.execute('insert into Item (ItemName, ItemPrice) values (?, ?)', [itemName, numberPrice]);

        await connection.end();
        res.json({ insertedProduct: itemName });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500)
    }
});
app.post('/insertC', async (req, res) => {
    try {
        const { customerName, email } = req.body;
        const connection = await mysql.createConnection(db);
        const [result] = await connection.execute('INSERT INTO Customer (CustomerName, CustomerEmail) VALUES (?, ?)', [customerName, email]);

        await connection.end();
        res.json({ insertedCustomer: customerName });
    } catch (error) {
        console.error('Error inserting customer:', error);
        res.status(500)
    }
});
app.get('/all-sales', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);

        const [rows, fields] = await connection.execute('SELECT s.SalesDate, c.CustomerName, i.ItemName, s.Quantity, i.ItemPrice * s.Quantity AS TotalSales\n' +
            'FROM Sales s\n' +
            'JOIN Customer c ON s.CustomerID = c.CustomerID\n' +
            'JOIN Item i ON s.ItemID = i.ItemID\n' +
            'WHERE MONTH(s.SalesDate) = MONTH((SELECT MAX(SalesDate) FROM Sales))\n' +
            'AND YEAR(s.SalesDate) = YEAR((SELECT MAX(SalesDate) FROM Sales));');

        await connection.end();

        res.json({ data: rows });
    } catch (error) {
        console.error('Error With Sales:', error);
        res.status(500)
    }
});
app.get('/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);

        const [rows, fields] = await connection.execute('SELECT\n' +
            'i.ItemID, i.ItemName, IFNULL(SUM(i.ItemPrice * s.Quantity), 0) AS TotalSales\n' +
            'FROM Item i\n' +
            'LEFT JOIN\n' +
            'Sales s ON i.ItemID = s.ItemID\n' +
            'GROUP BY i.ItemID\n' +
            'ORDER BY TotalSales DESC');

        await connection.end();

        res.json({ data: rows });
    } catch (error) {
        console.error('Error With Products:', error);
        res.status(500)
    }
});
app.get('/customers', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);

        const [rows, fields] = await connection.execute('SELECT c.CustomerID, c.CustomerName, c.CustomerEmail, IFNULL(SUM(i.ItemPrice * s.Quantity), 0) AS TotalSpent\n' +
            'FROM Customer c\n' +
            'LEFT JOIN Sales s ON c.CustomerID = s.CustomerID\n' +
            'LEFT JOIN Item i ON s.ItemID = i.ItemID\n' +
            'GROUP BY c.CustomerID\n' +
            'ORDER BY TotalSpent DESC;\n');

        await connection.end();

        res.json({ data: rows });
    } catch (error) {
        console.error('Error With Customers:', error);
        res.status(500)
    }
});
app.get('/top-customers', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);

        const [rows, fields] = await connection.execute('SELECT c.CustomerID, c.CustomerName, c.CustomerEmail, SUM(i.ItemPrice * s.Quantity) AS TotalSpent\n' +
            'FROM Customer c\n' +
            'JOIN Sales s ON c.CustomerID = s.CustomerID\n' +
            'JOIN Item i ON s.ItemID = i.ItemID\n' +
            'GROUP BY c.CustomerID\n' +
            'ORDER BY TotalSpent DESC\n' +
            'LIMIT 5;');

        await connection.end();

        res.json({ data: rows });
    } catch (error) {
        console.error('Error With Customers:', error);
        res.status(500)
    }
});
app.get('/sales', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);

        const [rows, fields] = await connection.execute('SELECT\n' +
        'YEAR(s.SalesDate) AS Year,\n' +
            'MONTH(s.SalesDate) AS Month,\n' +
            'SUM(i.ItemPrice * s.Quantity) AS TotalSales\n' +
        'FROM Sales s \n' +
        'JOIN Item i ON s.ItemID = i.ItemID\n' +
        'GROUP BY Year, Month\n' +
        'ORDER BY Year DESC, Month DESC \n' +
        'LIMIT 5;');

        await connection.end();

        res.json({ data: rows });
    } catch (error) {
        console.error('Error With Sales:', error);
        res.status(500)
    }
});
app.get('/top-products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(db);

        const [rows, fields] = await connection.execute('SELECT\n' +
            'i.ItemID, i.ItemName, SUM(i.ItemPrice * s.Quantity) AS TotalSales\n' +
            'FROM Item i\n' +
            'LEFT JOIN\n' +
            'Sales s ON i.ItemID = s.ItemID\n' +
            'GROUP BY i.ItemID\n' +
            'ORDER BY TotalSales DESC\n' +
            'LIMIT 5;');

        await connection.end();

        res.json({ data: rows });
    } catch (error) {
        console.error('Error With Products:', error);
        res.status(500)
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});