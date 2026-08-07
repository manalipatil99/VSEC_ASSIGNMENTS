let total = 0;

let name = document.getElementById("name");
let amount = document.getElementById("amount");
let table = document.getElementById("expenseTable");
let totalText = document.getElementById("total");

function addExpense()
{
    let expenseName = name.value;
    let expenseAmount = Number(amount.value);

    if(expenseName != "" && expenseAmount > 0)
    {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${expenseName}</td>
            <td>₹${expenseAmount}</td>
        `;

        table.appendChild(row);

        total += expenseAmount;
        totalText.innerHTML = "Total: ₹" + total;

        name.value = "";
        amount.value = "";
    }
}

function clearExpenses()
{
    table.innerHTML = "";
    total = 0;
    totalText.innerHTML = "Total: ₹0";
}

document.getElementById("addBtn").addEventListener("click", addExpense);
document.getElementById("clearBtn").addEventListener("click", clearExpenses);

// Keyboard event: Enter key adds expense
document.addEventListener("keydown", function(event)
{
    if(event.key == "Enter")
    {
        addExpense();
    }
});