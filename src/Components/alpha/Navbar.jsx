const Navbar = () => {
  return (
    <div className="border border-dashed border-white px-4 py-3 min-h-[48px] ">
      <ul className="flex flex-row gap-4">
        <li>Home</li>
        <li>Stream</li>
        <li>Search</li>
        <li>Favorities</li>
      </ul>
    </div>
  );
};

export default Navbar;
