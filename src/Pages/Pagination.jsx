import { Link } from "react-router-dom";


const Pagination = () => {
    return (
        <div>
            <div className="w-full bg-blue-100 p-6 flex flex-row gap-4 flex-wrap ">
                <p><Link to={'/page2'}>Next (2)</Link></p>
                <p><Link to={'/page3'}>Next (3)</Link></p>
                <p><Link to={'/page4'}>Next (4)</Link></p>
                <p><Link to={'/page5'}>Next (5)</Link></p>
                <p><Link to={'/page6'}>Next (6)</Link></p>
                <p><Link to={'/page7'}>Next (7)</Link></p>
                <p><Link to={'/page8'}>Next (8)</Link></p>
                <p><Link to={'/page9'}>Next (9)</Link></p>
                <p><Link to={'/page10'}>Next (10)</Link></p>
                <p><Link to={'/page11'}>Next (11)</Link></p>
                <p><Link to={'/page1'}>Next (1)</Link></p>
            </div>
        </div>
    );
};

export default Pagination;