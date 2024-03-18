import { RoutedOptions, RouteInfo } from '../types/route.types';
import { appConfig } from '@src/app.config';

export const getRouteTemplateAndOptions = ({
  req,
  message,
  routeTemplate,
  partialTemplate,
  parentTemplate,
}: RouteInfo): [string, RoutedOptions] => {
  const isNotAJAX = !req.headers['hx-request'];

  let requestOptions: RoutedOptions = {
    message,
  };

  let templateName = routeTemplate;
  if (isNotAJAX) {
    templateName = parentTemplate;
    requestOptions = {
      ...requestOptions,
      title: appConfig.title,
      showRoute: true,
      routePartial: partialTemplate,
    };
  }
  return [templateName, requestOptions];
};
