import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const SingleUserDelete = () => {
    const { id } = useParams();
    const [singleUserDelete, setSingleUserDelete] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch single user data
        const url = `https://asadback.onrender.com/deletefetchdata/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setSingleUserDelete(data));
    }, [id]);

    // Function to handle deletion of all transactions for the user
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteUrl = `https://asadback.onrender.com/deleteuserdata/${id}`;
                fetch(deleteUrl, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.message); // Log success message
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        navigate('/users'); // Redirect to home page or any other page
                    })
                    .catch((error) => {
                        console.error('Error deleting user transactions:', error);
                        // Handle error, show error message to the user
                    });
            }
        });
    };

    return (
        <div>
            {/* <h1>This is Single User Delete {singleUserDelete._id}</h1>
            <h4>Name: {singleUserDelete.name}</h4> */}
            <div className="deleteCustomer">
                <div className="leftCor ps-3">
                <h6 className="mt-2 me-3 nameProperty">
              {singleUserDelete?.name?.charAt(0).toUpperCase() +
                singleUserDelete?.name?.charAt(1)}
            </h6>
                </div>
                <div className="rightCor ps-2">
                  <h6><strong>{singleUserDelete?.name}</strong></h6>
                  <h6>{singleUserDelete?.mobile}</h6>
                  <small className="deleteTxt">কাষ্টমার</small>
                </div>
            </div>
            <div className="warningMessage">
               <article><strong>{singleUserDelete?.name}</strong>কে ডিলিট করলে সার্ভারে থাকা <strong>{singleUserDelete?.name}</strong> এর সকল রেকর্ড ডিলিট হয়ে যাবে। একমত আছেন?</article>
            </div>
            <button className="eidtUserBTN" onClick={handleDelete}>Delete User's Data</button>
        </div>
    );
};

export default SingleUserDelete;
