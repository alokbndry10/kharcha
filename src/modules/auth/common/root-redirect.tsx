import { root_route } from '@shared/constants/app.constants';
import { useUser } from '@shared/hooks/use-user';
import { Navigate } from 'react-router-dom';

export default function RootRedirect() {
  const { user } = useUser();

  return <Navigate to={user ? root_route : '/login'} replace />;
}
