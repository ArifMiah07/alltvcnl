// import PropTypes from 'prop-types';
// import { createContext, useState, useContext } from 'react';


// // Create the hover context
// const HoverContext = createContext();

// // Custom hook to use the hover context
// export const useHoverContext = () => useContext(HoverContext);

// // Provider component to wrap around the components that need access to hover state
// export const HoverProvider = ({ children }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <HoverContext.Provider value={{ isHovered, setIsHovered }}>
//             {children}
//         </HoverContext.Provider>
//     );
// };

// HoverContext.propTypes = {
//     children: PropTypes.node.isRequired
// }

// export default HoverContext;
