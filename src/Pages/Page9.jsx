import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Pagination from "./Pagination";

const Page9 = () => {
    const [cnlData, setCnlData] = useState([]);

    useEffect(() => {
        fetch('page9.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCnlData(data);
            })
    }, []);

    return (
        <div className="flex flex-col ">
            <div className="text-center">
                <h1 className="text-xl font-bold ">This is Page 9</h1>
                <p className="text-lg font-semibold ">Total Channel : {cnlData.length} </p>
            </div>
            <Pagination></Pagination>
            <div className="flex flex-row gap-5">
                <p className="btn w-fit bg-green-50 py-3 px-5"><Link to='/'>Back</Link></p>
                <p className="btn w-fit bg-green-50 py-3 px-5"><Link to='/page10'>Next</Link></p>
            </div>
            <div className="flex flex-wrap justify-center gap-5 mt-4">
                {
                    cnlData.map(cnl => (
                        <div key={cnl.id} className="w-80  border border-gray-700 p-2 m-4">
                            <div className="bg-purple-50  ">
                                <div className="flex justify-center">
                                    <img src={cnl.logo} alt={cnl.title} className="h-16 w-16 mr-2" />
                                    <p className="text-lg font-bold">{cnl.title}</p>
                                </div>
                                <ReactPlayer
                                    url={cnl.url}
                                    controls={true}
                                    width="100%"
                                    height="auto"
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Page9;
