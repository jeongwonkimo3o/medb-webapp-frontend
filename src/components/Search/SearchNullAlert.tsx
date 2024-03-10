const SearchNullAlert = ({ showAlert }: { showAlert: boolean }) => {
  return showAlert ? (
    <div
      role="alert"
      className={`mt-4 rounded border-s-4 border-red-500 bg-red-50 p-4 transition-opacity duration-500 ease-in-out ${
        showAlert ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
      }`}
    >
      <strong className="block font-medium text-red-800">
        검색어를 입력하세요!
      </strong>

      <p className="mt-2 text-sm text-red-700">
        찾고 싶은 의약품 이름이나, 의약품 제조사명, 효능 키워드를 입력 후 검색
        버튼을 눌러주세요.
      </p>
    </div>
  ) : null;
};

export default SearchNullAlert;
