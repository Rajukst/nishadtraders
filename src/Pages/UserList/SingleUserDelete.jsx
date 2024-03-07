import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SingleUserDelete = () => {
    const { id } = useParams();
    const [singleUserDelete, setSingleUserDelete] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch single user data
        const url = `http://localhost:5000/deletefetchdata/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setSingleUserDelete(data));
    }, [id]);

    // Function to handle deletion of all transactions for the user
    const handleDelete = () => {
        const deleteUrl = `http://localhost:5000/deleteuserdata/${id}`;
        fetch(deleteUrl, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message); // Log success message
                navigate('/'); // Redirect to home page or any other page
            })
            .catch((error) => {
                console.error('Error deleting user transactions:', error);
                // Handle error, show error message to the user
            });
    };

    return (
        <div>
            <h1>This is Single User Delete {singleUserDelete._id}</h1>
            <h4>Name: {singleUserDelete.name}</h4>
            <button onClick={handleDelete}>Delete Single User's All Data</button>
        </div>
    );
};

export default SingleUserDelete;
