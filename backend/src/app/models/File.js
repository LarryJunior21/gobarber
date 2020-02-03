import { Model, Sequelize } from 'sequelize';

class File extends Model {

  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
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
