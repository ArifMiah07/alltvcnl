
import "./RubiksCube.css";

const RubiksCube = () => {
  const tiles = Array.from({ length: 9 }, (_, i) => <div key={i} className="tile" />);

  return (
    <div className=" opacity-10 scene">
      <div className="cube">
        <div className="face front">{tiles}</div>
        <div className="face back">{tiles}</div>
        <div className="face right">{tiles}</div>
        <div className="face left">{tiles}</div>
        <div className="face top">{tiles}</div>
        <div className="face bottom">{tiles}</div>
      </div>
    </div>
  );
};

export default RubiksCube;
