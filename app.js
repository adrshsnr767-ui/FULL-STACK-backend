require("dotenv").config();
const express = require("express");
const router = require("./router/auth-router");
const databaseConnection = require("./databse");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/service-router");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET , POST , PUT , PATCH , DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", router);
app.use("/", contactRouter);
app.use("/", serviceRouter);
databaseConnection().then(() => {
  app.listen(port, () => {
    console.log(`server statring at ${port}`);
  });
});
