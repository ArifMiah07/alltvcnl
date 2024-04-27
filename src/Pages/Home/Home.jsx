// import NavBar from "../Shared/NavBar/NavBar";

import { Helmet } from "react-helmet-async";
import Features from "../Features/Features";

// import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
        <div className="h-ful ">
        <Helmet>
            <title>Portfolio | Home</title>
        </Helmet>
        <h1 className="text-red-600 font-extrabold text-4xl">This is a part of practice project. No Harm full intention there.</h1>
            <div>
            {/* <Banner></Banner> */}
            </div>
            <div>
                <Features></Features>
            </div>

        </div>
    );
};

export default Home;