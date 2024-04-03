import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Container } from 'react-bootstrap';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';

const Employee = () => {
    const [axiosSecure] = useAxiosSecure();
    const [Employee, setEmployee] = useState([]);
    const { data: users = [], refetch } = useQuery(['adminusers'], async () => {
        const res = await axiosSecure.get('/adminusers');
        return res.data;
    });
    const {logOut}= useAuth()

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/adminusers/admin/${user._id}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`${user.name} is admin now`);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to promote user to admin");
            });
    }

    const handleDeleteEmployee = (id) => {
        const permissionDelete = window.confirm("Are you sure you want to delete this employee?");
        if (permissionDelete) {
            const deleteUrl = `/adminusers/${id}`;
            axiosSecure.delete(deleteUrl)
                .then(() => {
                    alert("Employee deleted");
                    const restOfEmployees = Employee.filter((employee) => employee._id !== id);
                    setEmployee(restOfEmployees);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to delete employee");
                });
        }
    }

    return (
        <Container>
        <div className="w-full">
            <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
            <button onClick={logOut}>LogOut</button>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{ user.role === 'admin' ? 'admin' :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600  text-white"><i style={{color: 'black'}} className="fa-solid fa-user"></i></button> 
                                    }</td>
                                <td> <button className="paymentBTNss" onClick={()=>handleDeleteEmployee(user._id)}><i style={{color:"red", alignItems:"center", justifyContent:"center"}} className="fa-solid fa-trash"></i></button> </td> 
                            </tr>)
                        }   
                    </tbody>
                </table>
            </div>
        </div>
        </Container>
    );
};

export default Employee;