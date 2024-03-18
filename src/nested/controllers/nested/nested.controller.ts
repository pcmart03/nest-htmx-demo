import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { RouteInfo } from '@src/core/types/route.types';
import { getRouteTemplateAndOptions } from '@utils/nested-route.utils';
import { appConfig } from '@src/app.config';

@Controller('nested')
export class NestedController {
  @Get()
  @Render('nested-index')
  index() {
    return { title: appConfig.title };
  }
  /**
   * One of the downsides of htmx is nested routes can be more complicated.
   * If the user refreshes the page, you need to return the entire view,
   * not just the partial the nested route loads
   * */
  @Get('/route1')
  route_one(@Req() req: Request, @Res() res: Response) {
    const routeInfo: RouteInfo = {
      req,
      message: 'Hello, route 1',
      routeTemplate: 'route_1',
      partialTemplate: 'route_1_content',
      parentTemplate: 'nested-index',
    };
    res.render(...getRouteTemplateAndOptions(routeInfo));
  }

  @Get('/route2')
  route_two(@Req() req: Request, @Res() res: Response) {
    const routeInfo: RouteInfo = {
      req,
      message: 'Hello, route 2',
      routeTemplate: 'route_2',
      partialTemplate: 'route_2_content',
      parentTemplate: 'nested-index',
    };
    res.render(...getRouteTemplateAndOptions(routeInfo));
  }
}
