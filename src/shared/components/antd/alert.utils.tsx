import { AlertProps } from 'antd';
import { RiErrorWarningFill, RiInformation2Fill, RiShieldCheckFill } from 'react-icons/ri';

export const appAlertIcons: Record<NonNullable<AlertProps['type']>, React.ReactNode> = {
  success: <RiShieldCheckFill size={18} className="text-emerald-700" />,
  info: <RiInformation2Fill />,
  error: <RiErrorWarningFill size={18} className="text-red-600" />,
  warning: <RiErrorWarningFill size={18} className="text-amber-600" />,
};
