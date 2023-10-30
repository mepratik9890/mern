import { useContext, useState } from "react";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../Context/DataContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(DataContext);

  

  const handleLogin = async (e) => {
    e.preventDefault();

    const axiosInstance = axios.create({
      withCredentials: true,
    });


    if (email!=='' && password !=='') {
      const response = await axiosInstance.post(
        "https://mernbackend-zqf3.onrender.com/api/user/login",
        { email: email, password: password } , 
      );
      if (response.data.success) {
        alert(response.data.message);
        localStorage.setItem('user' , JSON.stringify(response.data.user))
        setAuth(response.data.user.name);
        // setEmail('')
        // setPassword('')
        navigate("/");
      } else {
        alert(response.data.message);
      }
    }

    else {
      alert('Please enter your Credentials')
    }
 

   
  };

  return (
    <div className=' login d-flex '>
      <div className='left'>
        <h5>Login</h5>
        <p>Get Access to your Orders , Wishlist and Recommendation</p>
      </div>

      <div className='right d-flex  flex-column justify-content-center align-items-center'>
        <form className='login-form d-flex flex-column align-items-center gap-3 mt-3'>
          <input
            type='text'
            placeholder='Enter Email/Mobile Number'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Enter Password'
            className='mt-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='terms mt-2'>
            By continuing , you agree to {"Amazon's"}{" "}
            <span className='blue'>Terms of use </span> and{" "}
            <span className='blue'>Privacy Policy.</span>{" "}
          </span>
          <button className='loginbtn btn btn-danger' onClick={handleLogin}>
            Login
          </button>
        </form>

        <p>
          {"Don't"} have an Account?{" "}
          <Link to={"/signup"} className='sign'>
            {" "}
            <span>Signup Here!</span>{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};
export default Login;
