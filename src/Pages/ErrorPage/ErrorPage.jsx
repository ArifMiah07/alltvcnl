import { Link } from "react-router-dom";
import RubiksCube from "../../Components/cube/RubiksCube";

export default function ErrorPage() {
  return (
    <div className="relative">
      <div>
        <RubiksCube></RubiksCube>
      </div>
    <div className="opacity-100 anime-error-body min-w-[100vw] min-h-screen flex flex-col items-center justify-center gap-6  ">
      <div className="flex flex-col items-center justify-center gap-3 p-2 ">
        <h1 className="font-bold text-black text-5xl anime-text " >404</h1>
        <h3>Page Not Found</h3>
      </div>
      <div className="z-10 bg-green-500 px-3 py-2 text-white rounded-lg hover:border hover:border-green-600 focus:bg-purple-600 focus:border focus:border-purple-600 focus:animate-pulse duration-150 delay-75 transition-all flex items-center justify-center p-3 my-2">
        <Link to={`/`}>
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
    </div>
    
  );
}
