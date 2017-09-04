import Sequelize from 'sequelize';
import Faker from 'faker';
import _ from 'lodash';

const connection = new Sequelize('naganoblog', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 9898,

  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },

});

const User = connection.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dropbox: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

const Link = connection.define('link', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  
});




// Relations
User.hasMany(Link);
Link.belongsTo(User);

connection.sync();

export default connection;
