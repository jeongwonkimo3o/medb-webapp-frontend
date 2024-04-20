import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {useSetRecoilState } from "recoil";
import { searchTermState } from "../../atoms/searchState";
import ContentTable from "../../components/ContentTable";
import SearchForm from "../../components/Search/SearchForm";

const SearchPage = (): JSX.Element => {
  const setSearchTerm = useSetRecoilState(searchTermState);
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query !== null) {
      setSearchTerm(decodeURIComponent(query));
    }

    // 검색어가 없는 경우에만 알림을 보여줌
    setShowAlert(query === null);
  }, [location, setSearchTerm]);

  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-l text-center">
        <h2 className="text-2xl font-medium text-gray-900 md:text-3xl">
          찾고 싶은 약을 검색해 보세요!
        </h2>
        <SearchForm />
        <p className="mt-12 mb-20">
          조회 결과는 다음과 같습니다.
        </p>
      </div>
      <ContentTable />
    </div>
  );
};

export default SearchPage;
