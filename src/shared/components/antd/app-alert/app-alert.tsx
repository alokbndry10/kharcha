import { Alert } from 'antd';
import type { AlertProps } from 'antd';
import './app-alert.css';
import { appAlertIcons } from '../alert.utils';

/**
 * AppAlert is a custom wrapper around Ant Design's Alert.
 *
 * - Automatically injects a default icon (except for 'warning' type)
 * - Applies a default className: 'app-alert
 * - Fully customizable via AlertProps
 *
 * @param {AlertProps} props - Same props as Ant Design Alert
 * @returns {JSX.Element} AntD Alert with defaults applied
 */
export function AppAlert({ type = 'info', icon, ...rest }: AlertProps) {
  if (!icon) icon = appAlertIcons[type];

  return <Alert type={type} className="app-alert" icon={icon} {...rest} />;
}
