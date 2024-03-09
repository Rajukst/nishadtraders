import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddUser = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const onSubmit = async (data) => {
    const prevJer = data.prevJer || 0;
    const requestBody = {
      ...data,
      currentDate,
      prevJer: Number(prevJer),
    };
  
    // Post data to the grahokCollection collection
    const grahokResponse = await fetch('https://asadback.onrender.com/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    // Extract the _id from the grahokResponse
    const grahokData = await grahokResponse.json();
    const usrId = grahokData.insertedId;
  
    const paymentListRequestBody = {
      ...data,
      prevJer: Number(prevJer),
      usrId: usrId, // Include the userId
    };
  
    // Post data to the paymentList collection
    const paymentListResponse = await fetch('https://asadback.onrender.com/paymentList', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(paymentListRequestBody),
    });
  
    // Handle the responses from both APIs
    const paymentListData = await paymentListResponse.json();
  
    if (usrId && paymentListData.insertedId) {
      alert('Data inserted successfully');
    } else {
      alert('There was an error inserting the data');
    }
  
    // Navigate to the users page
    navigate('/users');
  
    // Reset the form
    reset();
  };
  return (
    <Container>
      <h6 className='mt-3 mb-3'>New Customer Add</h6>
      <div className='addForm'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='inputClass'
            {...register('name', { required: true })}
            placeholder='কাষ্টমারের নাম'
          />
          <input
            className='inputClass'
            {...register('mobile', { required: true })}
            placeholder='মোবাইল নম্বর'
          />
          <input
            className='inputClass'
            {...register('prevJer')}
            placeholder='পূর্বের বাকি (জের)'
          />
          <DatePicker
            className='dateClass'
            selected={currentDate}
            onChange={handleDateChange} // Add this line to handle date changes
          />
          <input className="addButton"
      type="submit"
      name=""
      id=""
     />
        </form>
      </div>
    </Container>
  );
};

export default AddUser;
