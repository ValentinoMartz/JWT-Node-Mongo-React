import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import { useNavigate } from "react-router-dom";

const Register = ({ user }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await http.post("/user", userDetails);
      localStorage.setItem("token", data);
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      }
    }
  };
  return (
    <form className="signup_form" onSubmit={handleSubmit}>
      <label htmlFor="Name">Name</label>
      <input type="text" name="name" onChange={handleChange} />

      <label htmlFor="Email">Email</label>
      <input type="email" name="email" onChange={handleChange} />

      <label htmlFor="Password">Password</label>
      <input type="password" name="password" onChange={handleChange} />

      {error && (
        <div className="error_container">
          <p className="form_error">{error}</p>
        </div>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
