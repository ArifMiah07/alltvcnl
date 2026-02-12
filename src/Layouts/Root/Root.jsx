import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import { Helmet } from "react-helmet-async";
import { Toaster } from "sonner";
import { useEffect, useRef } from "react";
import { useSettings } from "../../hooks/useSettings";

const Root = () => {
  // states
  const navigate = useNavigate();
  const location = useLocation();
  const keyBufferRef = useRef("");
  const bufferTimeoutRef = useRef(null);
  const navigationTimeoutRef = useRef(null);
  //
  const { hideNavBar } = useSettings();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // 1. CRITICAL: Ignore if user is typing in input/textarea/contentEditable
      const isTyping =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable;

      if (isTyping) return;

      // 2. CRITICAL: Handle modifier keys
      if (event.ctrlKey || event.altKey || event.metaKey) {
        if (event.ctrlKey && event.key.toLowerCase() === "s") {
          event.preventDefault();
          navigate("/search");
        }
        return;
      }

      // 3. Build the key sequence buffer
      const key = event.key.toLowerCase();

      // Clear existing timeouts
      if (bufferTimeoutRef.current) {
        clearTimeout(bufferTimeoutRef.current);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }

      // Add key to buffer
      keyBufferRef.current += key;
      const currentSequence = keyBufferRef.current;

      // console.log("Current sequence:", currentSequence); // Debug log

      // 4. PAGE-SPECIFIC MULTI-KEY COMMANDS (Check FIRST, highest priority)
      const pageSpecificCommands = {
        "/search": {
          se: () => {
            window.dispatchEvent(new CustomEvent("focusSearchInput"));
            keyBufferRef.current = "";
            return true; // Command executed
          },
          sc: () => {
            window.dispatchEvent(new CustomEvent("clearSearch"));
            keyBufferRef.current = "";
            return true;
          },
        },
        "/iptv": {
          ip: () => {
            window.dispatchEvent(new CustomEvent("focusIPTVInput"));
            keyBufferRef.current = "";
            return true;
          },
        },
        "/saved-channels": {
          sa: () => {
            window.dispatchEvent(new CustomEvent("focusSavedSearch"));
            keyBufferRef.current = "";
            return true;
          },
        },
      };

      // Check if current page has specific commands
      let commandExecuted = false;
      if (pageSpecificCommands[location.pathname]) {
        const commands = pageSpecificCommands[location.pathname];
        if (commands[currentSequence]) {
          commandExecuted = commands[currentSequence]();
          if (commandExecuted) {
            return; // Exit early, command was executed
          }
        }
      }

      // 5. GLOBAL SINGLE-KEY NAVIGATION (with delay to allow multi-key)
      const singleKeyMap = {
        h: "/home",
        s: "/search",
        a: "/about",
        i: "/iptv",
        p: "/v-player",
        v: "/view",
        m: "/more",
        c: "/stream/china-iptv",
        k: "/saved-channels",
        t: "/stream-iptv",
        1: "/page1",
        2: "/page2",
        3: "/page3",
        4: "/page4",
        5: "/page5",
        6: "/page6",
        7: "/page7",
        8: "/page8",
        9: "/page9",
        0: "/page10",
      };

      // Wait 300ms before executing single-key navigation
      // This allows time for multi-key sequences to complete
      if (currentSequence.length === 1 && singleKeyMap[currentSequence]) {
        navigationTimeoutRef.current = setTimeout(() => {
          // Only navigate if buffer hasn't changed (no second key was pressed)
          if (keyBufferRef.current === currentSequence) {
            navigate(singleKeyMap[currentSequence]);
            keyBufferRef.current = "";
          }
        }, 300); // 300ms delay
      }

      // Clear buffer after 800ms of inactivity
      bufferTimeoutRef.current = setTimeout(() => {
        keyBufferRef.current = "";
      }, 800);

      // Reset if sequence gets too long
      if (currentSequence.length > 3) {
        keyBufferRef.current = "";
      }
    };

    // Attach event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (bufferTimeoutRef.current) {
        clearTimeout(bufferTimeoutRef.current);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [navigate, location.pathname]);

  return (
    // this is root page
    /**
     * explaining later
     */
    <div
      // onClick={handleEvents}
      className="relative min-h-screen flex flex-col h-fit w-full mx-auto font-poppins ">
      {/* Global SEO + Structured Data */}
      <Helmet>
        <title>All TV IPTV Player - 13K+ Live TV Channels</title>

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "All TV IPTV Player",
            url: "https://alltvcnl.netlify.app",
            description:
              "Stream over 13,000+ live IPTV channels in HD quality. Free, fast, and responsive web player.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              ratingCount: "1250",
              bestRating: "5",
              worstRating: "1",
            },
            featureList: [
              "13,000+ Live Channels",
              "HLS Streaming",
              "Bookmark Channels",
              "Real-time Search",
              "Pagination",
              "Responsive Design",
            ],
          })}
        </script>
      </Helmet>
      <Toaster richColors position="top-right" className="fixed z-[9999]" />
      <div
        className="absolute z-0 w-full h-full -top-[60px] left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#A100FF_0%,_#3E1899_45%,_transparent_60%),_radial-gradient(circle_at_70%_35%,_#FF00B2_0%,_#99188C_45%,_transparent_60%),_radial-gradient(circle_at_50%_70%,_#00FFCC_0%,_#189984_45%,_transparent_60%)] blur-[500px] opacity-50 pointer-events-none
  "
      />

      <div className={`h-fit z-20 ${hideNavBar ? "hidden " : "visible"} `}>
        <NavBar></NavBar>
      </div>
      <div className=" z-10 flex-grow dark:bg-black dark:text-white">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
