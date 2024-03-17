import SideMenu from "../../components/SideMenu";

const MyReviewPage = (): JSX.Element => {
  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">닉네임</span>님의
          마이페이지입니다.
        </div>
        
        
        
        </div>
      </div>
   
  );
}

export default MyReviewPage;