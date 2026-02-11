import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "../Shared/Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-700  dark:bg-none dark:bg-black text-white px-6 md:px-20 py-16">
        {/* Hero Section */}
        <section className="  max-w-5xl text-center space-y-8">
          <h1 className="text-5xl font-extrabold drop-shadow-lg leading-tight">
            IPTV Player — Stream 13,000+ Live Channels Instantly
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Experience fast, reliable, and responsive IPTV streaming with
            powerful search, bookmarks, and seamless playback on any device.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link
              to="/stream-iptv"
              className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold shadow-lg transition">
              Launch IPTV Player
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border border-white rounded-lg hover:bg-white hover:text-indigo-700 font-semibold transition">
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <FeatureCard
            title="13,000+ Channels"
            description="Wide variety of live TV channels from across the globe."
          />
          <FeatureCard
            title="Bookmark Favorites"
            description="Save your preferred channels for quick access anytime."
          />
          <FeatureCard
            title="Responsive & Fast"
            description="Works smoothly on desktop, mobile, and tablets."
          />
        </section>
      </main>
      <div className=" h-fit ">
        <Footer></Footer>
      </div>
    </>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-default">
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="leading-relaxed">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default LandingPage;
