$(document).ready(function () {

  const userS = JSON.parse(localStorage.getItem("userS")) || [];
  const moneyData = JSON.parse(localStorage.getItem("moneyData"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!moneyData || !userData) {
    window.location.href = "../login.html";
    return;
  }

  // Render saldo inicial
  $("#availableBalance").text(`$ ${moneyData.amount}`);

  renderUsers(userS);

  /* =====================
     CREAR USUARIO
  ====================== */
  $("#createUserForm").on("submit", function (e) {
    e.preventDefault();

    const userName = $("#newUserName").val().trim();
    const email = $("#newUserEmail").val().trim();

    if (!userName || !email) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (userS.some(u => u.email === email)) {
      alert("Este usuario ya existe");
      return;
    }

    userS.push({
      id: userS.length + 1,
      userName,
      email
    });

    localStorage.setItem("userS", JSON.stringify(userS));
    renderUsers(userS);

    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("createUserModal")).hide();
  });

  /* =====================
     TRANSFERENCIA
  ====================== */
  $("#transferUserForm").on("submit", function (e) {
    e.preventDefault();

    const modal = document.getElementById("transferUserModal");
    const selectedUser = $(modal).data("user");
    const amount = Number($("#transferAmount").val());

    if (!selectedUser) {
      alert("Selecciona un usuario");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Monto inválido");
      return;
    }

    if (amount > moneyData.amount) {
      alert("Saldo insuficiente");
      return;
    }

    moneyData.amount -= amount;

    moneyData.tranfers.push({
      id: moneyData.tranfers.length + 1,
      email: selectedUser.email,
      amount,
      date: new Date().toISOString().split("T")[0]
    });

    localStorage.setItem("moneyData", JSON.stringify(moneyData));

    $("#availableBalance").text(`$ ${moneyData.amount}`);
    $("#transferAmount").val("");

    bootstrap.Modal.getInstance(modal).hide();
    alert("Transferencia realizada con éxito 💸");
  });

  // FIX accesibilidad Bootstrap
  $("#transferUserModal").on("hidden.bs.modal", function () {
    $(".transfer-btn").first().trigger("focus");
  });

});

/* =====================
   RENDER USUARIOS
====================== */
function renderUsers(users) {
  const container = $("#usersList");
  container.empty();

  if (users.length === 0) {
    container.append(`
      <div class="col-12 text-center text-white">
        No hay usuarios creados
      </div>
    `);
    return;
  }

  users.forEach(user => {
    container.append(`
      <div class="col-md-4">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="fw-bold mb-1">${user.userName}</h5>
            <small class="text-muted mb-3">${user.email}</small>
            <button
              class="btn btn-primary mt-auto transfer-btn"
              data-user='${JSON.stringify(user)}'
            >
              Transferir
            </button>
          </div>
        </div>
      </div>
    `);
  });

  $(".transfer-btn").on("click", function () {
    const user = JSON.parse($(this).attr("data-user"));
    const modal = document.getElementById("transferUserModal");

    $(modal).data("user", user);
    $("#transferUserName").text(user.userName);
    $("#transferUserEmail").text(user.email);

    new bootstrap.Modal(modal).show();
  });
}