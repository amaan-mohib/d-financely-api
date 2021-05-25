const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into currencies (currency,symbol,name,user_id,update_time,create_time) VALUES ?",
    [
      body.map((d) => [
        d.currency,
        d.symbol,
        d.name,
        d.user_id,
        d.updatedAt,
        d.createdAt,
      ]),
    ],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("Currency/ies inserted");
        console.log(result);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select * from currencies where user_id = ? order by update_time asc",
    [user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

router.put("/update", (req, res) => {
  const body = req.body;
  db.query(
    "update currencies set update_time = ? where user_id = ?",
    [body.updatedAt, body.user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const rowID = req.params.id;
  db.query("delete from currencies where id = ?", [rowID], (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      res.send("Record deleted");
    }
  });
});

module.exports = router;
