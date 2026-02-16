import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import './app-tabs.style.css';

export function AppTabs(props: TabsProps) {
  return <Tabs {...props} className="custom-ant-tabs" indicator={{ size: () => 20, align: 'start' }} />;
}
