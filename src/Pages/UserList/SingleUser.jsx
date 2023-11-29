// SingleUser.js

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
Modal.setAppElement('#root');

const SingleUser = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [giveInput, setGiveInput] = useState("");
  const [gotInput, setGotInput] = useState("");
  const [paydetailsInput, setPaydetailsInput] = useState("");

  const handleGiveInputChange = (event) => {
    setGiveInput(event.target.value);
  };
  const handleGotInputChange = (event) => {
    setGotInput(event.target.value);
  };
  const handlePaydetailsInputChange = (event) => {
    setPaydetailsInput(event.target.value);
  };
  const isSubmitButtonEnabled = giveInput || gotInput || paydetailsInput;
  const buttonClass = isSubmitButtonEnabled ? "addButton" : "disabledButton";

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/detaCollection/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Data from server:', data);
        setSingleUser(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);
  const url = `http://localhost:5000/detaCollection`;
  const { data: user = [], isLoading } = useQuery({
    queryKey: ["detaCollection"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  const payurl = `http://localhost:5000/paymentList`;
  const { data: payments = [] } = useQuery({
    queryKey: ["paymentList"],
    queryFn: async () => {
      const res = await fetch(payurl);
      const data = await res.json();
      return data;
    },
  });

  // Join the user and payments arrays based on user ID
  const joinedData = user.map((userData) => {
    const paymentData = payments.find((payment) => payment.userId === userData._id);
    return {
      ...userData,
      prevJer: paymentData ? paymentData.prevJer : 0,
    };
  });

  // Calculate single user's prevJer
  const singleUserData = joinedData.find((userData) => userData._id === singleUser._id);
  const prevJer = singleUserData ? singleUserData.prevJer : 0;

  // Calculate single user's total
  const currentUserTotal = payments
    .filter((payment) => payment.usrId === singleUser._id)
    .reduce((total, payment) => total + (parseInt(payment.give) - parseInt(payment.got)), 0);

  // Calculate total including prevJer
  const totalIncludingPrevJer = currentUserTotal + prevJer;

  console.log("PrevJer:", prevJer);
  console.log("CurrentUserTotal:", currentUserTotal);
  console.log("TotalIncludingPrevJer:", totalIncludingPrevJer);

  const onSubmit = async (data) => {
    const give = data.give || 0;
    const got = data.got || 0;

    const requestBody = {
      currentDate,
      ...data,
      usrId: singleUser._id,
      name: singleUser.name,
      mobile: singleUser.mobile,
      give,
      got,
    };

    const response = await fetch('http://localhost:5000/payment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const paymentData = await response.json();

    if (paymentData.insertedId) {
      alert('Data inserted successfully');
    } else {
      alert('There was an error inserting the data');
    }
    navigate("/users");
  };
  return (
    <Container>
      <div className="singleHeaders mt-4">
        <div className="mainContent">
          <Link className="myList pe-3" to="/users">
            <i className="fa-solid fa-arrow-left "></i>
          </Link>
          <div className="nameCLass">
            <h6 className="mt-2 me-3 nameProperty">
              {singleUser?.name?.charAt(0).toUpperCase() +
                singleUser?.name?.charAt(1)}
            </h6>
            <div className="fullNameNdMobile">
              <h6>{singleUser?.name}</h6>
              <h6>
                <i className="fa-solid fa-phone me-1"></i>
                {singleUser?.mobile}
              </h6>
            </div>
          </div>
        </div>
        <div className="threeDot">
          <i
            className="fa-solid fa-ellipsis-vertical three-dots"
            onClick={() => setModalOpen(true)}
          ></i>
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            contentLabel="My Modal"
            className="custom-modal" // Apply the custom class here
          >
            <div className="modalContent">
              <Link className="userLinks" to={`/${id}/report`}>
                <h6>
                  <i className="fa-solid fa-file-invoice pe-2"></i>Report
                </h6>
              </Link>
              <Link className="userLinks" to={`/${id}/edit`}>
                <h6>
                  <i className="fa-solid fa-pen pe-2"></i>Edit
                </h6>
              </Link>
              <Link className="userLinks" to={`/${id}/delete`}>
                <h6>
                  <i className="fa-solid fa-trash-can pe-2"></i>Delete
                </h6>
              </Link>
            </div>
            {/* <button onClick={() => setModalOpen(false)}>Close Modal</button> */}
          </Modal>
        </div>
      </div>
      <div className="paboDebo">
        <div className="paboDeboTxt">
          <p>Pabo-{totalIncludingPrevJer}/-</p>
          <p>Time Duration</p>
        </div>
      </div>
      <div className="paboDeboForm">
        <div className="payForm mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
    <div className="firstChild">
      <input
        className="inputClass me-3"
        {...register("give", )}
        placeholder="দিলাম"
        value={giveInput}
        onChange={handleGiveInputChange}
      />
      <input
        className="inputClass"
        {...register("got",)}
        placeholder="পেলাম"
        value={gotInput}
        onChange={handleGotInputChange}
      />
    </div>
    <input
      className="inputClass"
      {...register("paydetails",)}
      placeholder="বিবরণ"
      value={paydetailsInput}
      onChange={handlePaydetailsInputChange}
    />
    <DatePicker
      className="dateClass"
      selected={currentDate}
      onChange={handleDateChange} // Add this line to handle date changes
    />
    <input
      className={buttonClass}
      type="submit"
      name=""
      id=""
      disabled={!isSubmitButtonEnabled}
    />
  </form>
        </div>
      </div>
    </Container>
  );
};
export default SingleUser;