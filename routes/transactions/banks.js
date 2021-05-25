const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/add", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into transactions (account,month,openingBalance,closingBalance,debit,credit,user_id,account_id) VALUES ?",
    [
      body.map((d) => [
        d.account,
        d.month,
        d.openingBalance,
        d.closingBalance,
        d.debit,
        d.credit,
        d.user_id,
        d.account_id,
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

router.get("/all/:id/:userid", (req, res) => {
  const user_id = req.params.userid;
  const account = req.params.id;
  db.query(
    "select * from transactions where account_id = ? and user_id = ?",
    [account, user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

router.get("/:id/:userid/", (req, res) => {
  const user_id = req.params.userid;
  const account = req.params.id;
  const interval = 365;
  const from = new Date();
  const to = new Date();
  const gap = to.getDate() - interval;
  to.setDate(gap);
  db.query(
    "select * from transactions where (account_id = ? and user_id = ?) and month between ? and ? order by month desc",
    [
      account,
      user_id,
      to.toISOString().substr(0, 10),
      from.toISOString().substr(0, 10),
    ],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent balance");
        res.send(result);
      }
    }
  );
});

router.get("/all/count/:id/:userid", (req, res) => {
  const user_id = req.params.userid;
  const account = req.params.id;
  db.query(
    "select count(*) from transactions where account_id = ? and user_id = ?",
    [account, user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent count");
        res.send(result);
      }
    }
  );
});

router.get("/:id/:userid/:limit", (req, res) => {
  const user_id = req.params.userid;
  const account = req.params.id;
  const limit = Number(req.params.limit);
  db.query(
    "select * from transactions where account_id = ? and user_id = ? ORDER BY month DESC LIMIT ?",
    [account, user_id, limit],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent balance");
        res.send(result);
      }
    }
  );
});

router.get("/:id/:userid/:limit/:offset", (req, res) => {
  const user_id = req.params.userid;
  const account = req.params.id;
  const limit = Number(req.params.limit);
  const offset = Number(req.params.offset);
  db.query(
    "select * from transactions where account_id = ? and user_id = ? ORDER BY month DESC LIMIT ? OFFSET ?",
    [account, user_id, limit, offset],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent balance");
        res.send(result);
      }
    }
  );
});

router.put("/update", (req, res) => {
  const d = req.body;
  db.query(
    "update transactions_cash set month = ?,openingBalance = ?,closingBalance = ?,debit = ?,credit = ? where account = ? and user_id = ?",
    [
      d.month,
      d.openingBalance,
      d.closingBalance,
      d.debit,
      d.credit,
      d.account,
      d.user_id,
    ],
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
  db.query("delete from transactions where id = ?", [id], (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      res.send("Record deleted");
    }
  });
});

module.exports = router;
