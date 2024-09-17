document.getElementById("convert-btn").addEventListener("click", () => {
  const numberInput = document.getElementById("number").value;
  const output = document.getElementById("output");
  const number = parseInt(numberInput);

  if (!numberInput || isNaN(number)) {
    output.textContent = "Please enter a valid number";
    return;
  }

  if (number < 1 || number >= 4000) {
    output.textContent = number < 1
      ? "Please enter a number greater than or equal to 1"
      : "Please enter a number less than or equal to 3999";
    return;
  }

  output.textContent = convertToRoman(number);
});

function convertToRoman(num) {
  const romanNumerals = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  return romanNumerals.reduce((roman, [value, numeral]) => {
    while (num >= value) {
      roman += numeral;
      num -= value;
    }
    return roman;
  }, "");
}
