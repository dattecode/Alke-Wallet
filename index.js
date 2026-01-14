// ESTADO INICIAL
let userData = JSON.parse(localStorage.getItem("userData")) || {
  userName: "",
  email: "",
  password: ""
};

let moneyData = JSON.parse(localStorage.getItem("moneyData")) || {
  amount: 1500,
  tranfers: [],
  deposit: [],
};

let userS = JSON.parse(localStorage.getItem("userS")) || [{
  userName: "",
  email: "",
}];

const setDataItems = async (nameLocalDB, data) =>{
  localStorage.setItem(nameLocalDB, JSON.stringify(data));
}

$(document).ready(function () {

  // REGISTRO
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    const userName = $("#userName").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (userName === "" || email === "" || password === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    userData = {
      userName,
      email,
      password
    };

    // 👉 GUARDAR
    setDataItems("userData", userData);
    setDataItems("moneyData", moneyData);

    alert("Registro exitoso");
  });

  // LOGIN
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const loginEmail = $("#loginEmail").val().trim();
    const loginPassword = $("#loginPassword").val().trim();

    if (loginEmail === "" || loginPassword === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!userData.email) {
      alert("No hay ningún usuario registrado");
      return;
    }

    if (
      loginEmail !== userData.email ||
      loginPassword !== userData.password
    ) {
      alert("Email o contraseña incorrectos");
      return;
    }

    // 👉 GUARDAR
    setDataItems("userData", userData);

    // 👉 REDIRECCIONAR
    window.location.href = "menu.html";
  });
});
