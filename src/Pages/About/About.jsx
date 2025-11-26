import { Helmet } from "react-helmet-async";
import iptv from '.././../assets/images/iptv.png'

const About = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <Helmet>
        <title>About Us | IPTV Player</title>
        <meta name="description" content="Learn more about our IPTV Player and the team behind the experience." />
      </Helmet>

      <div className="max-w-5xl  mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-green-600">About Us</h1>
          <p className="mt-6 text-base lg:text-lg text-black leading-relaxed">
            Welcome to <strong>IPTV Player</strong> – your gateway to seamless entertainment.
            We’re a team committed to delivering a powerful, user-friendly IPTV experience packed
            with top channels and intuitive features.
          </p>

          <p className="mt-4 text-base lg:text-lg text-black leading-relaxed">
            Our mission is simple: to make content discovery enjoyable, fast, and stress-free.
            Whether you&apos;re tuning in for sports, movies, or international TV — we’ve got you covered.
          </p>

          <p className="mt-4 text-base lg:text-lg text-black leading-relaxed">
            We&apos;re constantly evolving and value your feedback. If you have ideas or need help,
            don’t hesitate to <a href="/contact" className="text-green-600 underline hover:text-green-700">reach out</a>.
          </p>

          <p className="mt-4 text-base lg:text-lg text-black leading-relaxed">
            Thanks for being part of our growing IPTV family. Enjoy the stream!
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={iptv}
            alt="About IPTV"
            className="rounded-lg shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
