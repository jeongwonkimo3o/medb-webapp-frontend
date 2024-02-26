import AuthForm from "../../components/AuthForm";

const RegisterPage = (): JSX.Element => {

  const handleRegister = () => {
    console.log('회원가입임')
  };

  return (
    <div className="text-center mt-20 ">
      <p className="text-4xl">회원가입</p>
      <AuthForm type="register" onSubmit={handleRegister} />     
    </div>

  )
}

export default RegisterPage