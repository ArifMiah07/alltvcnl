// import NavBar from "../Shared/NavBar/NavBar";

import { Helmet } from "react-helmet-async";
import VideoPlayer from "../VideoPlayer";


const More = () => {
    return (
        <div>
            {/* <NavBar></NavBar> */}
            <Helmet>
                <title>More | Root</title>
            </Helmet>
            <h1>This is more</h1>
            <VideoPlayer></VideoPlayer>
        </div>
    );
};

export default More;