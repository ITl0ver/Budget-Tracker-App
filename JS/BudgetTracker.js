export default class BudgetTracker {
  constructor(querySelectorString) {
    this.root = document.querySelector(querySelectorString);
    this.root.innerHTML = BudgetTracker.html();
    this.root.querySelector(".new-entry").addEventListener("click", () => {
      this.onNewEntryBtnClick();
    });

    // Load initial data from Local Storage
    this.load();
  }

  static html() {
    return `
            <table class="budget-tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody class="entries"></tbody>
                <tbody>
                    <tr>
                        <td colspan="5" class="controls" >
                            <button type="button" class="new-entry">New Entry</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" class="summary">
                            <strong>Total:</strong>
                            <span class="total">$0.00</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
  }

  static entryHtml() {
    return `
            <tr>
                <td>
                    <input type="date" class="input input-date">
                </td>
                <td>
                    <input type="text" class="input input-description" placeholder="Add a Description">

                </td>
                <td>
                    <select class="input input-type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="input input-amount">
                </td>
                <td>
                    <button type="button" class="delete-entry">&#10005</button>
                </td>
            </tr>
        `;
  }

  load() {
    const entries = JSON.parse(
      localStorage.getItem("budget-tracker-entries-dev") || "[]"
    );
    for (const entry of entries) {
      this.addEntry(entry);
    }

    this.updateSummary();
  }

  updateSummary() {
    const entryRows = Array.from(this.getEntryRows());

    const total = entryRows.reduce((total, row) => {
      const amount = parseFloat(row.querySelector(".input-amount").value); // Parse the amount as a float
      const isExpense = row.querySelector(".input-type").value === "expense";
      const modifier = isExpense ? -1 : 1;

      return total + amount * modifier;
    }, 0);

    const totalFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);

    this.root.querySelector(".total").textContent = totalFormatted;
  }

  save() {
    const data = Array.from(this.getEntryRows()).map((row) => {
      return {
        date: row.querySelector(".input-date").value,
        description: row.querySelector(".input-description").value,
        type: row.querySelector(".input-type").value,
        amount: parseFloat(row.querySelector(".input-amount").value), // Parse the amount as a float
      };
    });
    localStorage.setItem("budget-tracker-entries-dev", JSON.stringify(data));
    this.updateSummary();
  }
  addEntry(entry = {}) {
    this.root
      .querySelector(".entries")
      .insertAdjacentHTML("beforeend", BudgetTracker.entryHtml());

    const row = this.root.querySelector(".entries tr:last-of-type");

    row.querySelector(".input-date").value =
      entry.date || new Date().toISOString().split("T")[0];
    row.querySelector(".input-description").value = entry.description || "";
    row.querySelector(".input-type").value = entry.type || "income";
    row.querySelector(".input-amount").value = entry.amount || 0;
    row.querySelector(".input-amount").addEventListener("input", () => {
      this.updateSummary();
      this.save();
    });
    row.querySelector(".delete-entry").addEventListener("click", (e) => {
      this.onDeleteEntryBtnClick(e);
    });

    this.save();
  }
  getEntryRows() {
    return this.root.querySelectorAll(".entries tr");
  }

  onNewEntryBtnClick() {
    this.addEntry();
  }

  onDeleteEntryBtnClick(e) {
    e.target.closest("tr").remove();
    this.save();
  }
}
