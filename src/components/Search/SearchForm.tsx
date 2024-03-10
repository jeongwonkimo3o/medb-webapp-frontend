import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { searchTermState } from "../../atoms/searchState";
import { useNavigate } from "react-router-dom";
import SearchNullAlert from "./SearchNullAlert";

interface SearchFormProps {
  redirectOnSearch?: boolean;
}

const SearchForm = ({ redirectOnSearch = false }: SearchFormProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const setSearchTerm = useSetRecoilState(searchTermState);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!localSearchTerm.trim()) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    if (redirectOnSearch) {
      navigate(`/search?query=${encodeURIComponent(localSearchTerm)}`);
    } else {
      setSearchTerm(localSearchTerm);
    }
  };

  // 검색어가 변경될 때마다 라우터를 업데이트
  useEffect(() => {
    if (!redirectOnSearch) {
      setSearchTerm(localSearchTerm);
    }
  }, [localSearchTerm, setSearchTerm, redirectOnSearch]);

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <form onSubmit={handleSubmit} className="sm:flex sm:gap-4">
        <div className="sm:flex-1">
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요(의약품 이름, 효능 키워드, 제조사)"
            className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-800 px-5 py-3 text-white transition focus:outline-none hover:bg-blue-900 sm:mt-0 sm:w-auto"
        >
          <span className="text-sm font-medium">검색</span>
        </button>
      </form>
      <SearchNullAlert showAlert={showAlert} />
    </div>
  );
};

export default SearchForm;
