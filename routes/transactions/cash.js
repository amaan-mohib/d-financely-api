const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/add", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into transactions_cash (amount,description,updatedAt,balance,user_id) VALUES ?",
    [
      body.map((d) => [
        d.amount,
        d.description,
        d.updatedAt,
        d.balance,
        d.user_id,
      ]),
    ],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("Transaction/s inserted");
        console.log(result);
      }
    }
  );
});

router.get("/all/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select * from transactions_cash where user_id = ?",
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

router.get("/:userid/:limit", (req, res) => {
  const user_id = req.params.userid;
  const limit = Number(req.params.limit);
  db.query(
    "select * from transactions_cash where user_id = ? ORDER BY updatedAt DESC LIMIT ?",
    [user_id, limit],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent balance");
        res.send(result);
      }
    }
  );
});

router.get("/all/:userid/:limit/:offset", (req, res) => {
  const user_id = req.params.userid;
  const limit = Number(req.params.limit);
  const offset = Number(req.params.offset);
  db.query(
    "select * from transactions_cash where user_id = ? ORDER BY updatedAt DESC LIMIT ? OFFSET ?",
    [user_id, limit, offset],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent balance");
        res.send(result);
      }
    }
  );
});

router.get("/:userid/:interval", (req, res) => {
  const user_id = req.params.userid;
  const interval = Number(req.params.interval);
  const from = new Date();
  const to = new Date();
  const gap = to.getDate() - interval;
  to.setDate(gap);
  db.query(
    "select * from transactions_cash where user_id = ? and updatedAt between ? and ? order by updatedAt desc",
    [user_id, from.toISOString().substr(0, 10), to.toISOString().substr(0, 10)],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent balance");
        res.send(result);
      }
    }
  );
});

router.get("/all/count/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select count(*) from transactions_cash where user_id = ?",
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
  const d = req.body;
  db.query(
    "update transactions_cash set amount = ?,description = ?,updatedAt = ?,balance =? where user_id = ?",
    [d.amount, d.description, d.updatedAt, d.balance, d.user_id],
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
  const id = req.params.id;
  db.query(
    "delete from transactions_cash where id = ?",
    [id],
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
