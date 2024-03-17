import { FiPlus, FiEdit, FiEye } from "react-icons/fi";
import { submitMedicationLog } from "../../api/medication_log";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isReviewModalOpenState } from "../../atoms/reviewState";

const FloatingMenu = ({
  onOpenReviewForm,
  onToggleReviewModal // onToggleReviewModal 함수 추가
}: {
  onOpenReviewForm: () => void;
  onToggleReviewModal: () => void; // 함수 타입 추가
}) => {
  const setIsReviewModalOpen = useSetRecoilState(isReviewModalOpenState);

  const toggleReviewModal = () => {
    setIsReviewModalOpen((prevState) => !prevState);
  };

  const handleAddToList = async () => {
    try {
      const itemSeq = localStorage.getItem("itemSeq");
      const token = localStorage.getItem("authToken");
      await submitMedicationLog(itemSeq as string, token as string);
      alert("약 복용 기록이 추가되었습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          alert("이미 복용 관리되고 있는 약입니다.");
        } else {
          console.error("약 복용 기록 추가 중 오류 발생:", error.message);
          alert("약 복용 기록을 추가하는 도중 오류가 발생했습니다.");
        }
      } else {
        // Axios 오류가 아닌 경우의 처리
        console.error("약 복용 기록 추가 중 예상치 못한 오류 발생:", error);
        alert("약 복용 기록을 추가하는 도중 예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="flex justify-between items-center bg-white rounded-t-lg shadow-md p-4 border border-gray-200">
        <button
          className="text-blue-500 flex-grow text-center hover:text-blue-600 transition duration-300"
          onClick={handleAddToList}
        >
          <FiPlus className="inline mr-2" />약 복용 리스트에 추가
        </button>
        <button
          className="text-blue-500 flex-grow text-center hover:text-blue-600 transition duration-300"
          onClick={onOpenReviewForm}
        >
          <FiEdit className="inline mr-2" />
          리뷰 작성
        </button>
        <button
          className="text-blue-500 flex-grow text-center hover:text-blue-600 transition duration-300"
          onClick={onToggleReviewModal} // 수정된 부분
        >
          <FiEye className="inline mr-2" />
          리뷰 보기
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;
