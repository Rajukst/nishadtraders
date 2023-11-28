import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleUserReport = () => {
    const { id } = useParams();
    const [singleUserReport, setSingleUserReport] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/reportdata/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setSingleUserReport(data));
      }, []);
    return (
        <div>
            <h1>This is Single User Report{singleUserReport._id}</h1>
        </div>
    );
};

export default SingleUserReport;