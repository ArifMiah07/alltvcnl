import { useParams } from "react-router-dom";
import { useBannerContext } from "../../Contexts/BannerContext";
import ImgDetailsCard from "../ImgDetailsCard/ImgDetailsCard";


const ImgDetails = () => {
    const {id} = useParams();
    const {bannerData} = useBannerContext();
    const intId = parseInt(id);
    const data = bannerData.find(bd=> bd.id == intId)
    console.log(bannerData)
    
    // const 
    console.log(id);
    return (
        <div>
            <h1>thsis is img details{id}</h1>
            <ImgDetailsCard key={id} data={bannerData}></ImgDetailsCard>
            {/* {id} */}
        </div>
    );
};

export default ImgDetails;