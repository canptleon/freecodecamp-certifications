document.getElementById("check-btn").addEventListener("click", function () {
  const inputText = document.getElementById("text-input").value.trim();
  const result = document.getElementById("result");

  if (!inputText) {
    alert("Please input a value");
    return;
  }

  const cleanedText = inputText.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  const reversedText = cleanedText.split("").reverse().join("");

  if (cleanedText && cleanedText === reversedText) {
    result.textContent = `${inputText} is a palindrome`;
  } else {
    result.textContent = `${inputText} is not a palindrome`;
  }
});
