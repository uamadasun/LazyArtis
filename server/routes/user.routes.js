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
}