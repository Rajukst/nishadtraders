import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';


const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    const navigate= useNavigate()
    const onSubmit = (data) => {
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          console.log(loggedUser);
          updateUserProfile(data.name)
               .then(()=>{
                const savedUser ={name:data.name, email:data.email}
                fetch("https://asadback.onrender.com/adminusers",{
                  method: "POST",
                  headers:{
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(savedUser)
                })
                .then(res=>res.json())
                .then(data =>{
                  if(data.insertedId){
                    console.log("User Profile Updated!");
                    toast.success("Signup Completed!");
                    reset();
                    navigate("/users")
                  }
                })
           
          })
        })
        .catch((error) => toast.error(error.message));
    };
    return (
        <section>
      <div className="login-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-user-tie"></i>
            </span>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
            />
            <label>Name</label>
            {errors.name && (
              <span style={{ color: "white" }}>This field is required</span>
            )}
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email")}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              name=""
              id="pass"
              {...register("password")}
            />
            <label>Password</label>
          </div>
          <input
            className="submitBTN"
            type="submit"
            name="Sign Up"
            id=""
            value="Sign Up"
          />
        </form>
      </div>
    </section>
    );
};

export default SignUp;