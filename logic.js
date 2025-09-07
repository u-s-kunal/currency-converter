document.addEventListener("DOMContentLoaded", () => {
  const amount = document.getElementById("amount");
  const resultDisplay = document.getElementById("result");
  const select = document.querySelectorAll("select");
  const convertorBtn = document.getElementById("convertorBtn");
  const input = document.querySelector(".input");
  let inputValue = 0;
  let Rates = {};

  const CurrencyToCountryCode = {
    AUD: "AU",
    BGN: "BG",
    BRL: "BR",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    CZK: "CZ",
    DKK: "DK",
    EUR: "EU",
    GBP: "GB",
    HKD: "HK",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    ISK: "IS",
    JPY: "JP",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NOK: "NO",
    NZD: "NZ",
    PHP: "PH",
    PLN: "PL",
    RON: "RO",
    SEK: "SE",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    ZAR: "ZA",
    USD: "US", // base currency
  };

  const CurrencyToCountry = {
    AUD: "Australia",
    BGN: "Bulgaria",
    BRL: "Brazil",
    CAD: "Canada",
    CHF: "Switzerland",
    CNY: "China",
    CZK: "Czech Republic",
    DKK: "Denmark",
    EUR: "European Union",
    GBP: "United Kingdom",
    HKD: "Hong Kong",
    HUF: "Hungary",
    IDR: "Indonesia",
    ILS: "Israel",
    INR: "India",
    ISK: "Iceland",
    JPY: "Japan",
    KRW: "South Korea",
    MXN: "Mexico",
    MYR: "Malaysia",
    NOK: "Norway",
    NZD: "New Zealand",
    PHP: "Philippines",
    PLN: "Poland",
    RON: "Romania",
    SEK: "Sweden",
    SGD: "Singapore",
    THB: "Thailand",
    TRY: "Turkey",
    ZAR: "South Africa",
    USD: "United States", // base currency
  };

  // Fetch currency rates from Frankfurter API
  const getRates = async () => {
    try {
      const response = await fetch(
        "https://api.frankfurter.app/latest?from=USD"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      Rates = data.rates;
      Rates[data.base] = 1; // Add base currency USD

      // Populate select options
      for (const code in Rates) {
        select.forEach((s) => {
          const option = document.createElement("option");
          option.textContent = CurrencyToCountry[code] || code; // show country name
          option.value = Rates[code];
          option.dataset.code = code;

          // Make USD default in "from_select"
          if (code === "USD" && s.id === "from_select") {
            option.selected = true;
            document.getElementById(
              "flagFrom"
            ).innerHTML = `<img src="https://flagsapi.com/${CurrencyToCountryCode[code]}/shiny/64.png">`;
          }
          // Make INR default in "to_select"
          if (code === "INR" && s.id === "to_select") {
            option.selected = true;
            document.getElementById(
              "flagTo"
            ).innerHTML = `<img src="https://flagsapi.com/${CurrencyToCountryCode[code]}/shiny/64.png">`;
          }

          s.appendChild(option);
        });
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
      resultDisplay.innerHTML = `<b style="color:red">Failed to fetch rates. Try again later.</b>`;
    }
  };

  getRates();

  // Amount input logic
  amount.addEventListener("change", (e) => {
    inputValue = parseFloat(e.target.value);
  });

  amount.addEventListener("input", (e) => {
    const val = e.target.value;
    if (!isNaN(val) && val !== "") {
      input.style.background = "rgb(225, 225, 228)";
      input.style.border = "none";
      convertorBtn.style.backgroundColor = "rgb(56, 153, 54)";
    } else {
      input.style.border = "3px solid rgb(189, 46, 46)";
      input.style.background = "rgba(242, 125, 125, 0.80)";
      convertorBtn.style.backgroundColor = "rgb(63, 68, 63)";
    }
  });

  // Conversion logic
  convertorBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const fromSelect = document.getElementById("from_select");
    const toSelect = document.getElementById("to_select");
    const rateOfFrom = parseFloat(fromSelect.value);
    const rateOfTo = parseFloat(toSelect.value);

    if (isNaN(inputValue)) {
      resultDisplay.innerHTML = `<b style="color:red">Enter a valid input !!!</b>`;
      return;
    }

    const finalValue = (inputValue / rateOfFrom) * rateOfTo;
    resultDisplay.innerHTML = `Amount = ${finalValue.toFixed(2)}`;
  });

  // Flag update logic
  const updateFlag = (selectElem, flagElemId) => {
    selectElem.addEventListener("change", (e) => {
      const currencyCode = e.target.selectedOptions[0].dataset.code;
      const flagCode = CurrencyToCountryCode[currencyCode] || "UN"; // fallback
      document.getElementById(
        flagElemId
      ).innerHTML = `<img src="https://flagsapi.com/${flagCode}/shiny/64.png">`;
    });
  };

  updateFlag(document.getElementById("from_select"), "flagFrom");
  updateFlag(document.getElementById("to_select"), "flagTo");
});
