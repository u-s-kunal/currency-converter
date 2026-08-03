import CurrencyToCountryCode from "./CurrencyToCountryCode.js";
import CurrencyToCountry from "./CurrencyToCountry.js";

document.addEventListener("DOMContentLoaded", () => {
  const amount = document.getElementById("amount");
  const resultDisplay = document.getElementById("result");
  const selects = document.querySelectorAll("select");
  const convertorBtn = document.getElementById("convertorBtn");
  const fromSelect = document.getElementById("from_select");
  const toSelect = document.getElementById("to_select");
  const swapBtn = document.querySelector(".convertor_img");

  const flagFrom = document.getElementById("flagFrom");
  const flagTo = document.getElementById("flagTo");

  let rates = {};

  convertorBtn.disabled = true;

  // ----------------------------
  // Fetch Currency Rates
  // ----------------------------
  const getRates = async () => {
    try {
      const response = await fetch(
        "https://api.frankfurter.dev/v1/latest?from=USD",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates.");
      }

      const data = await response.json();

      rates = {
        ...data.rates,
        [data.base]: 1,
      };

      for (const code in rates) {
        selects.forEach((select) => {
          const option = document.createElement("option");

          option.textContent = CurrencyToCountry[code] || code;
          option.value = rates[code];
          option.dataset.code = code;

          if (code === "USD" && select.id === "from_select") {
            option.selected = true;
          }

          if (code === "INR" && select.id === "to_select") {
            option.selected = true;
          }

          select.appendChild(option);
        });
      }

      updateFlag(fromSelect, flagFrom);
      updateFlag(toSelect, flagTo);

      convertorBtn.disabled = false;
    } catch (error) {
      console.error(error);
      resultDisplay.innerHTML =
        '<b style="color:red">Failed to fetch exchange rates.</b>';
    }
  };

  getRates();

  // ----------------------------
  // Update Button Styling
  // ----------------------------
  amount.addEventListener("input", () => {
    const value = amount.value.trim();

    if (value !== "" && !isNaN(parseFloat(value))) {
      amount.style.background = "rgba(40,40,40,0.8)";
      amount.style.border = "none";

      convertorBtn.style.background = "linear-gradient(90deg,#b51732,#111769)";
      convertorBtn.style.color = "#fff";
    } else {
      amount.style.border = "2px solid #ff4d4d";

      convertorBtn.style.background = "rgba(63,68,63,0.8)";
      convertorBtn.style.color = "#ccc";
    }
  });

  // ----------------------------
  // Convert Currency
  // ----------------------------
  const convertCurrency = () => {
    const inputValue = parseFloat(amount.value);

    if (isNaN(inputValue) || inputValue <= 0) {
      resultDisplay.innerHTML =
        '<b style="color:red">Please enter a valid amount.</b>';
      return;
    }

    const rateOfFrom = parseFloat(fromSelect.value);
    const rateOfTo = parseFloat(toSelect.value);

    if (isNaN(rateOfFrom) || isNaN(rateOfTo)) {
      resultDisplay.innerHTML =
        '<b style="color:red">Currency rates not available.</b>';
      return;
    }

    const convertedAmount = (inputValue / rateOfFrom) * rateOfTo;

    const fromCode = fromSelect.selectedOptions[0].dataset.code;

    const toCode = toSelect.selectedOptions[0].dataset.code;

    resultDisplay.innerHTML = `
      ${inputValue} ${fromCode} =
      <strong>${convertedAmount.toFixed(2)} ${toCode}</strong>
    `;
  };

  convertorBtn.addEventListener("click", (e) => {
    e.preventDefault();
    convertCurrency();
  });

  // ----------------------------
  // Update Flag
  // ----------------------------
  function updateFlag(selectElement, flagElement) {
    const currencyCode = selectElement.selectedOptions[0]?.dataset.code;

    const countryCode = CurrencyToCountryCode[currencyCode] || "UN";

    flagElement.innerHTML = `
      <img
        src="https://flagsapi.com/${countryCode}/shiny/64.png"
        alt="${currencyCode} flag"
      >
    `;
  }

  fromSelect.addEventListener("change", () => {
    updateFlag(fromSelect, flagFrom);
    convertCurrency();
  });

  toSelect.addEventListener("change", () => {
    updateFlag(toSelect, flagTo);
    convertCurrency();
  });

  // ----------------------------
  // Swap Currency
  // ----------------------------
  swapBtn.addEventListener("click", () => {
    const fromValue = fromSelect.value;
    const fromIndex = fromSelect.selectedIndex;

    fromSelect.value = toSelect.value;
    toSelect.value = fromValue;

    if (fromSelect.value === "") {
      fromSelect.selectedIndex = toSelect.selectedIndex;
      toSelect.selectedIndex = fromIndex;
    }

    updateFlag(fromSelect, flagFrom);
    updateFlag(toSelect, flagTo);

    convertCurrency();
  });
});
