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
      return les.status(200).json(
        {
         suc:true,
         message:'The user has successfully signed up',
         uData
        }
        )
        }
    });
    }
exports.UserLogin = (leq,les) => {}









    }


    }

}

    
