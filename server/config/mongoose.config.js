const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));











// const mongoose = require("mongoose");

// module.exports = db_name => {
//     mongoose
//         .connect(`mongodb://localhost/${db_name}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false
//         })
//         .then(() => console.log(`Successfully connected to "${db_name}" database`))
//         .catch(err => console.log("mongoose connection failed: ", err));
// };