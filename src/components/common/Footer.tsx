import React from "react";
import {Image} from "react-bootstrap";

const Footer = () => {

    return (
        <footer id="sticky-footer" className="py-4 shadow">
            <div className="container text-center text-white d-flex flex-column align-items-center">
                <div className="logo d-none d-md-block w-25 ">
                    <Image src="logo_1.png" className="img-fluid"/>
                </div>
                <small>Copyright &copy; FloristicBoom</small>
            </div>
        </footer>
    )
}
export default Footer;