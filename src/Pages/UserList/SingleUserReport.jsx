import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import PdfData from "./PdfData";
import Swal from "sweetalert2";

const SingleUserReport = () => {
  const { id } = useParams();
  const [singleUserReport, setSingleUserReport] = useState({});
  const navigate= useNavigate();
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
    const paymentData = payments.find(
      (payment) => payment.userId === userData._id
    );
    return {
      ...userData,
      prevJer: paymentData ? paymentData.prevJer : 0,
    };
  });

  // Calculate single user's prevJer
  // const singleUserData = joinedData.find((userData) => userData._id === singleUserReport._id);
  const prevJer = singleUserReport ? singleUserReport.prevJer : 0;

  // Calculate single user's total
  const currentUserTotal = payments
    .filter((payment) => payment.usrId === singleUserReport._id)
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
    (payment) => payment.usrId === singleUserReport._id
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
 
 
  const handleDelete = (id) => {
    const url = `http://localhost:5000/reporttabledata/${id}`;

    Swal.fire({
        title: "Are you sure to Delete The Product?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    const remainingProducts = userPayments.filter(
                        (newUpdate) => newUpdate._id !== id
                    );
                    setSingleUserReport(remainingProducts);
                    navigate("/users")
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the product.",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while deleting the product.",
                    icon: "error"
                });
            });
        }
    });
};

  return (
    <>
      <Container>
        <div>
          {/* <h1>This is Single User Report{singleUserReport._id}</h1> */}
          <div className="mainContents">
            <Link className="myList pe-3" to={`/users/${id}`}>
              <i className="fa-solid fa-arrow-left "></i>
            </Link>
            <div className="nameCLass">
              <h6 className="mt-2 me-3 nameProperty">
                {singleUserReport?.name?.charAt(0).toUpperCase() +
                  singleUserReport?.name?.charAt(1)}
              </h6>
              <div className="fullNameNdMobile">
                <h6>{singleUserReport?.name}</h6>
                <h6>Pabo {totalIncludingPrevJer}/-</h6>
              </div>
              <PDFDownloadLink
                document={
                  <PdfData
                    data={userPayments}
                    userPayments={userPayments}
                    totalGive={totalGive}
                    totalGot={totalGot}
                    prevJer={prevJer}
                  />
                }
                filename={singleUserReport?.name}
              >
                {({ loading }) =>
                  loading ? (
                    <p>Loading Document...</p>
                  ) : (
                    <i className="fa-solid fa-download fa-2x ms-5"></i>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
        <div className="paboDebo">
          <div className="paboDeboTxt"></div>
        </div>
        <Table className="reportTble" striped bordered hover>
          <thead className="headerss">
            <tr>
              <th>Date</th>
              <th>Give</th>
              <th>Got</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.map(
              (payment) =>
                // Only render the table row if the date is valid
                payment.currentDate && (
                  <tr key={payment._id} className="tableBodys">
                    <td>{payment.currentDate}</td>
                    <td>{payment.give}</td>
                    <td>{payment.got}</td>
                    <td>
                      <div className="reportDataEdit">
                        <Link to={`/${payment._id}`}><i className="fas fa-user-pen me-3"></i></Link>
                        <i onClick={() => handleDelete(payment._id)} className="fas fa-trash"></i>
                      </div>
                    </td>
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
    </>
  );
};

export default SingleUserReport;
