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
const APP_TITLE = "Demo";

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
    return res.render(type, { name });
  }

  // --- nested routes ----

  /**
   * One of the downsides of htmx is nested routes can be more complicated.
   * If the user refreshes the page, you need to return the entire view,
   * not just the partial the nested route loads
   * */
  @Get('/route1')
  route_one(@Req() req: Request, @Res() res: Response) {
    const isNotAJAX = !req.headers['hx-request'];

    let requestOptions: { message: string, showRoute?: boolean, title?: string } = {
      message: 'hello route 1',
    };

    // index contains the entire view. route_1 is a partial of the nested content.
    let templateName = 'route_1';
    if (isNotAJAX) {
      templateName = 'index';
      requestOptions = { ...requestOptions, title: APP_TITLE, showRoute: true }
    }
    // Index has conditional that will show the route_1 content if showRoute is true.
    return res.render(templateName, requestOptions);
  }

  // TODO: add refresh fallback
  @Get('/route2')
  @Render('route_2')
  route_two(): { message: string } {
    return { message: 'hello route 2' };
  }
}
