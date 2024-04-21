import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const SmsReport = () => {
    const {id}= useParams();
    const [singleReport, setSingleReport] = useState({});
    useEffect(() => {
        const url = `https://nishadserver.vercel.app/reportdata/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setSingleReport(data));
      }, []);
      const url = `https://nishadserver.vercel.app/detaCollection`;
      const { data: user = [], isLoading } = useQuery({
        queryKey: ["detaCollection"],
        queryFn: async () => {
          const res = await fetch(url);
          const data = await res.json();
          return data;
        },
      });
      const payurl = `https://nishadserver.vercel.app/paymentList`;
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
        const paymentData = payments.find(
          (payment) => payment.userId === userData._id
        );
        return {
          ...userData,
          prevJer: paymentData ? paymentData.prevJer : 0,
        };
      });
    
      // Calculate single user's prevJer
      // const singleUserData = joinedData.find((userData) => userData._id === singleReport._id);
      const prevJer = singleReport ? singleReport.prevJer : 0;
    
      // Calculate single user's total
      const currentUserTotal = payments
        .filter((payment) => payment.usrId === singleReport._id)
        .reduce((total, payment) => {
          // Parse give and got values to integers, default to 0 if NaN or undefined
          const give = parseInt(payment.give) || 0;
          const got = parseInt(payment.got) || 0;
          return total + (give - got);
        }, 0);
      // Calculate total including prevJer
      const totalIncludingPrevJer = currentUserTotal + prevJer;
    
      console.log("PrevJer:", prevJer);
      console.log("CurrentUserTotal:", currentUserTotal);
      console.log("TotalIncludingPrevJer:", totalIncludingPrevJer);
    
      const userPayments = payments.filter(
        (payment) => payment.usrId === singleReport._id
      );
    
      // Calculate total give and total got
      const totalGive = userPayments.reduce((total, payment) => {
        // Parse payment.give to an integer, default to 0 if NaN or undefined
        const give = parseInt(payment.give) || 0;
        return total + give;
      }, 0);
      console.log("TotalGive:", totalGive);
      // Calculate total give and total got
      const totalGot = userPayments.reduce((total, payment) => {
        // Parse payment.got to an integer, default to 0 if NaN or undefined
        const got = parseInt(payment.got) || 0;
        return total + got;
      }, 0);
     
    return (
        <Container>
             <Table className="reportTble" striped bordered hover>
          <thead className="headerss">
            <tr>
              <th>Date</th>
              <th>Give</th>
              <th>Got</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.map(
              (payment) =>
                // Only render the table row if the date is valid
                payment.currentDate && (
                  <tr key={payment._id} className="tableBodys">
                    <td>{new Date(payment.currentDate).toLocaleDateString()}</td>
                    <td>{payment.give}</td>
                    <td>{payment.got}</td>
                  </tr>
                )
            )}
            <tr>
              <td>PrevJer </td>
              <td colSpan="2">{prevJer}</td>
            </tr>
          </tbody>
          <tfoot className="sticky-footer">
            <tr>
              <td>Total</td>
              <td>{totalGive + prevJer}</td>
              <td>{totalGot}</td>
            </tr>
          </tfoot>
        </Table>
        </Container>
    );
};

export default SmsReport;