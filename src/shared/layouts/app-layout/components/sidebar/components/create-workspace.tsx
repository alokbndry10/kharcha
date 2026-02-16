import { Divider, Tooltip } from 'antd';
import { RiAddCircleLine } from 'react-icons/ri';

export function CreateWorkspace() {
  return (
    <div className="flex flex-col items-start cursor-pointer pb-3 bg-white rounded-b-2xl border-x-2 border-b-2 border-slate-100 shadow-sm">
      <Divider className="m-0! px-0!" />
      <Tooltip title="This feature is not available yet" placement="bottom">
        <div className="flex gap-2 pt-2 ml-6">
          <RiAddCircleLine className="text-primary self-center" size={20} />
          <p className="font-normal">Create new workspace</p>
        </div>
      </Tooltip>
    </div>
  );
}
