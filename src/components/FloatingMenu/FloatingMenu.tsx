import { Link } from "react-router-dom";
import { FiPlus, FiEdit } from "react-icons/fi";

const FloatingMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="flex justify-between items-center bg-white rounded-t-lg shadow-md p-4 border border-gray-200">
        <Link
          to="/add-to-list"
          className="text-blue-500 flex-grow text-center hover:text-blue-600 transition duration-300"
        >
          <FiPlus className="inline mr-2" />
          약 복용 리스트에 추가
        </Link>
        <Link
          to="/write-review"
          className="text-blue-500 flex-grow text-center hover:text-blue-600 transition duration-300"
        >
          <FiEdit className="inline mr-2" />
          리뷰 작성
        </Link>
      </div>
    </div>
  );
};

export default FloatingMenu;

