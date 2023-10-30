import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = () => {
    return (
        <Container fluid>
            <>
            <div className="topColumns">
                <div className="overAll">
                <div className="getAmnt">
                    <h1>Total Debo</h1>
                    <h6>000/=</h6>
                </div>
                <div className="getAmnt">
                    <h1>Total Pabo</h1>
                    <h6>100/=</h6>
                </div>
                </div>
            </div>
            <div className="userShow">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, autem?</p>
            </div>
            <div className="customerAdd">
                <Link className='customerAd' to="/add"><i className="fa-solid fa-user-plus me-1"></i>Add Customer</Link>
            </div>
            </>
        </Container>
    );
};

export default UserList;