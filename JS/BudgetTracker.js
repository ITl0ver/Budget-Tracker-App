export default class BudgetTracker {
    constructor(querySelectorString) {
        this.root = document.querySelector(querySelectorString);
        this.root.innerHTML = BudgetTracker.html();

        this.root.querySelector(".new-entry").addEventListener("click", () => {
            this.onNewEntryBtnClick();
        });

        //load initial data from Local Storage
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
                            <button type="button">New Entry</button>
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
                    <input type="text" class="input input-description" placeholder="Add a Description (e.g wages, bills, etc.)">
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

    }

    updateSummary() {

    }

    save() {

    }

    addEntry(entry = {}) {

    }

    getEntryRows() {

    }

    onNewEntryBtnClick() {

    }

    onDeleteEntryBtnClick(e) {

    }
}