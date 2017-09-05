import Db from '../db';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');
const _ = require('lodash');

export const reigister = async (parent, args, SECRET) => {
    const user = args;
    const username = user.username
    user.password = await bcrypt.hash(user.password, 12);

    const checkuser = await Db.models.user.findOne({ where: { username } });
    if (checkuser) {
      throw new Error('User already registered');
    }

    const userFinal = await Db.models.user.create(user);
    
    const token = jwt.sign(
      {
        user: _.pick(userFinal, ['id', 'username']),
      },
      SECRET,
      {
        expiresIn: '1y',
      },
    );

    //console.log(token);
    let objToken = {logintoken: token}
    return objToken;
}


export default reigister;
