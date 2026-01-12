// MENU
$(document).ready(function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const moneyData = JSON.parse(localStorage.getItem("moneyData"));

  if (!userData) {
    window.location.href = "login.html";
    return;
  }

  $("#userName").text(userData.userName);
  $("#email").text(userData.email);
  $("#amount").text(moneyData.amount);
});

$("#logout").click(function () {
  localStorage.removeItem("userData");
  localStorage.removeItem("moneyData");
  window.location.href = "index.html";
});

$("#deposit").click(function () {
  window.location.href = "./components/deposit.html";
});

$("#transfer").click(function () {
  window.location.href = "./components/transactions.html";
});
