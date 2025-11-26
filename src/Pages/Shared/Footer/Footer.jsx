import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#08292a] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">IPTV Player</h2>
          <p className="text-sm">
            Your gateway to seamless entertainment. Stream top channels with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/home" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/v-player" className="hover:underline">VPlayer</Link></li>
            <li><Link to="/more" className="hover:underline">More</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@iptvplayer.com</p>
          <p className="text-sm">Phone: +880-123-456-789</p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-200"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-200"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-gray-200"><FaYoutube /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-200"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} IPTV Player. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
