import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const UserList = () => {
  const [search, setSearch] = useState("");
  const url = `https://asadback.onrender.com/detaCollection`;
  const { data: user = [], isLoading } = useQuery({
    queryKey: ["detaCollection"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const payurl = `https://asadback.onrender.com/paymentList`;
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
      (payment) => payment.usrId === userData._id
    );
    console.log("Payment data for user:", userData.name, paymentData); // Log payment data for each user
    return {
      ...userData,
      prevJer: paymentData ? paymentData.prevJer : 0,
    };
  });

  console.log("Joined data:", joinedData); // Log joined data array

  // Create an object to store user IDs and their corresponding total amounts
  const userTotals = {};

  // Initialize userTotals to 0 for all users
  for (const userData of user) {
    const userId = userData._id;
    userTotals[userId] = 0;
  }

  // Iterate through the payments array and calculate the total amount for each user
  for (const payment of payments) {
    const userId = payment.usrId;
    const give = parseInt(payment.give) || 0; // Treat undefined as 0
    const got = parseInt(payment.got) || 0; // Treat undefined as 0

    userTotals[userId] += give - got;
  }

  console.log("User totals:", userTotals);
  // Calculate total give, got, and prevJer for all users
  let totalGive = 0;
  let totalGot = 0;
  let totalPrevJer = 0;

  for (const payment of payments) {
    totalGive += parseInt(payment.give) || 0;
    totalGot += parseInt(payment.got) || 0;
    totalPrevJer += parseInt(payment.prevJer) || 0;
  }

  // Calculate the grand total by adding give, got, and prevJer
  const grandTotal = totalGive - totalGot + totalPrevJer;

  return (
    <Container fluid>
      <>
        <div className="topColumns">
          <div className="overAll">
            <div className="getAmnt">
              <h4 className="pt-2">মোট পাবো</h4>
              <h3>{grandTotal.toLocaleString()}</h3>
            </div>
            <div className="getAmnt">
              <h3 className="pt-2">মোট দেবো</h3>
              <h6></h6>
            </div>
          </div>
          <div className="filterDownLoadPress">
            <div className="serarch">
              <input
                type="text"
                name=""
                id=""
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter">
              <i className="fa-solid fa-arrow-up-9-1"></i>
            </div>
            <div className="download">
              <i className="fa-solid fa-download"></i>
            </div>
          </div>
          <small className="ps-5">Total Customer:<span className="lenghtCusto">{user.length}</span></small>
        </div>
        <div className="userShow">
          {joinedData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item?.name?.toLowerCase().includes(search) ||
                    item.userSerialNo?.includes(search);
            })
            .map((singleData, index) => {
              const totalIncludingPrevJer =
                parseInt(singleData.prevJer) + userTotals[singleData._id];
              console.log("Total Including prevJer:", totalIncludingPrevJer);

              return (
                <Link
                  key={singleData._id}
                  to={`${singleData._id}`}
                  className="userLinks"
                >
                  <div className="userListss">
                    <p>{singleData?.name}</p>
                    <p>{totalIncludingPrevJer}</p>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="customerAdd">
          <Link className="customerAd" to="/add">
            <i className="fa-solid fa-user-plus me-1"></i>Add
          </Link>
        </div>
      </>
    </Container>
  );
};

export default UserList;

