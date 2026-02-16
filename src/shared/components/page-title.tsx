import { Avatar, Skeleton } from 'antd';
import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  avatarSrc?: string;
  endElement?: ReactElement;
  loading?: boolean;
}

export function PageTitle({ loading, title, subTitle, avatarSrc, endElement }: Props) {
  const hasAvatar = typeof avatarSrc !== 'undefined';

  if (loading) {
    return (
      <Skeleton active avatar={hasAvatar} paragraph={{ rows: 1, style: { marginTop: '8px' } }} className="!w-52" />
    );
  }

  return (
    <div className="flex flex-wrap justify-between items-center gap-y-4">
      <div className="flex gap-2 items-center">
        <span className={avatarSrc ? '' : 'hidden'}>
          <Avatar size={40} src={avatarSrc} children={<>{avatarSrc}</>} />
        </span>
        <section>
          {typeof title === 'string' ? (
            <h1 className="font-medium text-lg lg:text-xl leading-6.25 text-text-900">{title}</h1>
          ) : (
            title
          )}
          {typeof subTitle === 'string' ? (
            <p className={clsx(subTitle ? '' : 'hidden', 'font-medium text-sm leading-3.75 text-text-500')}>
              {subTitle}
            </p>
          ) : (
            subTitle
          )}
        </section>
      </div>
      {endElement}
    </div>
  );
}
