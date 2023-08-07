import React, { useState } from "react";
import "./signup.styles.scss";
import FromInput from "../form-input/form-input.component";
import Button from "../button/button.componenet";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetFormField = () => {
    setFormData(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("this email is already in use");
      else console.log(error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FromInput
            label="Display Name"
            type="text"
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FromInput
            label="email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FromInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FromInput
            label="confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button children="Sign up" buttenType="inverted" />
      </form>
    </div>
  );
};

export default SignUpForm;
