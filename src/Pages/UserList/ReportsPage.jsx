import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportsPage = () => {
    const [showReport, setShowReport] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

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
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);
        // Filter showReport data based on the selected date range
        const filteredData = showReport.filter(report => {
            // Check if the report has currentDate property and it's in the expected format
            if (report.hasOwnProperty('currentDate') && typeof report.currentDate === 'string') {
                // Parse currentDate string into Date object
                const reportDate = new Date(report.currentDate);
                // Ensure both reportDate, startDate, and endDate are in UTC for accurate comparison
                reportDate.setMinutes(reportDate.getMinutes() - reportDate.getTimezoneOffset());
                const startUTC = startDate ? new Date(startDate.toISOString().split('T')[0]) : null;
                const endUTC = endDate ? new Date(endDate.toISOString().split('T')[0]) : null;
                console.log("reportDate:", reportDate);
                console.log("startUTC:", startUTC);
                console.log("endUTC:", endUTC);
                // Perform comparison
                return (!startUTC || reportDate >= startUTC) && (!endUTC || reportDate <= endUTC);
            } else {
                // Handle case where currentDate property is missing or not in expected format
                return false; // Exclude this report from filteredData
            }
        });
        // Update the filtered data to state
        setFilteredData(filteredData);
        console.log("filteredData:", filteredData);
    }, [startDate, endDate, showReport]);
    
    
    
    

    return (
        <>
            <div className="rptHead">
                <div className='reports'>
                    <div className="reportsHead">
                        <div className="leftReprot">
                            <p>Left Heading</p>
                        </div>
                        <div className="rightReprot">
                            <p>Right Heading</p>
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
            </div>
            <div className="rptDataShow">
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
