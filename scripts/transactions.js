$(document).ready(function () {
  const moneyData = JSON.parse(localStorage.getItem("moneyData"));

  const container = $("#transactionsContainer");
  $("#availableBalance").text(`$ ${moneyData.amount}`);

  if (!moneyData) {
    container.html(`<p class="text-center text-muted">No hay datos</p>`);
    return;
  }

  // 👇 ADAPTADO A TU ESTRUCTURA REAL
  const deposits = moneyData.deposit || [];
  const transfers = moneyData.tranfers || [];

  const allTransactions = [
    ...deposits.map(d => ({ ...d, type: "deposit" })),
    ...transfers.map(t => ({ ...t, type: "transfer" }))
  ];

  if (allTransactions.length === 0) {
    container.html(`<p class="text-center text-muted">No hay transacciones</p>`);
    return;
  }

  allTransactions.forEach(tx => {
    container.append(`
      <div class="card shadow-sm mb-3 border-0">
        <div class="card-body d-flex justify-content-between align-items-center">

          <div>
            <h6 class="mb-1 fw-bold">
              ${tx.type === "deposit" ? "Depósito 💰" : "Transferencia 💸"}
            </h6>

            ${tx.email ? `<small class="text-muted">${tx.email}</small><br>` : ""}

            <small class="text-muted">
              ${tx.date}
            </small>
          </div>

          <div class="fw-bold fs-5 ${
            tx.type === "deposit" ? "text-success" : "text-danger"
          }">
            $ ${tx.amount}
          </div>

        </div>
      </div>
    `);
  });
});
