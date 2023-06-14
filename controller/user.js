const models = require("../models");
const { Op } = require("sequelize");
const crypto = require("crypto");
const session = require("express-session");
const cookie = require("cookie-parser");

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString("base64"));
      }
    });
  });
};

const createHashedPassword = async (inputPassword) => {
  const salt = await createSalt();

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(inputPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve({ hashedPassword: key.toString("base64"), salt });
      }
    });
  });
};

const getHashedPassword = (inputPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(inputPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve(key.toString("base64"));
      }
    });
  });
};

exports.Cpost_changePassword = async (req, res) => {
  const userinfo_id = req.body.userinfo_id;
  const currentPassword = req.body.current_password;
  const newPassword = req.body.new_password;

  const userInfo = await models.User.findOne({
    where: {
      userinfo_id,
    },
  });

  if (!userInfo) {
    res.send({ result: false, message: "사용자를 찾을 수 없습니다." });
    return false;
  } else {
    const dbPassword = userInfo.dataValues.user_pw;
    const salt = userInfo.dataValues.user_salt;
    const hashedCurrentPassword = await getHashedPassword(
      currentPassword,
      salt
    );

    if (dbPassword !== hashedCurrentPassword) {
      res.send({
        result: false,
        message: "현재 비밀번호가 일치하지 않습니다.",
      });
      return false;
    } else {
      const { hashedPassword, salt: newSalt } = await createHashedPassword(
        newPassword
      );

      await models.User.update(
        {
          user_pw: hashedPassword,
          user_salt: newSalt,
        },
        {
          where: {
            userinfo_id,
          },
        }
      );

      res.send({ result: true, message: "비밀번호가 변경되었습니다." });
    }
  }
};

const checkUserIdExists = async (user_id) => {
  const user = await models.User.findOne({
    where: { user_id },
  });

  return user !== null;
};

exports.Cpost_checkUserId = async (req, res) => {
  const user_id = req.body.user_id;
  const exists = await checkUserIdExists(user_id);

  if (exists) {
    res.send({ result: true, message: "이미 사용중인 아이디입니다." });
  } else {
    res.send({
      result: false,
      message: "사용 가능한 아이디 입니다. 계속 진행해 주세요.",
    });
  }
};

exports.Cpost_register = async (req, res) => {
  const isUserIdExist = await checkUserIdExists(req.body.user_id);

  if (isUserIdExist) {
    res.send({ result: false, message: "이미 사용 중인 아이디입니다." });
  } else {
    const { hashedPassword, salt } = await createHashedPassword(
      req.body.user_pw
    );

    const result = await models.User.create({
      user_id: req.body.user_id,
      user_pw: hashedPassword,
      user_name: req.body.user_name,
      user_country: req.body.user_country,
      user_salt: salt,
    });

    if (result) {
      res.send({ result: true, message: "회원가입이 완료되었습니다." });
    } else {
      res.send({
        result: false,
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
      });
    }
  }
};

exports.Cpost_login = async (req, res) => {
  const result = await models.User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  });
  if (result === null) {
    res.send({
      result: false,
      message: "아이디 혹은 비밀번호가 맞지 않습니다.",
    });
  } else {
    const dbPassword = result.dataValues.user_pw;
    const inputPassword = req.body.user_pw;
    const salt = result.dataValues.user_salt;
    const hashedPassword = await getHashedPassword(inputPassword, salt);

    if (dbPassword === hashedPassword) {
      req.session.loggedin_user = {
        userinfo_id: result.dataValues.userinfo_id,
        user_name: result.dataValues.user_name,
      };
      req.session.save(() => {
        console.log("session save...");
        res.send({
          result: true,
          message: "로그인에 성공했습니다.",
          loggedin_user: req.session.loggedin_user,
        });
      });
    } else {
      res.send({
        result: false,
        message: "아이디 혹은 비밀번호가 맞지 않습니다.",
      });
    }
  }
};

exports.Cpost_logout = async (req, res) => {
  req.session.destroy(function () {
    req.session;
  });
  res.send({ result: true, message: "로그아웃에 성공했습니다." });
};

exports.getUserInfo = async (req, res) => {
  const userInfo = await models.User.findOne({
    where: {
      userinfo_id: req.body.userinfo_id,
    },
  });
  res.send({
    userinfo_id: userInfo.userinfo_id,
    user_id: userInfo.user_id,
    user_name: userInfo.user_name,
    user_country: userInfo.user_country,
  });
};
