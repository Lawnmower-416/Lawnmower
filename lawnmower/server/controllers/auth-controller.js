const {AUser} = require("../mod/usermod");
exports.Register = async(req,res) =>  {
    const auser = new AUser(req.body);
    await auser.save((err, sub) => {
        if(error) {
            return res.status(422).json({errors:err})
        
       } else {
        const uData = {
        firstName: sub.firstName,
        lastName: sub.lastName,
        email: sub.email,
      }
      return res.status(200).json(
        {
         suc:true,
         message:'The user has successfully signed up',
         uData
        }
        )
        }
    });
    }
exports.UserLogin = (leq,les) => {a}









    }


    }

}

    
