import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

const SingleUser = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const { register, handleSubmit, reset } = useForm();
  
    const handleDateChange = (date) => {
      setCurrentDate(date);
    };
  
    const { id } = useParams();
    const [singleUser, setSingleUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/detaCollection/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setSingleUser(data));
      }, []);
    return (
        <Container>
            <div className="singleHeaders mt-4">
                <div className="mainContent">
                    <Link className='myList pe-3' to="/users"><i className="fa-solid fa-arrow-left "></i></Link>
                    <div className="nameCLass">
                    <h6 className='mt-2 me-3 nameProperty'>{singleUser?.name?.charAt(0).toUpperCase() + singleUser?.name?.charAt(1)}</h6>

                        <div className="fullNameNdMobile">
                            <h6>{singleUser?.name}</h6>
                            <h6><i className="fa-solid fa-phone me-1"></i>{singleUser?.mobile}</h6>
                        </div>
                    </div>
                </div>
                <div className="threeDot">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className="paboDebo">
                <div className="paboDeboTxt">
                    <p>Pabo /-</p>
                    <p>Time Duration</p>
                </div>
            </div>
            <div className="paboDeboForm">
           <div className="payForm mt-4">
           <form>
         <div className="firstChild">
         <input
            className='inputClass me-3'
            {...register('name', { required: true })}
            placeholder='কাষ্টমারের নাম'
          />
          <input
            className='inputClass'
            {...register('mobile', { required: true })}
            placeholder='মোবাইল নম্বর'
          />
         </div>
          <input
            className='inputClass'
            {...register('prevJer', { required: true })}
            placeholder='পূর্বের বাকি (জের)'
          />
          <DatePicker
            className='dateClass'
            selected={currentDate}
            onChange={handleDateChange} // Add this line to handle date changes
          />
          <input className='addButton' type='submit' name='' id='' />
        </form>
           </div>
            </div>
        </Container>
    );
};

export default SingleUser;