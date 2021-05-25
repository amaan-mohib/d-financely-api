const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into budget (amount,user_id) VALUES ?",
    [body.map((d) => [d.amount, d.user_id])],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("Budget inserted");
        console.log(result);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select * from budget where user_id = ?",
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
    "update budget set amount = ? where user_id = ?",
    [body.amount, body.user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.delete("/delete", (req, res) => {
  const body = req.body;
  db.query(
    "delete from budget where user_id = ?",
    [body.user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record deleted");
      }
    }
  );
});

module.exports = router;
