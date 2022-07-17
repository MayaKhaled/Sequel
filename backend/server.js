const express =require("express");
const app=express();
const connectDB = require('./db');
const userRouter =require('./routes/userRoutes')
const cors =require("cors") ;

connectDB();
app.use(cors());
app.use(express.json())

app.use("/api/user", userRouter);



const PORT = process.env.PORT ||2000 ;

app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`));

