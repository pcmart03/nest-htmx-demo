import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views', 'layouts'));
  app.setViewEngine('hbs');

  registerPartials(path.join(__dirname, '..', 'views', 'partials'));

  await app.listen(3000);
}

function registerPartials(dirname: string): void {
  fs.readdirSync(dirname).forEach((filename) => {
    if (filename.endsWith('.hbs')) {
      const name = path.parse(filename).name;
      hbs.registerPartial(
        name,
        fs.readFileSync(path.join(dirname, filename), 'utf-8'),
      );
    }
  });
}

bootstrap();
