import Db from '../db';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
const _ = require('lodash');


export const login = async (parent, username, password, SECRET) => {
    const user = await Db.models.user.findOne({ where: { username } });
    if (!user) {
      throw new Error('Not user with that email');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign(
      {
        user: _.pick(user, ['id', 'username']),
      },
      SECRET,
      {
        expiresIn: '1y',
      },
    );

    //console.log(token);
    let objToken = {logintoken: token}
    return objToken;
    //aasdasd

}


export default login;
