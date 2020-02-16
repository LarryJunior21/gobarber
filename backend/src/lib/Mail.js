import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const {
      host, port, secure, auth,
    } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  /**
   * USA O EXPRESS HANDLEBAR PARA CONFIGURAR OS EMAILS
   * yarn add express-handlebar
   * yarn add nodemailer-express-handlebar
   */
  configureTemplates() {
    // PEGA O CAMINHO DOS LAYOUTS
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    // O EXPRESS UTILIZA ESSE 'compile' COMO VARIAVEL PARA FORMATAR
    this.transporter.use('compile', nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        // NOME DA EXTENSÃO
        extname: '.hbs',
      }),
      viewPath,
      // NOME DA EXTENSÃO
      extName: '.hbs',
    }));
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
