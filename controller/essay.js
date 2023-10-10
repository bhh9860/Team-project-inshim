const models = require('../models');
const { sequelize } = require('../models/index');
const session = require('express-session');

exports.Cgetwrite = (req, res) => {
  // const userId = req.session.loggedin_user.userinfo_id;
  const userId = req.session.loggedin_user?.userinfo_id;
  if (userId != undefined) {
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
          console.log('데이터값 없음');
          res.render('write', { userId, data: null }); // 빈 데이터를 전달
        } else {
          res.render('write', { userId, data: results });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('원시 쿼리 실행 오류');
      });
  } else if (userId === undefined) {
    res.status(500).send('로그인을 먼저 진행해주세요!');
    return;
  }
};

exports.Cpostessay = (req, res) => {
  //essay에 보내는 로직
  const checkboxValue = req.body.checkboxValue;
  const title = req.body.title;
  const content = req.body.content;
  const routeDay = req.body.routeDay;
  const routeCity = req.body.routeCity;

  sequelize
    .query(
      `INSERT INTO detail_essay ( F_route_id, detail_Etitle, detail_Ecomment, detail_city, detail_day) 
      VALUES ( ?, ?, ?, ?, ?)`,
      {
        replacements: [checkboxValue, title, content, routeCity, routeDay],
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then(() => {
      console.log('데이터베이스에 값 삽입 완료');
      // 삽입 성공 시 true 보내줌
      res.send({ data: true });
    })
    .catch((error) => {
      console.log('데이터베이스 삽입 오류:', error);
      // 삽입 오류 처리
    });
};

exports.Cgetessay = (req, res) => {
  sequelize
    .query("SELECT *, date_format(regdate, '%Y-%m-%d') AS formatted_regdate FROM `detail_essay`", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result) => {
      res.render('essay', { data: result });
    });
};

exports.Cgetidx = (req, res) => {
  const numberId = req.params.idx;
  sequelize
    .query("SELECT *, date_format(regdate, '%Y-%m-%d %H:%i:%s') AS formatted_regdate FROM `detail_essay`", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result) => {
      if (result.length === 0) {
        // 해당 조건에 맞는 레코드가 없는 경우 처리
        res.render('essayView', { data: null });
      } else {
        const record = result[numberId - 1]; // 첫 번째 요소 사용
        res.render('essayView', { data: record });
      }
    });
};
