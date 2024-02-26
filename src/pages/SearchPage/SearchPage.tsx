import ContentTable from "../../components/ContentTable";
import SearchForm from "../../components/Search/SearchForm";

const SearchPage = (): JSX.Element => {
  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-l text-center">
        <h2 className="text-2xl font-medium text-gray-900 md:text-3xl">
          찾고 싶은 약을 검색해 보세요!
        </h2>
        <SearchForm />
        <p className="mt-12 mb-20">총 20개의 검색 결과가 있습니다.</p>
      </div>
    <ContentTable />
    </div>
  );
};

export default SearchPage;
