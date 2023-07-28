import { useState } from "react";
import Button from "../button/button.componenet";
import FromInput from "../form-input/form-input.component";
import "./signin.styles.scss";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultForm = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formDetail, setFormDetail] = useState(defaultForm);
  const { email, password } = formDetail;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormDetail((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormDetail(defaultForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInAuthWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password": {
          alert("Incorrect Password for email");
          break;
        }
        case "auth/user-not-found": {
          alert("No user associated with this Email");
          break;
        }
        default: {
          alert(error.message);
          break;
        }
      }
    }
    resetForm();
  };
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <FromInput
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FromInput
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit" buttenType="inverted">
            Sign IN
          </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
