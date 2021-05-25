const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
const acc = require("./routes/accounts");
const budget = require("./routes/budget");
const currencies = require("./routes/currencies");
const cash = require("./routes/transactions/cash");
const banks = require("./routes/transactions/banks");
app.use("/accounts", acc);
app.use("/budget", budget);
app.use("/cash", cash);
app.use("/banks", banks);
app.use("/currencies", currencies);

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
