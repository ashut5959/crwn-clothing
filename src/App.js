import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignUpForm from "./components/signup/signup.component";
import Authentication from "./routes/authentication/sign-in.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getCurrentUser } from "./utils/firebase/firebase.utils";
import { checkUserSession } from "./store/user/user.action";
// import { getCurrentUser } from "./utils/firebase/firebase.utils";
// import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListner((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }

    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;

    // getCurrentUser().then((user) => console.log(user));
    // getCurrentUser().then((user)=>console.log(user));
    dispatch(checkUserSession());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
