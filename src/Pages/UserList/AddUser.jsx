import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const AddUser = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
      setCurrentDate(new Date());
    }, []);
    const { register, handleSubmit, reset } = useForm();
    const navigate= useNavigate();
    const onSubmit = data => {
        console.log(data)
        navigate("/users")
        reset()
    }
// const dateOnChange=(e)=>{
//     register(e.target.value)
// }
    return (
        <Container>
            <h6 className='mt-3 mb-3'>New Customer Add</h6>
            <div className="addForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                <input className='inputClass' {...register("name", { required: true })} placeholder='কাষ্টমারের নাম' />
               
                <input className='inputClass'  {...register("mobile", { required: true })} placeholder='মোবাইল নম্বর' />
              
              
                <input className='inputClass'  {...register("prevJer", { required: true })} placeholder='পূর্বের বাকি (জের)'/>
                <DatePicker className='dateClass' selected={currentDate} />
                <input className='addButton' type="submit" name="" id=""/>
                </form>
            </div>
        </Container>
    );
};

export default AddUser;