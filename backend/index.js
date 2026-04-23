import 'dotenv/config';
import express from "express";
import connectDB from "./utils/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from  "./routes/user.route.js"
import companyRoute from  "./routes/company.route.js"
import jobRoute from  "./routes/jobs.route.js"
import applicationRoute from  "./routes/applications.route.js"


import morgan from "morgan";
 const app = express();
app.use(morgan('dev'));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
