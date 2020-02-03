import { Model, Sequelize } from 'sequelize';

class File extends Model {

  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`
          }
        }
      },
      {
        //VARIAVEL PARA TRADUÇÃO DE CODIGO JAVASCRIPT PARA SQL
        sequelize,
      }
    );

    return this;
  }
}

export default File;
