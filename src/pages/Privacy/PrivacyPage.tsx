import React, { useState } from "react";
import SideMenu from "../../components/SideMenu";
import { deleteUserAccount, updateUserInfo } from "../../api/privacy";

interface FormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  newNickname: string;
}

const PrivacyPage = () => {
  const email = localStorage.getItem("email") || "";
  const [formState, setFormState] = useState<FormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newNickname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이메일은 제외하고 나머지 폼 데이터만 서버로 전송합니다.
    try {
      const { currentPassword, newPassword, newNickname } = formState;
      const response = await updateUserInfo({
        currentPassword,
        newPassword,
        newNickname,
      });
      alert("업데이트 성공");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (confirmation) {
      try {
        await deleteUserAccount();
        alert("회원 탈퇴가 완료되었습니다.");
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    }
  };

  const nickname = localStorage.getItem("nickname");

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">{nickname}</span>님의
          개인정보를 수정하거나 회원탈퇴할 수 있습니다.
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 shadow-md mt-4 rounded-lg"
        >
          {" "}
          <div>
            <label htmlFor="email" className="text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={email} // 이메일 값을 input에 설정
              readOnly // 읽기 전용 속성 추가
            />
          </div>
          <div>
            <label htmlFor="currentPassword" className="text-gray-700">
              기존 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={formState.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-gray-700">
              새로운 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={formState.newPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={formState.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="newNickname" className="text-gray-700">
              새로운 닉네임
            </label>
            <input
              type="nickname"
              id="newNickname"
              name="newNickname"
              className="mt-1 mb-8 block w-full border-gray-300 rounded-md shadow-sm"
              value={formState.newNickname}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white rounded-md py-2 mt-4"
          >
            개인정보 수정
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white rounded-md py-2 mt-4"
          >
            회원탈퇴
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivacyPage;
