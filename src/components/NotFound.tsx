import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <h1 className="text-4xl font-bold text-gray-500 mb-4">404</h1>
      <p className="text-lg text-gray-100 mb-8">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-violet-900 text-xs text-white rounded hover:bg-violet-800 transition-colors"
      >
        Go back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
