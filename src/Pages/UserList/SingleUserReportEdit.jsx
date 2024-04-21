import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker



const SingleUserReportEdit = () => {
    const { id } = useParams();
    const [dataTableEdit, setDataTableEdit] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
      const url = `https://nishadserver.vercel.app/reportTableData/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setDataTableEdit(data));
    }, [id]);

    const handleDateChange = (date) => {
        setCurrentDate(date);
    };

    const editGive = (e) => {
      const GiveAmount = e.target.value;
      const updatedGiveAmount = { ...dataTableEdit };
      updatedGiveAmount.give = GiveAmount;
      setDataTableEdit(updatedGiveAmount);
    };

    const editGot = (e) => {
      const gotAmount = e.target.value;
      const updatedGotAmount = { ...dataTableEdit };
      updatedGotAmount.got = gotAmount;
      setDataTableEdit(updatedGotAmount);
    };

    const editDetails = (e) => {
      const details = e.target.value;
      const updatedDetails = { ...dataTableEdit };
      updatedDetails.paydetails = details;
      setDataTableEdit(updatedDetails);
    };

    const handleUpdateForm = (e) => {
      e.preventDefault();
      const updatedData = { ...dataTableEdit, currentDate: currentDate.toISOString() }; // Convert currentDate to ISO string
      const url = `https://nishadserver.vercel.app/editReportTabledata/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log("updated Datatable",data);
          toast.success("Data updated successfully")
          navigate("/users");
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert("Failed to update data");
        });
    };
 
    return (
        <>
            <div className="paboDebo">
                <div className="paboDeboTxt">
                    <p>Time Duration</p>
                </div>
            </div>
            <div className="paboDeboForm">
                <div className="payForm mt-4">
                    <form onSubmit={handleUpdateForm}>
                        <div className="firstChild">
                            <input
                                className="inputClass me-3"
                                placeholder="দিলাম"
                                value={dataTableEdit?.give || ""}
                                onChange={editGive}
                            />
                            <input
                                className="inputClass"
                                placeholder="পেলাম"
                                value={dataTableEdit?.got || ""}
                                onChange={editGot}
                            />
                        </div>
                        <input
                            className="inputClass"
                            placeholder="বিবরণ"
                            value={dataTableEdit?.paydetails || ""}
                            onChange={editDetails}
                        />
                        <DatePicker
                            className="dateClass"
                            selected={currentDate}
                            onChange={handleDateChange}
                        />
                        <br /> <br />
                        <input
                        className="eidtUserBTN"
                            type="submit"
                            value="Update"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default SingleUserReportEdit;
