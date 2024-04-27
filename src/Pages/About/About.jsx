// import NavBar from "../Shared/NavBar/NavBar";

import { Helmet } from "react-helmet-async";
import IPTVComponent from "../IPTVComponent/IPTVComponent";


const About = () => {
    return (
        <div className="h-fit">
            {/* <NavBar></NavBar> */}
            <Helmet>
                <title>About | Root</title>
            </Helmet>
            <h1>hir is about</h1>
            <IPTVComponent></IPTVComponent>
        </div>
    );
};

export default About;