import { useBannerContext } from "../../Contexts/BannerContext";
import ImageCard from "../../Components/ImageCard/ImageCard";


const Banner = () => {
    
    const { bannerData } = useBannerContext();

    //console.log(bannerData);
    // useEffect( ()=>{
    //     fetch('banner.json')
    //     .then(res => res.json())
    //     .then(data => setImgs(data))
    // }, [])
    return (
        <div className="grid lg:grid-cols-12 gap-3 p-1  border border-purple-600 shadow-lg ring ring-purple-500 ring-opacity-75 text-[#333333]">
            {/* <ImageCard></ImageCard> */}
            {
                bannerData.map((img)=> <ImageCard key={img.id} img={img}></ImageCard>)
            }
        </div>
    );
};

export default Banner;