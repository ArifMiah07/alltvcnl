

const ImgDetailsCard = ({bannerData}) => {
    console.log(bannerData)
    return (
        <div>
            This is imag d c
            {/* <img src={dat} alt="" /> */}
            {
                bannerData.map((data)=> <img key={data.id} src={data.imgUrl}></img>)
            }
        </div>
    );
};

export default ImgDetailsCard;