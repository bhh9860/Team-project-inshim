// 세션 값 가져오기
const sessionData = JSON.parse(sessionStorage.getItem("loggedin_user"));

window.addEventListener("load", function () {
  if (sessionData) {
    // 로그인된 상태일 때
    document.getElementById("login-section").style.display = "none";
    document.getElementById("sub-mypage").style.display = "block";
  } else {
    // 로그인되지 않은 상태일 때
    document.getElementById("login-section").style.display = "block";
    document.getElementById("sub-mypage").style.display = "none";
  }
});
