export const subMenuRoutes = ['settings', 'analytics', 'conversations', 'channels'] as const;
export const getRootPath = (pathname: string) => pathname.split('/')[1];
