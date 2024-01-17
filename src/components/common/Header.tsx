import React from "react";
import {Input, Nav, NavLink} from 'reactstrap';
import {Link, useNavigate} from "react-router-dom";
import {BoxArrowRight, Cart} from "react-bootstrap-icons";
import {Image} from "react-bootstrap";
import {User} from "../../utils/types";
import {getUserFromStorage} from "../../utils/userUtils";

const Header = () => {
    const user: User | null = getUserFromStorage()
    const navigate = useNavigate()
    return (
        <header className="navbar navbar-dark text-white justify-content-center">
            <div className="d-flex justify-content-between align-items-center w-75">
                <Link to={"/"} className="logo d-none d-md-block w-25 ">
                    <Image src="logo.png" className="img-fluid"/>
                </Link>
                <div className="justify-content-center d-flex flex-grow-1 px-5">
                    <Input type="search"
                           placeholder="Search"
                           className="me-2 w-75 rounded-4"
                           aria-label="Search"></Input>
                </div>
                <Cart size={24} onClick={() => navigate("/cart")}/>
                {user ?
                    (
                        <Nav className="align-items-center">
                            <Link to={"/profile/" + 1}
                                  className="d-none d-lg-flex align-items-center justify-content-between p-2 text-white">
                                <span className="">{user.email}</span>
                            </Link>
                            <BoxArrowRight className="d-none d-md-block pe-auto " to="/"
                                           size={24}/>
                        </Nav>
                    ) : (
                        <div className="d-flex">
                            <NavLink to="/login">
                                <span>Login</span>
                            </NavLink>
                            <NavLink className="d-none d-md-block" to="/register">
                                <span>Sign Up</span>
                            </NavLink>
                        </div>
                    )
                }
            </div>
        </header>)
}
export default Header;