import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

type Contact = {
  name: string;
  email: string;
};

type ConditionalRequestBody = {
  name: string;
  type: 'owner' | 'student';
};

type ContactPageData = {
  title: string;
  contacts: Contact[];
};

type RoutedOptions = {
  message: string;
  showRoute?: boolean;
  title?: string;
  routePartial?: string;
};

type RouteInfo = {
  req: Request;
  message: string;
  routeTemplate: string;
  partialTemplate: string;
  parentTemplate: string;
};
const APP_TITLE = 'Demo';

const getRouteTemplateAndOptions = ({
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

  // index contains the entire view. route_1 is a partial of the nested content.
  let templateName = routeTemplate;
  if (isNotAJAX) {
    templateName = parentTemplate;
    requestOptions = {
      ...requestOptions,
      title: APP_TITLE,
      showRoute: true,
      routePartial: partialTemplate,
    };
  }
  return [templateName, requestOptions];
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Route for the main view. Renders the index template
   * */
  @Get()
  @Render('index')
  root(): unknown {
    return { title: APP_TITLE };
  }

  /**
   * The contacts template is lazy loaded into the index view using htmx's onload trigger.
   * Although the template lives in the view folder, it can be considered a partial.
   *
   * */
  @Get('/contact')
  @Render('contact')
  contact(): ContactPageData {
    return {
      title: 'Contact Us',
      contacts: [{ name: 'August Martin', email: 'augie@contoso.com' }],
    };
  }

  /**
   * Here we select the template to render based on the type property in the post body.
   *
   * */
  @Post('/conditional')
  conditionalRendering(
    @Body() { name, type }: ConditionalRequestBody,
    @Res() res: Response,
  ) {
    res.render(type, { name });
  }

  // --- nested routes ----

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
      parentTemplate: 'index',
    };
    res.render(...getRouteTemplateAndOptions(routeInfo));
  }

  // TODO: add refresh fallback
  @Get('/route2')
  route_two(@Req() req: Request, @Res() res: Response) {
    const routeInfo: RouteInfo = {
      req,
      message: 'Hello, route 2',
      routeTemplate: 'route_2',
      partialTemplate: 'route_2_content',
      parentTemplate: 'index',
    };
    res.render(...getRouteTemplateAndOptions(routeInfo));
  }
}
