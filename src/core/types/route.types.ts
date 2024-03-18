export type RoutedOptions = {
  message: string;
  showRoute?: boolean;
  title?: string;
  routePartial?: string;
};

export type RouteInfo = {
  req: Request;
  message: string;
  routeTemplate: string;
  partialTemplate: string;
  parentTemplate: string;
};
