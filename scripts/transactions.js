$(document).ready(function () {
  const moneyData = JSON.parse(localStorage.getItem("moneyData"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!moneyData || !userData) {
    window.location.href = "../login.html";
    return;
  }

  // Asegurar array
  moneyData.tranfers = moneyData.tranfers || [];

  $("#currentAmount").text(moneyData.amount);

  // 🔥 render inicial
  renderTransfer(moneyData.tranfers);

  $("#transferForm").on("submit", function (e) {
    e.preventDefault();

    const amount = Number($("#transferAmount").val());
    const email = $("#transferEmail").val().trim();

    if (!amount || amount <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    if (!email) {
      alert("Ingrese un email");
      return;
    }

    if (amount > moneyData.amount) {
      alert("Saldo insuficiente");
      return;
    }

    if (email === userData.email) {
      alert("No puedes transferirte a ti mismo");
      return;
    }

    moneyData.amount -= amount;

    moneyData.tranfers.push({
      id: moneyData.tranfers.length + 1,
      email,
      amount,
      date: new Date().toISOString()
    });

    localStorage.setItem("moneyData", JSON.stringify(moneyData));

    $("#currentAmount").text(moneyData.amount);
    $("#transferAmount").val("");
    $("#transferEmail").val("");

    renderTransfer(moneyData.tranfers);

    alert("Transferencia realizada con éxito 💸");
  });
});

function renderTransfer(tranfers) {
  const tbody = $("#tbodyTransfers");
  tbody.empty();

  if (!tranfers.length) {
    tbody.append(`
      <tr>
        <td colspan="4" class="text-center text-muted">
          No hay transferencias registradas
        </td>
      </tr>
    `);
    return;
  }

  tranfers.forEach((transfer) => {
    tbody.append(`
      <tr>
        <th scope="row">${transfer.id}</th>
        <td>${transfer.email}</td>
        <td class="text-danger fw-semibold">$${transfer.amount}</td>
        <td>${new Date(transfer.date).toLocaleDateString()}</td>
      </tr>
    `);
  });
}
