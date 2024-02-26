import Field from './Field'
import { AuthFormProps } from '../../types/AuthFormProps';
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit }: AuthFormProps): JSX.Element => {

  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: '이메일',
    },
    // 회원가입 전용
    ...(type === 'register'
      ? [
        {
          name: 'nickname',
          type: 'text',
          placeholder: 'Nickname',
          label: '닉네임',
        },
      ]
      : []),
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: '비밀번호',
    },
    // 회원가입 전용
    ...(type === 'register'
      ? [
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm Password',
          label: '비밀번호 재입력',
        },
      ]
      : []),
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-12 max-w-md space-y-4">
      {fields.map((field, index) => (
        <Field key={index} field={field} />
      ))}
      {type === 'login' ? <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          계정이 없으신가요?  &nbsp;
          <Link className="underline hover:text-blue-600" to="/register">가입하기</Link>
        </p>

        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-800 hover:bg-blue-900 px-5 py-3 text-sm font-medium text-white"
        >
          로그인
        </button>
      </div> 
      
      : 
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          계정이 이미 있으신가요? &nbsp;
          <Link className="underline hover:text-blue-600" to="/login">로그인하기</Link>
        </p>

        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-800 hover:bg-blue-900 px-5 py-3 text-sm font-medium text-white"
        >
          회원가입
        </button>
      </div>}


    </form>
  );
}

export default AuthForm