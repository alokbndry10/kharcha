import { notification } from 'antd';
import { publicRoutes } from '@pages/routes/route-public';
import { colorPrimary } from '@shared/constants/app.constants';

export const toAppFixed = (percent: number) => parseFloat(parseFloat(percent + '').toFixed(2));

export const generateAvatar = (name = '') =>
  `https://ui-avatars.com/api/?background=ffffff&color=${colorPrimary.replace('#', '')}&&name=${name}`;

export const copyToClipboard = async (str = '', successMessage = 'Phone Number Copied.') => {
  await window.navigator.clipboard.writeText(str).then(() => {
    notification.success({ message: successMessage });
  });
};

export function isPublicRoute(pathname: string) {
  const isPublicPage = publicRoutes.find((publicRoute) => pathname.includes(publicRoute.path));
  return isPublicPage;
}

export const pluralize = (count: number, singular: string, suffix = 's') => {
  return `${count} ${count === 1 ? singular : singular + suffix}`;
};
