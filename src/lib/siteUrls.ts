export const normalizeSitePath = (path = '') => {
  if (!path || path === '/') {
    return '/';
  }

  return `/${path.replace(/^\/+|\/+$/g, '')}/`;
};

export const toAbsoluteSiteUrl = (baseUrl: string, path = '') =>
  `${baseUrl.replace(/\/+$/, '')}${normalizeSitePath(path)}`;
