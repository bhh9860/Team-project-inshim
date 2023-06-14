const lform = document.forms["login"];

function loginFunc() {
  const userIdInput = lform.login_user_id;
  const userId = userIdInput.value;
  const userPwInput = lform.login_user_pw;
  const userPw = userPwInput.value;

  if (userId === "") {
    alert("아이디를 입력해주세요");
    userIdInput.focus();
    return false;
  }

  if (userPw === "") {
    alert("비밀번호를 입력해주세요");
    userPwInput.focus();
    return false;
  }

  axios({
    method: "post",
    url: "/inshim/login",
    data: {
      user_id: userId,
      user_pw: userPw,
    },
  }).then((res) => {
    if (res.data.result) {
      alert(res.data.message);
      sessionStorage.setItem(
        "loggedin_user",
        JSON.stringify(res.data.loggedin_user)
      );
      location.href = "/inshim";
    } else {
      alert(res.data.message);
    }
  });
}

///////////////////////////////////////////////////////////////

const rform = document.forms["register"];
let isUserIdValid = false;

const registerBtn = document.getElementById("register-btn");

async function checkUserId() {
  let idRegex = /^[a-zA-Z0-9-_]{4,12}$/;
  const userIdInput = rform.register_user_id;
  const userId = userIdInput.value;

  if (userId === "") {
    alert("아이디를 입력해주세요");
    userIdInput.focus();
    return false;
  }
  if (!idRegex.test(userId)) {
    alert(
      "아이디는 4~12자리의 영문, 숫자, 대시(-), 밑줄(_)만 사용 가능합니다."
    );
    userIdInput.focus();
    return false;
  } else {
    axios({
      method: "post",
      url: "/inshim/register/checkUserId",
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        if (res.data.result) {
          isUserIdValid = false;
          registerBtn.setAttribute("disabled", "true");
          alert(res.data.message);
        } else {
          isUserIdValid = true;
          registerBtn.removeAttribute("disabled");
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert("아이디 중복 검사 중 오류 발생하였습니다.");
        userIdInput.focus();
      });
  }
}

async function registFunc() {
  let userId = document.getElementById("register_user_id").value;
  let userPw = document.getElementById("register_user_pw").value;
  let userName = document.getElementById("register_user_name").value;
  let userCountry = document.getElementById("register_user_country").value;
  let passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  if (userId === "" || userPw === "" || userName === "" || userCountry === "") {
    alert("모든 입력 칸을 채워주세요.");
    return false;
  } else if (!passwordRegex.test(userPw)) {
    alert(
      "비밀번호는 8~20자리의 영문 대문자, 소문자, 숫자, 특수문자(!@#$%^&*)가 포함되어야 합니다."
    );
    return false;
  } else if (isUserIdValid) {
    await axios({
      method: "post",
      url: "/inshim/register",
      data: {
        user_id: userId,
        user_pw: userPw,
        user_name: userName,
        user_country: userCountry,
      },
    }).then((res) => {
      if (res.data.result) {
        alert(res.data.message);
        location.href = "/inshim";
      } else {
        alert(res.data.message);
      }
    });
  } else {
    alert("아이디 중복 검사를 통과해야 합니다.");
  }
}

///////////////////////////////////////////////////////////////

window.addEventListener("load", checkIfLoggedIn);

function checkIfLoggedIn() {
  if (sessionStorage.getItem("loggedin_user")) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("sub-mypage").style.display = "block";

    axios({
      method: "post",
      url: "/inshim/mypage",
      data: {
        userinfo_id: JSON.parse(sessionStorage.getItem("loggedin_user"))
          .userinfo_id,
      },
    }).then((res) => {
      document.getElementById("user_id_text").innerText = res.data.user_id;
      document.getElementById("user_name_text").innerText = res.data.user_name;
      document.getElementById("user_country_text").innerText =
        res.data.user_country;
    });
  } else {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("sub-mypage").style.display = "none";
  }
}

function logoutFunc() {
  axios({
    method: "post",
    url: "/inshim/mypage/logout",
    data: {
      loggedin_user: sessionStorage.getItem("loggedin_user"),
    },
  }).then((res) => {
    if (res.data.result) {
      sessionStorage.clear();
      alert(res.data.message);
      location.href = "/inshim";
    }
  });
}

function pwChangeFunc() {
  const form = document.forms["change_password_form"];

  axios({
    method: "post",
    url: "/inshim/mypage/changePassword",
    data: {
      userinfo_id: JSON.parse(sessionStorage.getItem("loggedin_user"))
        .userinfo_id,
      current_password: form.currentPassword.value,
      new_password: form.newPassword.value,
    },
  }).then((res) => {
    if (res.data.result === true) {
      alert(res.data.message);
      location.href = "/inshim";
    } else if (res.data.result === false) {
      alert(res.data.message);
    }
  });
}
