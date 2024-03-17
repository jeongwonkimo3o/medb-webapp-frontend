import { useState } from "react";
import {
  MdSentimentVerySatisfied,
  MdSentimentSatisfied,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { submitReview, uploadImages } from "../../api/review";

interface ReviewFormProps {
  onClose: () => void;
}

const ReviewForm = ({ onClose }: ReviewFormProps) => {
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const uploadResponse = await uploadImages(files);
        const uploadedImageKeys = uploadResponse.map(item => item.image_key);
        setImageKeys(uploadedImageKeys); // 상태 업데이트
      } catch (error) {
        console.error(error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };
  

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentElement = document.getElementById("content") as HTMLTextAreaElement;
    const content = contentElement ? contentElement.value : '';

    if (!content || !selectedOption || !imageKeys.length) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const formData = {
      content,
      rating: selectedOption,
      image_keys: imageKeys,
    };

    try {
      await submitReview(formData);
      alert("리뷰가 성공적으로 등록되었습니다.");
      onClose(); 
    } catch (error) {
      console.error(error);
      alert("리뷰 제출에 실패했습니다.");
    }
  };
  

  return (
    <div className="flex justify-center items-start space-x-4">
      <div className="bg-white p-8 rounded-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <button className="absolute top-2 right-2 text-sm text-gray-500 cursor-pointer" onClick={onClose}>
          닫기
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-lg font-bold mb-4">리뷰 작성</p>
            <p className="text-sm text-gray-500">약 만족도</p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <label
              className={`group block w-full cursor-pointer rounded-lg border border-gray-200 p-3 ${
                selectedOption === "좋아요"
                  ? "text-blue-500 border-blue-500"
                  : "text-gray-600 hover:text-blue-500 hover:border-blue-500"
              }`}
              onClick={() => handleOptionChange("좋아요")}
            >
              <input className="sr-only peer" type="radio" name="option" />
              <MdSentimentVerySatisfied
                className={`h-6 w-6 mx-auto mb-2 ${
                  selectedOption === "좋아요"
                    ? "text-blue-500"
                    : "text-gray-600 group-hover:text-blue-500"
                }`}
              />
              <span className="text-sm"> 좋아요 </span>
            </label>

            <label
              className={`group block w-full cursor-pointer rounded-lg border border-gray-200 p-3 ${
                selectedOption === "보통이에요"
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-600 hover:text-orange-500 hover:border-orange-500"
              }`}
              onClick={() => handleOptionChange("보통이에요")}
            >
              <input className="sr-only peer" type="radio" name="option" />
              <MdSentimentSatisfied
                className={`h-6 w-6 mx-auto mb-2 ${
                  selectedOption === "보통이에요"
                    ? "text-orange-500"
                    : "text-gray-600 group-hover:text-orange-500"
                }`}
              />
              <span className="text-sm"> 보통이에요 </span>
            </label>

            <label
              className={`group block w-full cursor-pointer rounded-lg border border-gray-200 p-3 ${
                selectedOption === "별로예요"
                  ? "text-red-500 border-red-500"
                  : "text-gray-600 hover:text-red-500 hover:border-red-500"
              }`}
              onClick={() => handleOptionChange("별로예요")}
            >
              <input className="sr-only peer" type="radio" name="option" />
              <MdSentimentDissatisfied
                className={`h-6 w-6 mx-auto mb-2 ${
                  selectedOption === "별로예요"
                    ? "text-red-500"
                    : "text-gray-600 group-hover:text-red-500"
                }`}
              />
              <span className="text-sm"> 별로예요 </span>
            </label>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-4">내용 작성</p>

            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="내용을 입력하세요."
              id="content"
              rows={5}
            ></textarea>
          </div>

          <div>
            <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              사진 업로드
            </label>
            <input id="file_input" type="file" onChange={handleImageChange} multiple />
          </div>

          <div className="mt-4">
            <button type="submit" className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
