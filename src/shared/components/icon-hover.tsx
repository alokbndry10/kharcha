import { Spin } from 'antd';
import { JSX } from 'react';

type Props = {
  children: JSX.Element;
  onClick?: VoidFunction;
  loading?: boolean;
};

function IconHover(props: Props) {
  const { children, onClick, loading = false } = props;

  return (
    <span
      className="cursor-pointer p-1 hover:bg-primary-50 rounded-lg hover:scale-110 duration-100 transition-all"
      onClick={onClick}
    >
      {loading ? <Spin spinning /> : children}
    </span>
  );
}

export default IconHover;
