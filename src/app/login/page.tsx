import LoginForm from '@login/LoginForm';

const Login = () => {
  return (
    <div className="w-screen h-screen bg-priBlue text-priWhite">
      <div className="h-2/5 display-center flex-col">
        <p className="font-bold leading-0 text-6xl">Admin Section</p>
        <p>With great power comes great responsibility! Use it wisely</p>
      </div>
      <div id="container"></div>
      <div className="bg-priViolet h-3/5 flex items-center justify-center text-secondary">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
