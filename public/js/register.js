const form = document.forms["register"];
let userId = document.getElementById("user_id").value;
let userPw = document.getElementById("user_pw").value;
let userName = document.getElementById("user_name").value;
let userCountry = document.getElementById("user_country").value;

async function checkUserId() {
  let idRegex = /^[a-zA-Z0-9-_]{4,12}$/;
  const userIdInput = form.user_id;
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
    try {
      let response = await axios({
        method: "post",
        url: "/inshim/register/checkUserId",
        data: {
          user_id: userId,
        },
      }).then((res) => {
        if (res.data.result) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      });
    } catch (error) {
      alert("아이디 중복 검사 중 오류 발생하였습니다.");
      userIdInput.focus();
    }
  }
}

function registFunc() {
  let userId = document.getElementById("user_id").value;
  let userPw = document.getElementById("user_pw").value;
  let userName = document.getElementById("user_name").value;
  let userCountry = document.getElementById("user_country").value;
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
  } else {
    axios({
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
        location.href = "/inshim/login";
      } else {
        alert(res.data.message);
      }
    });
  }
}
