import { LoginView } from './login.view';
import { useLogin } from './use-login';

export default function LoginPage() {
  const logic = useLogin();
  return <LoginView {...logic} />;
}
