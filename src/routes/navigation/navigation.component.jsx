import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";
import Cart from "../../components/cart/cart.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>Logo</div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <div>
              <span>{currentUser.displayName.toUpperCase()}</span>
              <span className="nav-link" onClick={signOutUser}>
                SIGN OUT
              </span>
            </div>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <Cart />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
