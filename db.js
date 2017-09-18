import Sequelize from 'sequelize';
import Faker from 'faker';
import _ from 'lodash';
const config = require('./config');

const connection = new Sequelize(
  config.db.dbname,
  config.db.username,
  config.db.password,
  {
    logging: false,    
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,

    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  }
);

const User = connection.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
    unique: true,    
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
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,    
  },
  isProtected: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: true,
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
