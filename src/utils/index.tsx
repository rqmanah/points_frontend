export function getErrors(data: { [key: string]: string[] }) {
  return Object.keys(data).map((field: string) => {
    return `${data?.[field]?.[0]} `;
  });
}

export const matchRoute = (pathname: string, routes: string[]) => {
  return routes.some((route: string) => {
    const routeRegex = new RegExp(
      `^${route.replace(/:[^\s/]+/g, "([\\w-]+)")}$`
    );
    return routeRegex.test(pathname);
  });
};
