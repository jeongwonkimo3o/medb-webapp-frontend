import { useState } from "react";
import {
  MdSentimentVerySatisfied,
  MdSentimentSatisfied,
  MdSentimentDissatisfied,
} from "react-icons/md";

interface ReviewFormProps {
  onClose: () => void; // onClose 함수는 반환값이 없는 함수
}

const ReviewForm = ({ onClose } : ReviewFormProps) => {
  const [imagePreviews, setImagePreviews] = useState<
    Array<string | ArrayBuffer | null>
  >([]);

  console.log(imagePreviews);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: Array<string | ArrayBuffer | null> = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          setImagePreviews([...imagePreviews, reader.result]); // 새로운 미리보기를 추가
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };



  return (
    <div className="flex justify-center items-start space-x-4">
      <div className="bg-white p-8 rounded-lg">
        <button
          className="absolute top-2 right-2 text-sm text-gray-500 cursor-pointer"
          onClick={ onClose }
        >
          닫기
        </button>
        <form action="#" className="space-y-4">
          <div>
            <p className="text-lg font-bold mb-4">리뷰 작성</p>
            <input
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="제목"
              type="text"
              id="title"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <label
              className={`group block w-full cursor-pointer rounded-lg border border-gray-200 p-3 ${
                selectedOption === "like"
                  ? "text-blue-500 border-blue-500"
                  : "text-gray-600 hover:text-blue-500 hover:border-blue-500"
              }`}
              onClick={() => handleOptionChange("like")}
            >
              <input className="sr-only peer" type="radio" name="option" />
              <MdSentimentVerySatisfied
                className={`h-6 w-6 mx-auto mb-2 ${
                  selectedOption === "like"
                    ? "text-blue-500"
                    : "text-gray-600 group-hover:text-blue-500"
                }`}
              />
              <span className="text-sm"> 좋아요 </span>
            </label>

            <label
              className={`group block w-full cursor-pointer rounded-lg border border-gray-200 p-3 ${
                selectedOption === "neutral"
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-600 hover:text-orange-500 hover:border-orange-500"
              }`}
              onClick={() => handleOptionChange("neutral")}
            >
              <input className="sr-only peer" type="radio" name="option" />
              <MdSentimentSatisfied
                className={`h-6 w-6 mx-auto mb-2 ${
                  selectedOption === "neutral"
                    ? "text-orange-500"
                    : "text-gray-600 group-hover:text-orange-500"
                }`}
              />
              <span className="text-sm"> 보통이에요 </span>
            </label>

            <label
              className={`group block w-full cursor-pointer rounded-lg border border-gray-200 p-3 ${
                selectedOption === "dislike"
                  ? "text-red-500 border-red-500"
                  : "text-gray-600 hover:text-red-500 hover:border-red-500"
              }`}
              onClick={() => handleOptionChange("dislike")}
            >
              <input className="sr-only peer" type="radio" name="option" />
              <MdSentimentDissatisfied
                className={`h-6 w-6 mx-auto mb-2 ${
                  selectedOption === "dislike"
                    ? "text-red-500"
                    : "text-gray-600 group-hover:text-red-500"
                }`}
              />
              <span className="text-sm"> 별로예요 </span>
            </label>
          </div>

          <div>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="내용을 입력하세요."
              id="content"
              rows={5}
            ></textarea>
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file_input"
            >
              사진 업로드
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleImageChange}
              multiple // 여러 파일 선택 가능하도록 설정
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
      {imagePreviews.map(
        (
          preview,
          index // 여러 장의 미리보기를 매핑하여 출력
        ) => (
          <div key={index} className="mt-4">
            <img
              src={preview as string}
              alt="Preview"
              className="max-w-xs h-auto rounded-lg shadow-md"
              style={{ maxWidth: "200px" }} // 이미지 크기 조절
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReviewForm;
