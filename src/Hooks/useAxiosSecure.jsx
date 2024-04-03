import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import toast from 'react-hot-toast';



const axiosSecure = axios.create({
  baseURL: 'https://asadback.onrender.com', 
});

const useAxiosSecure = () => {
  const { logOut } = useAuth(); 
  const navigate = useNavigate(); 
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          toast.error(error.message); 
          await logOut();
          navigate('/');
        
        }
        return Promise.reject(error);
       
      }
    );
  }, [logOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;


// baker@bb.com	admin	
// 2	rokib	rokib@gmail.com		
// 3	masud	masud@rana.com