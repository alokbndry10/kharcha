import { Avatar, Button } from 'antd';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { generateAvatar } from '@shared/utils/helpers';
import { useUser } from '@shared/hooks/use-user';
import { app_name } from '@shared/constants/app.constants';

export function ProfileContent() {
  const { logoutUser } = useUser();

  return (
    <div className="w-[230px] rounded-xl bg-white font-medium">
      <div className="flex items-center gap-2 p-2 border-b border-gray-200">
        <Avatar size={36} src={generateAvatar(app_name)} className="border border-gray-200! shrink-0" />
        <div>
          <p className="text-[15px] text-text-700 leading-none mb-0.5">{app_name}</p>
          <p className="text-xs text-text-600 font-normal leading-none">Owner</p>
        </div>
      </div>
      <hr className="text-text-50" />
      <Button
        type="text"
        className="text-left w-full justify-start! rounded-none!"
        icon={
          <RiLogoutBoxRLine
            className="ml-auto"
            size={20}
            style={{ verticalAlign: 'middle' }}
            color="var(--color-red-400)"
          />
        }
        onClick={logoutUser}
      >
        Logout
      </Button>
    </div>
  );
}
