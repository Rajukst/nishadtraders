import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SingleUserEdit = () => {
  const { id } = useParams();
  const [singleUserEdit, setSingleUserEdit] = useState({});
const navigate= useNavigate()
  useEffect(() => {
    const url = `http://localhost:5000/editdata/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSingleUserEdit(data));
  }, [id]);

  const editName = (e) => {
    const updatedName = e.target.value;
    const updatedUser = { ...singleUserEdit };
    updatedUser.name = updatedName;
    setSingleUserEdit(updatedUser);
  };
  const editMobile = (e) => {
    const updatedMobile = e.target.value;
    const updatedUser = { ...singleUserEdit };
    updatedUser.mobile = updatedMobile;
    setSingleUserEdit(updatedUser);
  };
  const handleUpdateForm = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/editdata/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(singleUserEdit),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Data updated successfully");
          navigate("/users")
        }
      });
  };
  return (
   <form onSubmit={handleUpdateForm}>
     <div className="mainCls">
      <div className="eidtUser">
        <div className="editName">
          <h6 className="mt-2 me-3 editColor">
            {singleUserEdit?.name?.charAt(0).toUpperCase() +
              singleUserEdit?.name?.charAt(1)}
          </h6>
        </div>
        <div className="editInput">
          <input
            type="text"
            className="intputTxt"
            name="name"
            value={singleUserEdit?.name || ""}
            onChange={editName}
          />
          <i
            className="fa-solid fa-user-plus userPlas"
            style={{ position: "absolute", top: 16, left: 5 }}
          ></i>
        </div>
      </div>
      <div className="editInputs mt-3">
        <input
          type="text"
          name="mobile"
          value={singleUserEdit?.mobile || ""}
          onChange={editMobile}
        />
        <i
          className="fa-solid fa-phone userPlas"
          style={{ position: "absolute", top: 16, left: 5 }}
        ></i>
      </div>
      <input
      className="eidtUserBTN"
      type="submit"
      name=""
      id=""
    />
    </div>
   </form>
  );
};

export default SingleUserEdit;
