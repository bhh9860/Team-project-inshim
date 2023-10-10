const models = require('../models');
const { sequelize } = require('../models/index');

//루트테이블의 도시들 불러오기
exports.route = (req, res) => {
  models.Route.findAll().then((routeTable) => {
    // 모든 route_city 중복 제거
    // ['서울', '서울', '부산', '부산', '제주도', '제주도']를
    // ['서울', '부산', '제주도']
    let routeCityResultArray = [];
    for (let i = 0; i < routeTable.length; i++) {
      routeCityResultArray.push(routeTable[i].dataValues.route_city);
    }
    const set = new Set(routeCityResultArray);
    routeCityResultArray = [...set];

    let routeDayResultArray = [];
    for (let i = 0; i < routeTable.length; i++) {
      routeDayResultArray.push(routeTable[i].dataValues.route_day);
    }
    const set1 = new Set(routeDayResultArray);
    routeDayResultArray = [...set1];

    models.detail.findAll().then((detailTable) => {
      // console.log(detailTable[0].dataValues)
      res.render('userinfo.ejs', {
        routeCity: routeCityResultArray,
        routeDay: routeDayResultArray,
        detailTable: detailTable,
      });
    });
  });
};

//route_id를 통해 detail테이블의 정보 불러오기
exports.detail = (req, res) => {
  //지역과 날짜가 all일 때
  if (req.body.city === 'all' && req.body.day === 'all') {
    models.detail.findAll().then((data) => {
      detailArray = [];
      for (let j = 0; j < data.length; j++) {
        detailArray.push([data[j].dataValues.detail_comment, j + 1]);
      }
      res.send(detailArray);
    });
    //지역만 all일 때
  } else if (req.body.city === 'all' && req.body.day !== 'all') {
    console.log('aaaaaaaaaaaaa', req.body.city);
    models.Route.findAll({
      attributes: ['route_id'],
      where: {
        route_day: req.body.day,
      },
    }).then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log('route_id는', data[i].dataValues.route_id);
      }
      models.detail.findAll().then((dataa) => {
        detailArray = [];
        for (let j = 0; j < data.length; j++) {
          detailArray.push([
            dataa[data[j].dataValues.route_id - 1].dataValues.detail_comment,
            data[j].dataValues.route_id,
          ]);
        }
        console.log('detailArray:', detailArray);
        res.send(detailArray);
      });
    });
    //날짜만 all일 때
  } else if (req.body.city !== 'all' && req.body.day === 'all') {
    models.Route.findAll({
      attributes: ['route_id'],
      where: {
        route_city: req.body.city,
      },
    }).then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log('route_id는', data[i].dataValues.route_id);
      }
      models.detail.findAll().then((dataa) => {
        detailArray = [];
        for (let j = 0; j < data.length; j++) {
          detailArray.push([
            dataa[data[j].dataValues.route_id - 1].dataValues.detail_comment,
            data[j].dataValues.route_id,
          ]);
        }
        console.log('detailArray:', detailArray);
        res.send(detailArray);
      });
    });

    // 지역과 날짜가 all이 아닐 때
  } else {
    // console.log(req.city)
    models.Route.findAll({
      attributes: ['route_id'],
      where: {
        route_city: req.body.city,
        route_day: req.body.day,
      },
      //route테이블의 route_id
    }).then((data) => {
      for (let i = 0; i < data.length; i++) {
        // console.log('route_id는', data[i].dataValues.route_id)
      }
      models.detail.findAll().then((dataa) => {
        detailArray = [];
        for (let j = 0; j < data.length; j++) {
          detailArray.push([
            dataa[data[j].dataValues.route_id - 1].dataValues.detail_comment,
            data[j].dataValues.route_id,
          ]);
        }
        // console.log('detailArray:', detailArray)
        res.send(detailArray);
      });
    });
  }
};

//즐겨찾기
exports.Cpostroute = (req, res) => {
  const userId = req.session.loggedin_user?.userinfo_id;
  if (userId != undefined) {
    const routeId = req.body.routeId;
    // 중복 삽입 여부 확인
    sequelize
      .query('SELECT COUNT(*) AS count FROM bookmark WHERE F_userinfo_id = ? AND F_route_id = ?', {
        replacements: [userId, routeId],
        type: sequelize.QueryTypes.SELECT,
      })
      .then((results) => {
        const count = results[0].count;
        if (count === 0) {
          // 중복이 아닌 경우에만 삽입 수행
          sequelize
            .query('INSERT INTO bookmark (F_userinfo_id, F_route_id) VALUES (?, ?)', {
              replacements: [userId, routeId],
              type: sequelize.QueryTypes.INSERT,
            })
            .then(() => {
              console.log('데이터베이스에 삽입 완료');
              res.send({ success: true });
            })
            .catch((error) => {
              console.log('데이터베이스 삽입 오류:', error);
              res.send({ success: false });
            });
        } else {
          console.log('이미 존재하는 데이터입니다.');
          res.send({ success: false });
        }
      })
      .catch((error) => {
        console.error('데이터베이스 조회 오류:', error);
        res.send({ success: false });
      });
    console.log('userId: ' + userId); // 로그인 후에
  } else {
    console.log('로그인 먼저!');
    res.send({ login: false });
  }
};
