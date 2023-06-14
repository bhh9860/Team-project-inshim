const models = require("../models");
const { sequelize } = require("../models/index");
const session = require("express-session");

// exports.index = (req, res) => {
//   res.render("index");
// };

// exports.login = (req, res) => {
//   res.render("login");
// };

// exports.postlogin = (req, res) => {
//   models.User.findOne({
//     where: {
//       user_id: req.body.user_id,
//       user_pw: req.body.user_pw,
//     },
//   }).then((value) => {
//     console.log("Cpost_signin", value);

//     if (value) {
//       req.session.userId = 1; // 예시로 사용자 ID를 저장
//       res.send({ result: true, data: value.dataValues });
//       console.log(req.session.userId);
//     } else {
//       res.json({ result: false });
//     }
//   });
// };

exports.Cgetroute = (req, res) => {
  //   const userId = req.session.userId;
  const userId = req.session.loggedin_user.userinfo_id;
  models.Route.findAll().then((result) => {
    // console.log(userId); //로그인했을때 세션값 들어오는것 확인
    // console.log(result);
    res.render("route", { data: result, userId });
  });
};

exports.Cpostroute = (req, res) => {
  // const userId = req.session.userId;
  const userId = req.session.loggedin_user.userinfo_id;
  if (userId != undefined) {
    const routeId = req.body.routeId;

    // 중복 삽입 여부 확인
    sequelize
      .query(
        "SELECT COUNT(*) AS count FROM bookmark WHERE F_userinfo_id = ? AND F_route_id = ?",
        {
          replacements: [userId, routeId],
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((results) => {
        const count = results[0].count;

        if (count === 0) {
          // 중복이 아닌 경우에만 삽입 수행
          sequelize
            .query(
              "INSERT INTO bookmark (F_userinfo_id, F_route_id) VALUES (?, ?)",
              {
                replacements: [userId, routeId],
                type: sequelize.QueryTypes.INSERT,
              }
            )
            .then(() => {
              console.log("데이터베이스에 삽입 완료");
              res.send({ success: true });
            })
            .catch((error) => {
              console.log("데이터베이스 삽입 오류:", error);
              res.send({ success: false });
            });
        } else {
          console.log("이미 존재하는 데이터입니다.");
          res.send({ success: false });
        }
      })
      .catch((error) => {
        console.error("데이터베이스 조회 오류:", error);
        res.send({ success: false });
      });

    // console.log(req.session.userId);

    console.log("userId: " + userId); // 로그인 후에
  } else {
    console.log("로그인 먼저!");
  }
};

exports.Cgetwrite = (req, res) => {
  // const userId = req.session.userId;
  const userId = req.session.loggedin_user.userinfo_id;
  // console.log(userId);
  if (userId) {
    sequelize
      .query(
        `SELECT *
        FROM bookmark
        JOIN route ON bookmark.F_route_id = route.route_id
        JOIN detail ON bookmark.F_route_id = detail.detail_route_id
        WHERE bookmark.F_userinfo_id = :userId`,
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: { userId: userId },
        }
      )
      .then((results) => {
        // console.log(results);
        if (results.length === 0) {
          console.log("데이터값 없음");
          res.render("write", { userId, data: null }); // 빈 데이터를 전달
        } else {
          res.render("write", { userId, data: results });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("원시 쿼리 실행 오류");
      });
  } else {
    res.status(500).send("로그인을 먼저 진행해주세요!");
  }
};

exports.Cpostessay = (req, res) => {
  //essay에 보내는 로직
  const checkboxValue = req.body.checkboxValue;
  const title = req.body.title;
  const content = req.body.content;
  const routeDay = req.body.routeDay;
  const routeCity = req.body.routeCity;
  // console.log(checkboxValue, title, content, routeDay, routeCity);

  sequelize
    .query(
      `INSERT INTO detail_essay ( F_route_id, detail_Etitle, detail_Ecomment, detail_city, detail_day) VALUES ( ?, ?, ?, ?, ?)`,
      {
        replacements: [checkboxValue, title, content, routeCity, routeDay],
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then(() => {
      console.log("데이터베이스에 값 삽입 완료");
      // 삽입 성공 시 true 보내줌
      res.send({ data: true });
    })
    .catch((error) => {
      console.log("데이터베이스 삽입 오류:", error);
      // 삽입 오류 처리
    });
};

exports.Cgetessay = (req, res) => {
  sequelize
    .query(
      "SELECT *, date_format(regdate, '%Y-%m-%d') AS formatted_regdate FROM `detail_essay`",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      res.render("essay", { data: result });
      // console.log("여기");
      // console.log(result);
    });
};

exports.Cgetidx = (req, res) => {
  // console.log(req.params);
  const numberId = req.params.idx;
  // console.log(numberId);

  sequelize
    .query(
      "SELECT *, date_format(regdate, '%Y-%m-%d %H:%i:%s') AS formatted_regdate FROM `detail_essay`",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((result) => {
      if (result.length === 0) {
        // 해당 조건에 맞는 레코드가 없는 경우 처리
        res.render("essayView", { data: null });
      } else {
        const record = result[numberId - 1]; // 첫 번째 요소 사용
        res.render("essayView", { data: record });
        // console.log(record);
      }
    });
};
