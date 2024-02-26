const SearchForm = (): JSX.Element => {
  return (
    <div className="mx-auto mt-12 max-w-xl">
        <form action="/search" className="sm:flex sm:gap-4">
          <div className="sm:flex-1">
            <label htmlFor="email" className="sr-only">
              drugName
            </label>

            <input
              type="drugName"
              placeholder="의약품 이름을 입력해 보세요!"
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

        <span className="block mt-4 text-sm text-gray-400 cursor-pointer hover:text-blue-500 text-left">
          <span className="material-symbols-outlined text-xs">help</span> 어떤 식으로
          검색하면 되나요?
        </span>
      </div>
  );
}

export default SearchForm;