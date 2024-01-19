import React from 'react';
import "../styles/css/Home.css"
import flower from "../img/flower.png";
import flowers from "../img/flowers.png";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home d-flex flex-wrap justify-content-around m-auto p-3 align-items-center text-white">
            <a onClick={() => navigate("/bouquets")}>
                <div className="container-bouquets"
                     style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)),url(${flowers})`}}>
                        <h1>
                            Bouquets
                        </h1>

                </div>
            </a>
            <a onClick={() => navigate("/flowers")}>
                <div className="container-flowers"
                     style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)),url(${flower})`}}>
                        <h1>
                            Flowers
                        </h1>
                </div>
            </a>
        </div>
    );
};

export default Home;