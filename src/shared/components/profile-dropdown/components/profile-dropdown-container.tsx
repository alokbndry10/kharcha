import { Avatar, Popover } from 'antd';
import '../profile-dropdown.style.css';
import { ProfileContent } from './profile-content';
import { RiArrowDownLine } from 'react-icons/ri';
import { generateAvatar } from '@shared/utils/helpers';
import { app_name } from '@shared/constants/app.constants';

export function ProfileDropdown() {
  return (
    <div>
      <Popover
        content={<ProfileContent />}
        destroyOnHidden
        trigger="click"
        placement="bottomLeft"
        arrow={false}
        className="p-0"
        rootClassName="logout__popover"
      >
        <div className="cursor-pointer relative flex">
          <Avatar size={38} src={generateAvatar(app_name)} className="border! border-gray-300!">
            User
          </Avatar>
          <RiArrowDownLine className="absolute top-[22px] right-0" />
        </div>
      </Popover>
    </div>
  );
}
