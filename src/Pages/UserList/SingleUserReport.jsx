import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

const SingleUserReport = () => {
    const { id } = useParams();
    const [singleUserReport, setSingleUserReport] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/reportdata/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setSingleUserReport(data));
      }, []);
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
      const singleUserData = joinedData.find((userData) => userData._id === singleUserReport._id);
      const prevJer = singleUserData ? singleUserData.prevJer : 0;
    
      // Calculate single user's total
      const currentUserTotal = payments
        .filter((payment) => payment.usrId === singleUserReport._id)
        .reduce((total, payment) => total + (parseInt(payment.give) - parseInt(payment.got)), 0);
    
      // Calculate total including prevJer
      const totalIncludingPrevJer = currentUserTotal + prevJer;
    
      console.log("PrevJer:", prevJer);
      console.log("CurrentUserTotal:", currentUserTotal);
      console.log("TotalIncludingPrevJer:", totalIncludingPrevJer);

      const userPayments = payments.filter((payment) => payment.usrId === singleUserReport._id);

      const formatBanglaDate = (dateString) => {
        const options = { timeZone: 'Asia/Dhaka', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('en-US', options);
      };
  // Calculate total give and total got
  const totalGive = userPayments.reduce((total, payment) => total + parseInt(payment.give), 0);
  const totalGot = userPayments.reduce((total, payment) => total + parseInt(payment.got), 0);
    return (
        <>
        <Container>

        <div>
            {/* <h1>This is Single User Report{singleUserReport._id}</h1> */}
            <div className="mainContents">
          <Link className="myList pe-3" to={`/users/${id}`} >
            <i className="fa-solid fa-arrow-left "></i>
          </Link>
          <div className="nameCLass">
            <h6 className="mt-2 me-3 nameProperty">
              {singleUserReport?.name?.charAt(0).toUpperCase() +
                singleUserReport?.name?.charAt(1)}
            </h6>
            <div className="fullNameNdMobile">
              <h6>{singleUserReport?.name}</h6>
              <h6>
              Pabo {totalIncludingPrevJer}/-
              </h6>
            </div>
            <i class="fa-solid fa-download"></i>
          </div>
        </div>
        </div>
        <div className="paboDebo">
        <div className="paboDeboTxt">
        </div>
      </div>
      <Table className='reportTble' striped bordered hover>
          <thead className="headerss">
            <tr>
              <th>Date</th>
              <th>Give</th>
              <th>Got</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.reverse().map((payment) => (
              <tr  className='tableBodys' key={payment._id}>
                <td>{formatBanglaDate(payment.currentDate)}</td>
                <td>{payment.give}</td>
                <td>{payment.got}</td>
              </tr>
            ))}
            <tr>
              <td>PrevJer </td>
              <td colSpan="2">{prevJer}</td>
            </tr>
          </tbody>
          <tfoot className="sticky-footer">
            <tr>
              <td>Total</td>
              <td>{totalGive+prevJer}</td>
              <td>{totalGot}</td>
            </tr>
          </tfoot>
        </Table>
      </Container>
      </>
    );
};

export default SingleUserReport;