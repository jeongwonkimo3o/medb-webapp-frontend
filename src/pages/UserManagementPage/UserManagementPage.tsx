import SideMenu from "../../components/SideMenu";
import UserTable from "../../components/UserTable/UserTable";

const UserManagementPage = (): JSX.Element => {

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">유저 관리</span>
          <p className="text-sm mb-4"> 유저의 정보 및 이용 규칙을 위반하는 유저를 탈퇴 처리 할 수 있습니다.</p>
        </div>
        
    <UserTable />
        
      </div>
    </div>
  );
};

export default UserManagementPage;
