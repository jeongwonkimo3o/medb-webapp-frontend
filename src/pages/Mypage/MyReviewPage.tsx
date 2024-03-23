import ReviewComponent from "../../components/Review/ReviewComponent";
import SideMenu from "../../components/SideMenu";

const MyReviewPage = (): JSX.Element => {
  const nickname = localStorage.getItem("nickname");

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">{nickname}</span>님이
          작성하신 리뷰입니다.
        </div>

        {/* 여기서 max-w-full을 추가하여 ReviewComponent의 최대 너비를 조절합니다. */}
        <div className="max-w-full overflow-x-hidden">
          <ReviewComponent />
        </div>
      </div>
    </div>
  );
};

export default MyReviewPage;
