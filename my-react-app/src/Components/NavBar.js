import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from "react-router-dom";

function NavBar(props) {
    return (
        <div className="d-flex justify-content-between align-items-center mainNav">
            <div>
            <img src="/imgs/img.png" alt="logo"/>
            </div>
            <Nav className="justify-content-end mainNav" activeKey="/">
                <Nav.Item style={{marginTop: '10px', marginRight: '20px'}}>
                    Happy Harry's Hardware
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'black'}} as={NavLink} to='/'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'black'}} as={NavLink} to='/customers'>Customers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'black'}} as={NavLink} to='/products'>Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'black'}} as={NavLink} to='/sales'>Sales</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default NavBar;