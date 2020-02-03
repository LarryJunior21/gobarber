import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {

  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        provider: Sequelize.BOOLEAN,
      },
      {
        //VARIAVEL PARA TRADUÇÃO DE CODIGO JAVASCRIPT PARA SQL
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    //FAZ A ENCRIPTAÇÃO DA SENHA E VERIFICA SE AS DUAS SÃO IGUAIS
    //POIS NO BANCO É GUARDADA APENAS A SENHA GERADA COM O HASH
    return bcrypt.compare( password, this.password_hash );
  }
}

export default User;
