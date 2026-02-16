import { app_name } from '@shared/constants/app.constants';
import { generateAvatar } from '@shared/utils/helpers';
import { Avatar } from 'antd';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export function SidebarHeader({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="px-4 h-16 border border-x-0 border-gray-500 flex items-center justify-between">
      <section className={clsx('flex items-center gap-2 relative transition-all duration-500', collapsed && 'pl-1')}>
        <div className="border border-gray-800 rounded-full relative cursor-pointer" onClick={() => () => {}}>
          <Avatar size={36} src={generateAvatar(app_name)} />
        </div>

        <span className={clsx(collapsed && 'pl-4 opacity-0', 'min-w-[200px] transition-all duration-500')}>
          <p className="text-base font-medium">{app_name}</p>
          <small
            className="text-xs font-medium cursor-pointer"
            onClick={() => navigate('/settings/wallet?tab=Overview')}
          >
            0.00
          </small>
        </span>
      </section>
    </div>
  );
}
