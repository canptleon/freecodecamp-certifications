document.getElementById("check-btn").addEventListener("click", () => {
  const phoneNumber = document.getElementById("user-input").value;
  const resultsDiv = document.getElementById("results-div");

  if (!phoneNumber) {
    alert("Please provide a phone number");
    return;
  }

  const validUSPhoneNumber =
    /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

  if (validUSPhoneNumber.test(phoneNumber)) {
    resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
  }
});

document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("user-input").value = "";
  document.getElementById("results-div").textContent = "";
});
