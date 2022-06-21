var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const app = require("../../app");
const commonUtil = require("../../common/commonUtil");
const commonValue = require("../../common/commonValue");

let db = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "project1",
  password: "1234",
  database: "project1",
});
//Promise함수
/***********************************/
function Login1(member_id) {
  return new Promise((resolve, reject) => {
    ///순서대로 하기 위해 promise를 씀
    //회원이 존재하는지
    var sql = `SELECT COUNT(*) AS COUNTER FROM MEMBER WHERE member_id='${member_id}' `;
    var check_id = 0;

    //회원아이디 존재할시
    db.query(sql, (err, data) => {
      if (err) {
        console.log("error : " + err);
        reject(err);
      } else {
        var counter = data[0].COUNTER;
        if (counter > 0) {
          check_id = 1;
        }
        resolve(check_id);
      }
    });
  });
}

// 아이디와 패스워드가 일치할때

function Login2(member_id, member_pwd) {
  return new Promise((resolve, reject) => {
    var sql = `SELECT COUNT(*) AS COUNTER FROM MEMBER WHERE member_id='${member_id}' AND member_pwd = '${member_pwd}' `;
    var check_pwd = 0;

    //회원아이디 존재할시
    db.query(sql, (err, data) => {
      if (err) {
        console.log("error : " + err);
        reject(err);
      } else {
        var counter = data[0].COUNTER;
        if (counter > 0) {
          check_pwd = 1;
        }
        resolve(check_pwd);
      }
    });
  });
}

//      -----             //

function MemberView(member_id, member_pwd) {
  return new Promise((resolve, reject) => {
    ///순서대로 하기 위해 promise를 씀
    //회원이 존재하는지
    var sql = `SELECT * FROM MEMBER WHERE member_id='${member_id}' AND member_pwd = '${member_pwd}' `;
    // var member_id = "";
    // var member_pwd = "";
    // var member_nm = "";
    // var member_birthday="";
    // var member_phone="";
    // var member_email="";
    // var member_gender="";
    // var zipcode = "";
    // var jaddress= "";
    // var raddress= "";
    // var reg_dt = "";

    //회원아이디 존재할시
    db.query(sql, (err, data) => {
      if (err) {
        console.log("error : " + err);
        reject(err);
      } else {
        // member_id= data[0].member_id;
        // member_pwd= data[0].member_pwd;

        resolve(data[0]);
      }
    });
  });
}
/***********************************/

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("로그인 라우터");
});

router.post("/login", async function (req, res, next) {
  var member_id = req.body.member_id;
  var member_pwd = req.body.member_pwd;
  member_pwd = commonUtil.getEncrypt(member_pwd);
  var check_id = 0;
  var check_pwd = 0;
  var member_data = {};

  check_id = await Login1(member_id);
  check_pwd = await Login2(member_id, member_pwd);
  console.log("id: " + check_id);
  console.log("pwd: " + check_pwd);

  if (check_id > 0) {
    if (check_pwd > 0) {
      var data_temp = [];
      // var data = {
      //   member_id: true,
      //   member_pwd: true,
      // };
      var msg = commonUtil.StringToBase64Encoding(
        "회원 아이디와 비밀번호가 존재합니다."
      );

      member_data = await MemberView(member_id, member_pwd);
      console.log(member_data);
      data_temp.push(member_data);

      var result = {
        MSG: msg, //암호화
        CD: 100,
      };

      var json = {
        DATA: data_temp,
        RESULT: result,
      };
      res.json(json);
      //------------------------------------//
    } else {
      var data_temp = [];
      var data = {
        member_id: true,
        member_pwd: false,
      };
      data_temp.push(data);

      var msg =
        commonUtil.StringToBase64Encoding("회원 아이디와 비밀번호가 틀려요.");

      var result = {
        MSG: msg,
        CD: 101,
      };

      var json = {
        DATA: data,
        RESULT: result,
      };
      res.json(json);
    }
    //----------------------------------------------//
  } else {
    var data_temp = [];
    var data = {
      member_id: false,
      member_pwd: false,
    };

    data_temp.push(data);
    var msg = commonUtil.StringToBase64Encoding("회원 아이디가 없습니다.");

    var result = {
      MSG: msg,
      CD: 102,
    };

    var json = {
      DATA: data,
      RESULT: result,
    };
    res.json(json);
  }
});

//로그아웃 DB에 등록할 때 사용

router.get("/logout", function (req, res, next) {
  res.send("로그아웃하기");
});

module.exports = router;
