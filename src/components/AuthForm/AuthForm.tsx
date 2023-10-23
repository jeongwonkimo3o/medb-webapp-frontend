import Field from './Field'
import { AuthFormProps } from '../../types/AuthFormProps';

const AuthForm = ({ type, onSubmit } : AuthFormProps ): JSX.Element => {

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

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      {fields.map((field, index) => (
        <Field key={index} field={field} />
      ))}
       <button
              type="submit"
              className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >{
              type === 'login' ? '로그인' : '회원가입'
            }
            </button>
    </form>
  );
}

export default AuthForm