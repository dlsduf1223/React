var express = require("express");
var router = express.Router();
const mysql = require("mysql");
let db = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "project1",
  password: "1234",
  database: "project1",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("게시판 라우터");
});

//게시글 리스트 보기
router.get("/boardList", function (req, res, next) {
  var idx = req.query.idx;
  var sql = `SELECT * FROM BOARD ORDER BY reg_dt DESC`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("error : " + err);
    } else {
      var json = {
        code: 200,
      };
      res.json(json);
    }
  });
});

//게시글 등록하기
router.post("/boardWrite", function (req, res, next) {
  //board parameter
  var write_nm = req.body.write_nm;
  var write_email = req.body.write_email;
  var board_title = req.body.board_title;
  var board_contents = req.body.board_contents;
  var board_visit = 1;

  var sql = "INSERT INTO BOARD (";
  sql += "write_nm,";
  sql += "write_email,";
  sql += "board_title,";
  sql += "board_contents,";
  sql += "board_visit,";
  sql += "board_reg_dt,";
  sql += "board_mod_dt,";
  sql += ") VALUES (";
  sql += "?,?,?,?,?, ";
  sql += "NOW(), NOW() )";

  console.log(sql);

  db.query(
    sql,
    [write_nm, write_email, board_title, board_contents, board_visit],
    (err, data) => {
      if (err) {
        console.log("error : " + err);
      } else {
        var json = {
          code: 200,
        };
        res.json(json);
      }
    }
  );
});

// 게시글 보기
router.get("/boardView", function (req, res, next) {
  var idx = req.query.idx;
  var sql = `SELECT * FROM BOARD WHERE idx=${idx}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("error : " + err);
    } else {
      var json = {
        code: 200,
      };
      res.json(json);
    }
  });
});

//게시글 수정하기
router.get("/boardModify", function (req, res, next) {
  var idx = req.body.idx;
  var write_nm = req.body.write_nm;
  var write_email = req.body.write_email;
  var board_title = req.body.board_title;
  var board_contents = req.body.board_contents;
  var board_visit = 1;

  var sql = "UPDATE SET BOARD ";
  sql += "write_nm = ?,";
  sql += "write_email = ?,";
  sql += "board_title = ?,";
  sql += "board_contents = ?,";
  sql += "board_mod_dt = NOW() ";
  sql += "WHERE idx=? ";

  console.log(sql);

  db.query(
    sql,
    [write_nm, write_email, board_title, board_contents, idx],
    (err, data) => {
      if (err) {
        console.log("error : " + err);
      } else {
        var json = {
          code: 200,
        };
        res.json(json);
      }
    }
  );
});

//게시글 삭제하기
router.get("/boardDelete", function (req, res, next) {
  var idx = req.query.idx;
  var sql = `DELETE FROM WHERE idx=${idx}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("error : " + err);
    } else {
      var json = {
        code: 200,
      };
      res.json(json);
    }
  });
});

module.exports = router;
