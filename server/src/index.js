import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/*Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/*Mongoose Setup*/
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);

      /* Only Add Data One Time */
      //User.insertMany(dataUser)
      // insertData(Product, dataProduct);
      // insertData(ProductStat, dataProductStat);
      // Transaction.insertMany(dataTransaction);
      // OverallStat.insertMany(dataOverallStat);
      // insertData(OverallStat, dataOverallStat);
      // AffiliateStat.insertMany(dataAffiliateStat);
    });
  })
  .catch((error) => {
    console.log(` error: ${error} connection failed: ${error.message}`);
  });

// async function insertData(model, data) {
//   try {
//     // Generate unique _id values for the documents
//     const newData = data.map((item) => ({
//       ...item,
//       _id: new mongoose.Types.ObjectId(),
//     }));
//     await model.insertMany(newData);
//     console.log(`Data inserted into ${model.modelName} successfully.`);
//   } catch (error) {
//     console.error(`Error inserting data into ${model.modelName}:`, error);
//   }
// }
