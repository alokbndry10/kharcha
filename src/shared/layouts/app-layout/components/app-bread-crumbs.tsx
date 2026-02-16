import { Breadcrumb } from 'antd';
import { Breadcrumb as IBreadcrumb, SubMenuRoute } from '../app-bread-crumb.types';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { appContentSpace } from '@shared/constants/app.constants';
import { useScreenSize } from '@shared/hooks/use-screen';
import { getRootPath, subMenuRoutes } from '../constants';
import { RiArrowRightSLine } from 'react-icons/ri';

export function AppBreadcrumbs({ breadcrumbs }: { breadcrumbs: IBreadcrumb[] | null }) {
  const { pathname } = useLocation();
  const params = useParams();
  const { search } = useLocation();
  const { isMobile } = useScreenSize();
  const rootPathname = getRootPath(pathname) as SubMenuRoute;
  const [searchParams] = useSearchParams();
  if (!breadcrumbs) return null;

  function parseTitle(title: string) {
    if (title.includes(':')) {
      // take dynamic name from search params
      const queryName = title.split(':')[1];
      return searchParams.get(queryName);
    }

    return title;
  }

  // convert dynamic routes
  // settings/:id -> settings/1
  function parseBreadcrumb(link: string) {
    const pathArr = link.split('/');
    const parsedBreadcrumb = pathArr.reduce((acc: string, curr: string) => {
      if (curr.includes(':')) {
        const queryName = curr.split(':')[1];
        return acc.concat(params?.[queryName] + '');
      } else {
        return acc.concat(curr + '/');
      }
    }, '');

    return parsedBreadcrumb;
  }

  return (
    <div className={clsx(appContentSpace, 'py-3 [&_li]:h-4.5')}>
      <Breadcrumb
        separator={<RiArrowRightSLine className="size-4 text-text-600 mt-0.5" />}
        items={breadcrumbs.map((bc) => ({
          title: renderTitle(bc),
          className: clsx(
            'text-text-400 text-sm leading-4.5! inline-block',
            isMobile ? '-translate-y-1' : '-translate-y-0.5'
          ),
        }))}
      />
    </div>
  );

  function renderTitle(breadcrumb: IBreadcrumb) {
    const titleMatchToPathname = breadcrumb.title.toLowerCase() === rootPathname;
    const isSubmenu = subMenuRoutes.includes(rootPathname);
    const subMenuParent = titleMatchToPathname && isSubmenu;
    const parsedTitle = parseTitle(breadcrumb.title);

    if (breadcrumb.link || (isMobile && subMenuParent)) {
      return (
        <Link
          className="text-primary-600! h-4.5!"
          to={{
            pathname: breadcrumb.link ? parseBreadcrumb(breadcrumb.link) : '/' + rootPathname,
            search,
          }}
        >
          {parsedTitle}
        </Link>
      );
    }

    if (subMenuParent) return <span className="text-text-600">{parsedTitle}</span>;
    return parsedTitle;
  }
}
