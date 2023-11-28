import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const UserList = () => {
  const [search, setSearch] = useState("");
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

  userTotals[userId] += parseInt(payment.give) - parseInt(payment.got);
}
  return (
    <Container fluid>
      <>
        <div className="topColumns">
          <div className="overAll">
            <div className="getAmnt">
              <h1>Total Pabo</h1>
              {/* <h6>{totalGiven}/=</h6> */}
            </div>
            <div className="getAmnt">
              <h1>Total Pabo</h1>
              <h6>100/=</h6>
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
              <p>Filter</p>
            </div>
            <div className="download">
              <i className="fa-solid fa-download"></i>
              <p>Down</p>
            </div>
            <div className="alart">
              <i className="fa-solid fa-bell"></i>
              <p>Alert</p>
            </div>
          </div>
        </div>

        <div className="userShow">
          {joinedData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item?.name?.toLowerCase().includes(search) ||
                  item.userSerialNo?.includes(search);
            })
            .map((singleData, index) => (
              <Link
                key={singleData._id}
                to={`${singleData._id}`}
                className="userLinks"
              >
                <div className="userListss">
                  <p>{singleData?.name}</p>
                  <p>{parseInt(singleData?.prevJer)+parseInt(userTotals[singleData._id])}</p>
                  {/* <p>single Users prevJer: {singleData?.prevJer}</p> */}
                </div>
              </Link>
            ))}
        </div>
        <div className="customerAdd">
          <Link className="customerAd" to="/add">
            <i className="fa-solid fa-user-plus me-1"></i>Add Customer
          </Link>
        </div>
      </>
    </Container>
  );
};

export default UserList;
