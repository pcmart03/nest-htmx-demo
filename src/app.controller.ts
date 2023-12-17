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

  @Get()
  @Render('index')
  root(): unknown {
    return { title: 'Demo' };
  }

  @Get('/contact')
  @Render('contact')
  contact(): ContactPageData {
    return {
      title: 'Contact Us',
      contacts: [{ name: 'August Martin', email: 'augie@contoso.com' }],
    };
  }

  @Post('/conditional')
  conditionalRendering(
    @Body() { name, type }: ConditionalRequestBody,
    @Res() res: Response,
  ) {
    return res.render(type, { name });
  }
}
