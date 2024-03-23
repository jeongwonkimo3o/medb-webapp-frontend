// UserTable.tsx
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/user";
import { User } from "../../types/User";
import { deleteUserAccount } from "../../api/privacy";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // 강제 탈퇴 처리 함수
  const handleForceDelete = async (userId : number) => {
    if (window.confirm("정말로 이 사용자를 강제 탈퇴하시겠습니까?")) {
      try {
        await deleteUserAccount(userId); // 사용자 탈퇴 함수 호출
        alert("사용자가 성공적으로 강제 탈퇴되었습니다.");
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                유저 이메일
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                가입일
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                처리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleForceDelete(user.id)} // 클릭 이벤트 추가
                  >
                    강제 탈퇴
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
