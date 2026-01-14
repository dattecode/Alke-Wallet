$(document).ready(function () {
  const moneyData = JSON.parse(localStorage.getItem("moneyData"));
  const container = $("#transactionsContainer");

  if (!moneyData) return;

  const allTransactions = [
    ...(moneyData.deposits || []).map(d => ({ ...d, type: "deposit" })),
    ...(moneyData.transfers || []).map(t => ({ ...t, type: "transfer" }))
  ];

  if (allTransactions.length === 0) {
    container.html(`<p class="text-center text-muted">No hay transacciones</p>`);
    return;
  }

  allTransactions.forEach(tx => {
    container.append(`
      <div class="transaction-card ${tx.type}">
        <div class="transaction-title">
          ${tx.type === "deposit" ? "Depósito 💰" : "Transferencia 💸"}
        </div>

        <div class="transaction-amount">
          $ ${tx.amount}
        </div>

        ${tx.email ? `<div>Email: ${tx.email}</div>` : ""}

        <div class="transaction-date">
          ${new Date(tx.date).toLocaleDateString()}
        </div>
      </div>
    `);
  });
});
