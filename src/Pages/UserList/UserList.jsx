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
                <div className="filterDownLoadPress">
                    <div className="serarch">
                        <input type="text" name="" id="" placeholder='search'/>
                    </div>
                    <div className="filter">
                    <i class="fa-solid fa-arrow-up-9-1"></i>
                    <p>Filter</p>
                    </div>
                    <div className="download">
                    <i class="fa-solid fa-download"></i>
                    <p>Download</p>
                    </div>
                    <div className="alart">
                    <i class="fa-solid fa-bell"></i>
                    <p>Alert</p>
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