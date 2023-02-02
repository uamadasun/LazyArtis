const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = function(app){
    app.post("/api/login", UserController.login);
    app.post("/api/register", UserController.register);
    app.get("/api/logout", authenticate, UserController.logout);
    app.get("/api/user/loggedin/:_id", authenticate, UserController.getLoggedInUser);
    app.put('/api/image/:_id', UserController.addImageToArray);
    app.patch('/api/delete/image/:_id/:url', authenticate, UserController.deleteImageFromAllImages)

    
    app.get("/api/users", UserController.getUsers);
    app.get("/api/user/:_id", authenticate, UserController.findOneUser);
    app.delete('/api/user/:_id', UserController.deleteUser);

    // app.post("/api/login", UserController.login);
    // app.post('/api/create/user', UserController.register);
    // app.get('/api/user', authenticate, UserController.index);  //add authenticate back in after route
    // app.get('/api/user/:id', authenticate, UserController.show); //add authenticate back in after route
    // app.put('/api/update/user/:id', authenticate, UserController.update); //add authenticate back in after route
    // app.delete('/api/destroy/user/:id', authenticate, UserController.destroy); //add authenticate back in after route
    // app.get("/api/logout", authenticate, UserController.logout);                    //need to add 'user' to path?  '/api/user/logout?
    // app.get("/api/user/loggedin", authenticate, UserController.getLoggedInUser);
}