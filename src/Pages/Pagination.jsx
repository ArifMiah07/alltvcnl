import { Link } from "react-router-dom";

const Pagination = () => {
  const totalPages = 11;
  const routes = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <div className="w-full bg-blue-100 p-6 flex flex-row gap-4 flex-wrap ">
        {routes.map((pageNum) => (
          <p key={pageNum}>
            <Link to={`/page${pageNum}`}>Page ({pageNum})</Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
