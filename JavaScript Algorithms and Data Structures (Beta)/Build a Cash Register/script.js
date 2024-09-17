const purchaseBtn = document.getElementById("purchase-btn");
const changeMsg = document.getElementById("change-due");

let price = 19.5;
const cid = [
  ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
  ["QUARTER", 0], ["ONE", 5], ["FIVE", 0], 
  ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
];

let bill = [
  ['ONE HUNDRED', 100],
  ['TWENTY', 20],
  ['TEN', 10],
  ['FIVE', 5],
  ['ONE', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.1],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
];

const bills = {
  'ONE HUNDRED': 100,
  'TWENTY': 20,
  'TEN': 10,
  'FIVE': 5,
  'ONE': 1,
  'QUARTER': 0.25,
  'DIME': 0.1,
  'NICKEL': 0.05,
  'PENNY': 0.01
};

function cashInDrawer(arr) {
  return arr.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2);
}

function calculateChange(changeDue, denominations) {
  let changeArr = [];
  
  for (let i = 0; i < bill.length; i++) {
    while (changeDue / bill[i][1] >= 1 && denominations[i][1] !== 0) {
      changeArr.push(bill[i][0]);
      denominations[i][1] -= bill[i][1];
      changeDue -= bill[i][1];
      changeDue = parseFloat(changeDue.toFixed(2));
    }
  }

  let counts = {};
  changeArr.forEach(element => {
    counts[element] = counts[element] ? counts[element] + 1 : 1;
  });

  let textMsg = "";
  for (let i in counts) {
    textMsg += `${i}: $${(bills[i] * counts[i]).toFixed(2)} `;
  }

  if (changeDue > 0) {
    changeMsg.textContent = `Status: INSUFFICIENT_FUNDS`;
  } else {
    const totalCidLeft = parseFloat(cashInDrawer(cid));
    if (totalCidLeft === 0) {
      changeMsg.textContent = `Status: CLOSED ${textMsg}`;
    } else {
      changeMsg.textContent = `Status: OPEN ${textMsg}`;
    }
  }
}

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash").value);
  const changeDue = parseFloat((cash - price).toFixed(2));
  const denominations = [...cid].reverse();

  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item");
  } else if (changeDue === 0) {
    changeMsg.textContent = "No change due - customer paid with exact cash";   
  } else if (parseFloat(cashInDrawer(denominations)) < changeDue) {
    changeMsg.textContent = `Status: INSUFFICIENT_FUNDS`;
  } else {
    calculateChange(changeDue, denominations);
  }
});
