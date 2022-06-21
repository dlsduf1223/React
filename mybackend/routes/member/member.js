var express = require("express");
var router = express.Router();
const mysql = require("mysql");

//고정 값
const commonUtil = require("../../common/commonUtil");
const commonValue = require("../../common/commonValue");

let db = mysql.createConnection({
  host: "127.0.0.1", //DB의 아이피 주소
  port: "3306",
  user: "project1",
  password: "1234",
  database: "project1",
});

/* GET user liting */
router.get("/", function (req, res, next) {
  db.query("select now() as today", (err, data) => {
    // as today : today로 키값 이름을 변경
    if (err) {
      console.log("error 발생 : " + err);
    } else {
      console.log(data);
    }
    res.json(data);
  });
});

//회원리스트 가져오기
router.get("/memberList", function (req, res, next) {
  var sql = "SELECT * FROM MEMBER";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("error : " + err);
    } else {
      for (var i = 0; i < data.length; i++) {
        var data_temp = data[i];
        console.log("idx :" + data_temp.idx);
        console.log("member_id :" + data_temp.member_id);
        console.log(
          "member_pwd :" + commonUtil.getDecrypt(data_temp.member_pwd)
        );
        console.log("member_nm :" + data_temp.member_nm);
      }
      res.json(data);
    }
  });
});

//회원 등록

router.post("/memberWrite", function (req, res, next) {
  //post는 body, get은 query
  var member_id = req.body.member_id;
  var member_pwd = req.body.member_pwd;
  member_pwd = commonUtil.getEncrypt(member_pwd);
  var member_nm = req.body.member_nm;
  var member_birthday = req.body.member_birthday;
  var member_phone = req.body.member_phone;
  var member_email = req.body.member_email;
  var member_gender = req.body.member_gender;
  var zipcode = req.body.zipcode;
  var jaddress = req.body.jaddress;
  var raddress = req.body.raddress;

  // var sql = "INSERT INTO MEMBER";
  // sql +=
  //   "(member_id, member_pwd, member_nm, member_birthday, member_phone, member_email, member_gender, zipcode, jaddress, raddress, reg_dt, mod_dt)";
  // sql += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),NOW())";

  var sql = "INSERT INTO MEMBER (";
  sql += "member_id,";
  sql += "member_pwd,";
  sql += "member_nm,";
  sql += "member_birthday,";
  sql += "member_phone,";
  sql += "member_email,";
  sql += "member_gender,";
  sql += "zipcode,";
  sql += "jaddress,";
  sql += "raddress,";
  sql += "reg_dt,";
  sql += "mod_dt";
  sql += ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),NOW())"; //위 데이터랑 갯수 맞춰서
  console.log(sql);

  db.query(
    sql,
    [
      member_id,
      member_pwd,
      member_nm,
      member_birthday,
      member_phone,
      member_email,
      member_gender,
      zipcode,
      jaddress,
      raddress,
    ],
    (err, data) => {
      if (err) {
        console.log("error : " + err);
      } else {
        var data_temp = [];
        var result = {
          MSG: "회원 가입 완료",
          CD: 100,
        };

        var json = {
          DATA: data_temp,
          RESULT: result,
        };

        res.json(json);
      }
    }
  );
  // res.send("회원 등록");
});

//회원 정보 보기
router.get("/memberView", function (req, res, next) {
  var idx = req.query.idx;
  var sql = `SELECT * FROM MEMBER WHERE idx=${idx}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("error : " + err);
    } else {
      var data_temp = [];
      var result = {
        MSG: "회원 정보 가져오기 성공",
        CD: 100,
      };

      var json = {
        DATA: data,
        RESULT: result,
      };

      res.json(json);
    }
  });
});

//회원 수정하기

router.post("/memberModify", function (req, res, next) {
  var idx = req.body.idx;
  var member_id = req.body.member_id;
  var member_pwd = req.body.member_pwd;
  member_pwd = commonUtil.getEncrypt(member_pwd);

  var member_nm = req.body.member_nm;
  var member_birthday = req.body.member_birthday;
  var member_phone = req.body.member_phone;
  var member_email = req.body.member_email;
  var member_gender = req.body.member_gender;
  var zipcode = req.body.zipcode;
  var jaddress = req.body.jaddress;
  var raddress = req.body.raddress;

  var sql = "UPDATE MEMBER SET ";
  sql += "member_id = ?, ";
  sql += "member_pwd= ?, ";
  sql += "member_nm = ?, ";
  sql += "member_birthday = ?, ";
  sql += "member_phone = ?, ";
  sql += "member_email = ?, ";
  sql += "member_gender = ?, ";
  sql += "zipcode = ?, ";
  sql += "jaddress = ?, ";
  sql += "raddress = ?, ";
  sql += "mod_dt = NOW() ";
  sql += "WHERE idx = ?";

  db.query(
    sql,
    [
      member_id,
      member_pwd,
      member_nm,
      member_birthday,
      member_phone,
      member_email,
      member_gender,
      zipcode,
      jaddress,
      raddress,
      idx,
    ],
    (err, data) => {
      if (err) {
        console.log("error : " + err);
      } else {
        var result = {
          MSG: "회원 정보가 수정 되었습니다.",
          CD: 100,
        };

        var data_temp = [];

        var json = {
          DATA: data_temp,
          RESULT: result,
        };

        res.json(json);
      }
    }
  );
});

//회원 삭제하기
router.get("/memberDelete", function (req, res, next) {
  var idx = req.query.idx;
  var sql = `DELETE FROM MEMBER WHERE idx = ${idx}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("error : " + err);
    } else {
      var data_temp = [];
      var result = {
        MSG: "회원 삭제 성공",
        CD: 100,
      };

      var json = {
        DATA: data_temp,
        RESULT: result,
      };

      res.json(json);
    }
  });
});

module.exports = router;
