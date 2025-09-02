const app = require("./src/app");
const connectDB = require("./src/db/db");

app.listen(3000,()=>{
    connectDB();
    console.log("Server running on PORT: 3000");
});