import Field from "./Field";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/auth";
import { useEffect, useState } from "react";
import { authMsgState } from "../../atoms/authState";
import { useRecoilState } from "recoil";
import { AuthFormData, AuthFormProps } from "../../types/Auth";

const AuthForm = ({ type }: AuthFormProps): JSX.Element => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    ...(type === "register" ? { nickname: "", password_confirmation: "" } : {}),
  });

  const [authMsg, setAuthMsg] = useRecoilState(authMsgState);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthMsg("");
  }, [type, setAuthMsg]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response;

    if (type === "register" && formData.password !== formData.password_confirmation) {
      setAuthMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      if (type === "register") {
        // 회원가입 로직
        response = await registerUser({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname!,
          password_confirmation: formData.password_confirmation!,
        });
      } else {
        // 로그인 로직
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      }

      // 응답 처리
      setAuthMsg(response.message || "알 수 없는 오류가 발생했습니다.");
      if (response.success) {
        navigate("/"); // 성공 시 홈으로 리다이렉트
      }

    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setAuthMsg("알 수 없는 오류가 발생했습니다.");
    }
  };

  // 폼 필드 정의
  const fields = [
    { name: "email", type: "email", placeholder: "Email", label: "이메일" },
    ...(type === "register"
      ? [
          {
            name: "nickname",
            type: "text",
            placeholder: "Nickname",
            label: "닉네임",
          },
        ]
      : []),
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "비밀번호",
    },
    ...(type === "register"
      ? [
          {
            name: "password_confirmation",
            type: "password",
            placeholder: "Confirm Password",
            label: "비밀번호 재입력",
          },
        ]
      : []),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-12 max-w-md space-y-4"
    >
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={formData[field.name] ?? ""}
          onChange={handleChange}
        />
      ))}
      {authMsg && (
        <div className="text-red-500 text-left text-xs">{authMsg}</div>
      )}
      {type === "login" ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            계정이 없으신가요? &nbsp;
            <Link className="underline hover:text-blue-600" to="/register">
              가입하기
            </Link>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-800 hover:bg-blue-900 px-5 py-3 text-sm font-medium text-white"
          >
            로그인
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            계정이 이미 있으신가요? &nbsp;
            <Link className="underline hover:text-blue-600" to="/login">
              로그인하기
            </Link>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-800 hover:bg-blue-900 px-5 py-3 text-sm font-medium text-white"
          >
            회원가입
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
