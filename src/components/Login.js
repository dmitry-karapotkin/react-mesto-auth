import AuthForm from './AuthForm';
import * as auth from '../utils/Auth';


function Login() {

  return (
    <AuthForm
      action={auth.login}
      title="Вход"
      button="Войти"
      isRegistered={true}
    />
  )
}

export default Login;
