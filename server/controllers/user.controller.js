const {User} = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { collection } = require('../models/user.model');

module.exports.register = (req, res) => {
    User.create(req.body)
    .then(user => {
    

        res
            .cookie(
                "usertoken",
                jwt.sign({ id: user._id }, process.env.SECURE_USER_KEY),
                {
                    httpOnly: true,
                }
            )
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.status(400).json({message: "unable to register user", err}));
    
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
            .then(user => {
                // console.log(user)
                if (user == null) {
                    res.status(400).json({ msg: "invalid login attempt" })
                    res.cookie()
                } else {
                    // console.log("We are about to bcrypt")
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid === true) {
                                // console.log("THis is about to happen", process.env.JWT_SECRET);
                                const userToken = jwt.sign({ _id: user._id }, process.env.SECURE_USER_KEY)
                                        
                                res.cookie("usertoken", userToken, {httpOnly: true}
                                        
                                    )
                                    .json({ user: user });
                                    console.log(user._id);
                            } else {
                                res.status(400).json({ msg: "invalid login attempt" })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({ msg: "invalid login attempt" })
                        })
                }
            })
            .catch(err => res.status(400).json(err.errors));
}


module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
}

module.exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({message: "unable to get all users", err}));
}

module.exports.findOneUser = (req, res) => {
    User.findOne({_id: req.params._id})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "unable to find user", err}));
}

module.exports.updateOne = (req, res) => {
    User.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators:true})
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json({message: "unable to update user", err}));
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params._id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
    res.json({ msg: "usertoken cookie cleared" });
}

module.exports.addImageToArray = (req, res) => {
    User.updateOne({_id:req.params._id}, {$push:{allImages:req.body}})
    .then(result => res.json(result))
    .catch(err => res.status(400).json({message: "unable to add image to array", err}));
}

module.exports.deleteImageFromAllImages = (req, res) => {
    User.findOneAndUpdate({_id:req.params._id}, {$pull: {allImages: {url: req.params.url}}}, {safe:true, multi:false})
    .then(res => console.log(res))
    .catch(err => res.status(400).json({message: "unable to delete image from array", err}))
}

// module.exports.getLoggedInUser = (req, res) => {
//     const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

//         User.findById(decodedJWT.payload._id)
//             .then((user) => res.json(user))
//             .catch((err) => res.json(err));
// }

// //LEARN PLATFORM METHOD
// module.exports.login = async(req, res) => {
//     const user = await User.findOne({ email: req.body.email });

//     if(user === null) {
//         // email not found in users collection
//         return res.sendStatus(400);
//     }

//     // if we made it this far, we found a user with this email address
//     // let's compare the supplied password to the hashed password in the database
//     const correctPassword = await bcrypt.compare(req.body.password, user.password);

//     if(!correctPassword) {
//         // password wasn't a match!
//         return res.sendStatus(400);
//     }

//     // if we made it this far, the password was correct
//     const userToken = jwt.sign({
//         id: user._id
//     }, process.env.SECURE_USER_KEY);

//     // note that the response object allows chained calls to cookie and json
//     res
//         .cookie("usertoken", userToken, secret, {
//             httpOnly: true
//         })
//         .json({ msg: "success!" });
// }

