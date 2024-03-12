import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportsPage = () => {
    const [showReport, setShowReport] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [totalGiveAmount, setTotalGiveAmount] = useState(0); // State to store total give amount
    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/paymentList')
            .then(response => response.json())
            .then(data => {
                setShowReport(data); // Update showReport state with fetched data
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        console.log('Start date',startDate);
        console.log('End date',endDate);
        // Filter showReport data based on the selected date range
        const filteredData = showReport.filter(report => {
            // Check if the report has currentDate property and it's in the expected format
            if (report.hasOwnProperty('currentDate') && typeof report.currentDate === 'string') {
                // Parse currentDate string into Date object
                const reportDate = new Date(report.currentDate);
                // Ensure both reportDate, startDate, and endDate are in UTC for accurate comparison
                reportDate.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds for accurate date comparison
                const startUTC = startDate ? new Date(startDate.getTime()) : null;
                const endUTC = endDate ? new Date(endDate.getTime()) : null;
                // Perform comparison
                return (!startUTC || reportDate >= startUTC) && (!endUTC || reportDate <= endUTC) && report.give > 0;
                // The additional condition report.give > 0 ensures that reports with give amount 0 will be ignored
            } else {
                // Handle case where currentDate property is missing or not in expected format
                return false; // Exclude this report from filteredData
            }
        });
        // Update the filtered data to state
        setFilteredData(filteredData);
    }, [startDate, endDate, showReport]);
    
    
    
    useEffect(() => {
        // Calculate total give amount
        let totalAmount = 0;
        filteredData.forEach(report => {
            totalAmount += parseInt(report.give); // Assuming the property name is 'giveAmount'
        });
        setTotalGiveAmount(totalAmount);
    }, [filteredData]);
    
    return (
        <>
            <div className="rptHead">
                <div className='reports'>
                    <div className="reportsHead">
                        <div className="leftReprot">
                            <p>Total: {totalGiveAmount}</p>
                        </div>
                        <div className="rightReprot">
                            <p>Download Report</p>
                        </div>
                    </div>
                </div>
                <div className="datePickr">
                    <div className="dateStart">
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                        />
                    </div>
                    <div className="endDate ps-1">
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                        />
                    </div>
                </div>
                <i className="fa-solid fa-cloud-arrow-down fa-2x ms-2"></i>
            </div>
            <div className="rptDataShow mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((report, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{report?.name}</td>
                                <td>{report?.give}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ReportsPage;
