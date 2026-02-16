import clsx from 'clsx';
import { ReactNode, useId, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * This Component calculates
 * the total top above its position
 * and takes full height - 20 for bottom padding
 * and is scrollable
 */
interface Props {
  children: ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  bottomMargin?: number;
}
export function ScrollableDiv(props: Props) {
  const { pathname } = useLocation();
  const uniqueId = useId();
  const { children, className = '', bottomMargin = 0 } = props;
  const [topPosition, setTopPosition] = useState<number>(0);
  const thisDiv = document.getElementById('scrollable-div-' + uniqueId) as HTMLElement;
  const { top } = thisDiv?.getBoundingClientRect() || {};

  useLayoutEffect(() => {
    setTopPosition(top + bottomMargin);
  }, [uniqueId, top]);

  useLayoutEffect(
    function resetScrollOnPageChange() {
      // because conversations reset on client change
      if (pathname.includes('conversations')) return;

      const thisDiv = document.getElementById('scrollable-div-' + uniqueId) as HTMLElement;
      thisDiv?.scrollTo(0, 0);
    },
    [pathname]
  );

  return (
    <div
      id={'scrollable-div-' + uniqueId}
      className={clsx('overflow-auto', className)}
      style={{
        height: `calc(100vh - ${topPosition}px)`,
      }}
    >
      {children}
    </div>
  );
}
