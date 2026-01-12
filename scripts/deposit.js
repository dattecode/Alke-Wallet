$(document).ready(function () {

  const moneyData = JSON.parse(localStorage.getItem("moneyData"));

  if (!moneyData) {
    window.location.href = "../login.html";
    return;
  }

  $("#currentAmount").text(moneyData.amount);

  renderDeposit(moneyData.deposit);

  $("#depositForm").on("submit", function (e) {
    e.preventDefault();

    const amount = Number($("#amountDeposit").val());

    if (!amount || amount <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    moneyData.amount += parseInt(amount);

    moneyData.deposit.push({
      amount,
      date: new Date().toISOString().split("T")[0],
      Id: moneyData.deposit.length + 1
    });

    localStorage.setItem("moneyData", JSON.stringify(moneyData));

    $("#currentAmount").text(moneyData.amount);
    $("#amountDeposit").val("");

    renderDeposit(moneyData.deposit);

    alert("Depósito realizado con éxito 💰");
  });

});

const renderDeposit = (deposits) => {
const tbody = $("#tbodyDesposit");
  tbody.empty();

  if (!deposits || deposits.length === 0) {
    tbody.append(`
      <tr>
        <td colspan="3" class="text-center text-muted">
          No hay depósitos registrados
        </td>
      </tr>
    `);
    return;
  }

  deposits.forEach((deposit, index) => {
    tbody.append(`
      <tr>
        <th scope="row">${index + 1}</th>
        <td class="fw-semibold text-success">$ ${deposit.amount}</td>
        <td>${deposit.date}</td>
      </tr>
    `);
  });
}