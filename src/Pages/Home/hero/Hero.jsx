//

import HeroSection from "../../../Components/hero/HeroSection";

const Hero = () => {
  return (
    <div className="border border-[#A100FF] shadow-sm hover:drop-shadow-sm bg-[#D9D9D933] p-5 backdrop-blur-xs flex flex-col items-center justify-center gap-3 w-full min-h-[70vh] ">
      <HeroSection />
    </div>
  );
};

export default Hero;
