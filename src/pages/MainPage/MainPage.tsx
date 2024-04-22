import SearchForm from '../../components/Search/SearchForm';

const MainPage = (): JSX.Element => {
  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-l text-center">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          4,000개 이상의 의약품 정보를 검색하자!
        </h2>

        <p className="hidden text-gray-500 sm:mt-8 sm:block">
          약 정보를 얻기 위해 설명서를 펼치셨나요? <br /> 설명서가 복잡하고,
          작은 글씨로 인해 읽기 어렵지 않으신가요? 😢 <br />
          그럴 경우에는 MEDB를 통해 필요한 정보만을 손쉽게 찾아볼 수 있습니다!
        </p>
      </div>
      <SearchForm redirectOnSearch={true} />
    </div>
  );
};

export default MainPage;
