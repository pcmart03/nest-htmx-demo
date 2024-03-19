import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { appConfig } from './app.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Route for the main view. Renders the index template
   * */
  @Get()
  @Render('index')
  root(): unknown {
    return { title: appConfig.title };
  }

  @Get('/lazy')
  @Render('toc')
  lazy() {}
}
