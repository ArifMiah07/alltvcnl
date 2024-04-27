import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ImageCard = ({ img }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Check if img is defined and has the expected structure
    if (!img || typeof img !== 'object') {
        return null; // Render nothing if img is not valid
    }

    // Destructure img object with default values
    const { imgUrl = '', id = 0 } = img;

    // Define different styles based on ID
    const styles = {
        1: 'border border-red-500 ', // Example style for ID 1
        2: 'border border-blue-500 ', // Example style for ID 2
        // Add more styles as needed for different IDs
    };

    // Apply the style based on the ID and hover state
    const imgStyle = id in styles ? styles[id] : ''; // Default style for ID not found
    const hoverStyle = isHovered ? 'z-10 transform scale-150 translate-y-10' : 'z-0'; // Scale up on hover and set higher z-index

    return (
        <div className='w-full relative'>
            
            <div
                className={`w-fit ${imgStyle} ${hoverStyle} transition-transform duration-300 ease-in-out`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            <Link to={`/bannerDetails/:${id}`}><img src={imgUrl} alt='Image' /></Link>
                
            </div>
        </div>
    );
};

ImageCard.propTypes = {
    img: PropTypes.shape({
        imgUrl: PropTypes.string,
        id: PropTypes.number,
    }),
};

export default ImageCard;







// <div className={`col-span-6 lg:col-span-6 ${id === 0 ? 'lg:col-start-1' : ''}`}>
{/* <h1>{id}</h1>
{id === 0 && <img src={imgUrl} alt="" />}
</div> */}