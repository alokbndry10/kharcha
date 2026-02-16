import { RiDashboardLine } from 'react-icons/ri';
import { SidebarItemType } from './sidebar.types';
import { MdLocalGroceryStore } from 'react-icons/md';
import { CiCircleList } from 'react-icons/ci';
import { GoPlus } from 'react-icons/go';
import { ImUserTie } from 'react-icons/im';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaBalanceScaleLeft } from 'react-icons/fa';

export const items: SidebarItemType[] = [
  {
    key: 'informatics',
    type: 'group',
    label: 'INFORMATICS',
  },
  {
    key: '/dashboard',
    icon: <RiDashboardLine className="size-5" />,
    label: 'Dashboard',
  },
  {
    key: '/dashboard-divider',
    type: 'divider',
  },
  {
    key: 'reports',
    type: 'group',
    label: 'EXPENSES',
  },
  {
    key: '/expenses',
    icon: <RiMoneyDollarCircleLine className="size-5" />,
    label: 'Expenses',
    children: [
      {
        key: '/expenses/add',
        icon: <GoPlus className="ml-4" />,
        label: 'Add',
      },
      {
        key: '/expenses/',
        icon: <CiCircleList className="ml-4" />,
        label: 'List',
      },
    ],
  },
  {
    key: '/data-entry-divider',
    type: 'group',
    label: 'DATA ITERATION',
  },
  {
    key: '/items',
    icon: <MdLocalGroceryStore className="size-5" />,
    label: 'Items',
    children: [
      {
        key: '/items/add',
        icon: <GoPlus className="ml-4" />,
        label: 'Add',
      },
      {
        key: '/items/',
        icon: <CiCircleList className="ml-4" />,
        label: 'List',
      },
    ],
  },
  {
    key: '/vendors',
    icon: <ImUserTie className="size-5" />,
    label: 'Vendors',
    children: [
      {
        key: '/vendors/add',
        icon: <GoPlus className="ml-4" />,
        label: 'Add',
      },
      {
        key: '/vendors/',
        icon: <CiCircleList className="ml-4" />,
        label: 'List',
      },
    ],
  },
  {
    key: '/units',
    icon: <FaBalanceScaleLeft className="size-5" />,
    label: 'Units',
    children: [
      {
        key: '/units/add',
        icon: <GoPlus className="ml-4" />,
        label: 'Add',
      },
      {
        key: '/units/',
        icon: <CiCircleList className="ml-4" />,
        label: 'List',
      },
    ],
  },
];
