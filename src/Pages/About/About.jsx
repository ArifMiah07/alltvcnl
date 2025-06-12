import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="h-fit">
      {/* <NavBar></NavBar> */}
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">About Us</h1>
            <p className="py-6">
              We are a team dedicated to providing the best IPTV experience. Our
              platform offers a wide range of channels and features to enhance
              your viewing pleasure.
            </p>
            <p className="py-6">
              Our mission is to deliver high-quality content and a user-friendly
              interface, making it easy for you to find and enjoy your favorite
              channels.
            </p>
            <p className="py-6">
              We value your feedback and are constantly working to improve our
              service. If you have any suggestions or questions, feel free to
              reach out to us.
            </p>
            <p className="py-6">
              Thank you for choosing our IPTV service. We hope you have a great
              viewing experience!
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <img
              src="https://via.placeholder.com/150"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
