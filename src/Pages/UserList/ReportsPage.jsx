import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from '../Footer/Footer';

const ReportsPage = () => {
    const [showReport, setShowReport] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filterOption, setFilterOption] = useState('select'); // Default filter option

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const handleFilterChange = event => {
        setFilterOption(event.target.value);
    };

    useEffect(() => {
        // Fetch data from the API
        fetch('https://nishadserver.vercel.app/paymentList')
            .then(response => response.json())
            .then(data => {
                setShowReport(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const filteredData = showReport.filter(report => {
            if (report.hasOwnProperty('currentDate') && typeof report.currentDate === 'string') {
                const reportDate = new Date(report.currentDate);
                reportDate.setHours(0, 0, 0, 0);
                const startUTC = startDate ? new Date(startDate.getTime()) : null;
                const endUTC = endDate ? new Date(endDate.getTime()) : null;

                // Additional condition for filtering based on filterOption
                return (!startUTC || reportDate >= startUTC) && (!endUTC || reportDate <= endUTC) && (filterOption === 'give' ? report.give > 0 : report.got > 0);
            } else {
                return false;
            }
        });
        setFilteredData(filteredData);
    }, [startDate, endDate, showReport, filterOption]);
console.log('Filtered Data:', filteredData);
    useEffect(() => {
        // Calculate total amount
        let total = 0;
        filteredData.forEach(report => {
            total += filterOption === 'give' ? parseInt(report.give) : parseInt(report.got);
        });
        setTotalAmount(total);
    }, [filteredData, filterOption]);
      // Function to format date in local time zone
      const formatLocalDate = date => {
        return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
    }; 
    return (
        <>
            <div className="rptHead">
                <div className='reports'>
                    <div className="reportsHead">
                        <div className="leftReprot ms-2 mt-2">
                            <h6>Total/=</h6>
                            <h6>{totalAmount}</h6>
                        </div>
                        <div className="datePickr">
                    <div className="dateStart">
                        <DatePicker
                        className='endDatePickr'
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
                            className='endDatePickr'
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
                        <div className="rightReprot">
                        <i className="fa-solid fa-cloud-arrow-down fa-2x ms-2"></i>
                        </div> 
                    </div>
                    <div className="selectDate">
                <select className='selOption' value={filterOption} onChange={handleFilterChange}>
                    <option value="select">নির্বাচন করুন</option>
                    <option value="give">দিলাম</option>
                    <option value="got">আদায়</option>
                </select>
                </div>
                </div>
            </div>
            <div className="rptDataShow mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Give/Got</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((report, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{report?.name}</td>
                                <td>{formatLocalDate(new Date(report.currentDate))}</td> 
                                <td>{filterOption === 'give' ? <p>Give</p>: <p>Got</p>}</td>
                                <td>{filterOption === 'give' ? report?.give : report?.got}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Footer/>
        </>
    );
};

export default ReportsPage;
