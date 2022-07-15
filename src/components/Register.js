import AuthForm from './AuthForm';
import * as auth from '../utils/Auth';

function Register() {

  return (
    <AuthForm
      action={auth.register}
      title="Регистрация"
      button="Зарегистрироваться"
      isRegistered={false}
    />
  )
}

export default Register;
