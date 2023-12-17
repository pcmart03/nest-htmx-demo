import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
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
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Route for the main view. Renders the index template
   * */
  @Get()
  @Render('index')
  root(): unknown {
    return { title: 'Demo' };
  }

  /**
   * The contacts template is lazy loaded into the index view using htmx.
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

  @Get('/api')
  apiResponse(): { message: string } {
    return { message: 'hello world' };
  }
}
