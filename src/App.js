import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignUpForm from "./components/signup/signup.component";
import Authentication from "./routes/authentication/sign-in.component";

const Shop = () => {
  return <h1>I ame the shop page</h1>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="signup" element={<SignUpForm />} />
      </Route>
    </Routes>
  );
};

export default App;
