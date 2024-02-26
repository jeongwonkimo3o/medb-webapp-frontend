import AuthForm from "../../components/AuthForm";

const LoginPage = (): JSX.Element => {

  const handleLogin = () => {
    console.log('로그인임니둥')
  };

  return (
    <div className="text-center mt-20 ">
      <p className="text-4xl">로그인</p>
      <AuthForm type="login" onSubmit={handleLogin} />     
    </div>

  )
}

export default LoginPage