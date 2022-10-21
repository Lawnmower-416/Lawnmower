const {AUser} = require("../mod/usermod");
exports.Register = async(leq,les) =>  {
    const auser = new AUser(leq.body);
    await auser.save((err, sub) => {
        if(error) {
            return les.status(422).json({errors:err})
        
       } else {
        const uData = {
        firstName: sub.firstName,
        lastName: sub.lastName,
        email: sub.email,
      }

    }


    }

}

    
