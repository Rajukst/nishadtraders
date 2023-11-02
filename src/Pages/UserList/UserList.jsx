import { useQuery } from "react-query";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
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
  return (
    <Container fluid>
      <>
        <div className="topColumns">
          <div className="overAll">
            <div className="getAmnt">
              <h1>Total Debo</h1>
              <h6>000/=</h6>
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
              <i class="fa-solid fa-arrow-up-9-1"></i>
              <p>Filter</p>
            </div>
            <div className="download">
              <i class="fa-solid fa-download"></i>
              <p>Down</p>
            </div>
            <div className="alart">
              <i class="fa-solid fa-bell"></i>
              <p>Alert</p>
            </div>
          </div>
        </div>
        <div className="userShow">
          {user
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item?.name?.toLowerCase().includes(search) ||
                    item.userSerialNo?.includes(search);
            })
            ?.map((singleData, index) => (
                <Link key={singleData._id} to={`${singleData?._id}`} className="userLinks">
                  <div className="userListss">
                   <p>{singleData?.name}</p>
                   <p>{singleData?.prevJer}</p>
                   </div>  
                </Link>
                
            //   <table>
            //     <thead>
            //         <Link to="#">
            //         <tbody>
            //         <tr key={singleData._id}>
            //         <td className="ms-5"></td>
            //           <td>{singleData?.prevJer}</td>
            //         </tr>
            //       </tbody>
            //         </Link>
                  
            //     </thead>
            //   </table>
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
