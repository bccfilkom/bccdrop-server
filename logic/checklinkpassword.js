import Db from '../db';
const bcrypt = require('bcrypt');


export const checklinkpassword = async (parent, args) => {
    const password = args.password;
    const linkID = args.linkId;
    const link = await Db.models.link.findOne({
        where: {
          id: linkID,
        },
    });

    if (!link) {
      throw new Error('There is no link with that id');
    }

    const valid = await bcrypt.compare(password, link.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    const returnMsg = {msg: "Password Verified"}
    return returnMsg;
   

}


export default checklinkpassword;
