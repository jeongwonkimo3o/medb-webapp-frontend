import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { fetchDrugs } from "../../api/search";
import Pagination from "./Pagination";
import { searchTermState } from "../../atoms/searchState";
import { Drug } from "../../types/Drug"; 
import { Link } from "react-router-dom";

const ContentTable = () => {
  const searchTerm = useRecoilValue(searchTermState);
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDrugs(currentPage, searchTerm);
      setDrugs(response.drugs.data);
      setCurrentPage(response.drugs.current_page);
      setTotalPages(response.drugs.last_page);
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
<div className="overflow-x-auto mx-auto max-w-[75%]">
      {" "}
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              분류번호
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              이름
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              설명
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center">
          {drugs.map((drug) => (
            <tr className="odd:bg-white" key={drug.id}>
              <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">
                {drug.item_seq}
              </td>
              <td className="whitespace-nowrap px-8 py-4 text-gray-700 cursor-pointer hover:underline">
                <Link to={`/detail/${drug.item_seq}`}>{drug.item_name}</Link>
              </td>
              {/* 10자 까지만 */}
              <td className="whitespace-nowrap px-2 py-4 text-gray-700">
                {drug.efcy_qesitm.length > 10
                  ? `${drug.efcy_qesitm.substring(0, 20)}...`
                  : drug.efcy_qesitm}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContentTable;
