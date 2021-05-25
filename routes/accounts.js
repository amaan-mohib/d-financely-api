const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into accounts (accountName,balance,user_id,updatedAt) VALUES ?",
    [body.map((d) => [d.accountName, d.balance, d.user_id, d.updatedAt])],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("Account/s inserted");
        console.log(result);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select * from accounts where user_id = ?",
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
    "update accounts set balance = ?,updatedAt = ? where (accountName = ? and user_id = ?)",
    [body.balance, body.updatedAt, body.accountName, body.user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.put("/updateInitialBal", (req, res) => {
  const body = req.body;
  db.query(
    "update accounts set initialBalance = ?,updatedAt = ? where (accountName = ? and user_id = ?)",
    [body.initialBal, body.updatedAt, body.accountName, body.user_id],
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
    "delete from accounts where (accountName = ? and user_id = ?)",
    [body.accountName, body.user_id],
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
