import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/allFeatures/Auth/authApi';
import { createUser } from '../../redux/allFeatures/Auth/authSlice';
import toast from 'react-hot-toast';

const SignUp = () => {
  const {register, control, handleSubmit,reset, formState: { errors }} = useForm();
  const password= useWatch({control, name: "password"})
  const confirmPassword= useWatch({control, name: "confirmPassword"})
  const navigate= useNavigate();
  const [disabled, setDisabled]= useState(true);
  const {isLoading, email, isError, error}= useSelector(state=>state.auth)
  const [postUser]= useRegisterMutation()
  const dispatch= useDispatch()
  useEffect(()=>{
    if(
      password !== undefined &&
        password !== "" &&
        confirmPassword !== undefined &&
        confirmPassword !== "" &&
        password === confirmPassword
  )
    {
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[password, confirmPassword])
  // error message showing UI
  useEffect(()=>{
    if(isError){
      toast.error(error)
    }
    },[isError, error])
    const registerSubmit = (e) => {
      console.log(e);
      dispatch(createUser({email:e.email, password:e.password}))
      postUser({...e, role: "user"})
      toast.success("Registration successful!!")
      reset()
      navigate("/")
    };
    return (
        <section>
      <div className="login-box">
        <form onSubmit={handleSubmit(registerSubmit)} >
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
          <div className="input-box">
            <span className="icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              name=""
              id="pass"
              {...register("confirmPassword", { required: true })}
            />
            <label>Confirm Password</label>
          </div>
          <input
            className="submitBTN"
            type="submit"
            name="Sign Up"
            id=""
            value="Sign Up"
            disabled={disabled}
          />
        </form>
      </div>
    </section>
    );
};

export default SignUp;