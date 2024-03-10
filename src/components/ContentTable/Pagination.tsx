import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 번호 클릭 이벤트 핸들러를 사용하여 페이지 변경
  // navigate 대신 onPageChange 사용
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber); // 이 함수를 호출하도록 변경
  };

  return (
    <div className="flex justify-center mt-10 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none ${currentPage === pageNumber ? 'bg-primary/20' : 'hover:bg-gray-100'}`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
