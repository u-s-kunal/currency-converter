document.addEventListener("DOMContentLoaded", () => {
  const amount = document.getElementById("amount");
  const resultDisplay = document.getElementById("result");
  const select = document.querySelectorAll("select");
  const convertorBtn = document.getElementById("convertorBtn");
  const input = document.querySelector("input");
  const fromSelect = document.getElementById("from_select");
  const toSelect = document.getElementById("to_select");
  const swapBtn = document.querySelector(".convertor_img"); // the arrow button

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
    USD: "US",
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
    USD: "United States",
  };

  // Fetch currency rates
  const getRates = async () => {
    try {
      const response = await fetch(
        "https://api.frankfurter.app/latest?from=USD"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      Rates = data.rates;
      Rates[data.base] = 1;

      // Populate select options
      for (const code in Rates) {
        select.forEach((s) => {
          const option = document.createElement("option");
          option.textContent = CurrencyToCountry[code] || code;
          option.value = Rates[code];
          option.dataset.code = code;

          // Default selections
          if (code === "USD" && s.id === "from_select") {
            option.selected = true;
            document.getElementById(
              "flagFrom"
            ).innerHTML = `<img src="https://flagsapi.com/${CurrencyToCountryCode[code]}/shiny/64.png">`;
          }
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
      input.style.background = "rgba(40, 40, 40, 0.8)";
      input.style.border = "none";
      convertorBtn.style.background =
        "linear-gradient(90deg, #b51732ff, #111769ff)";
      convertorBtn.style.color = "#fff";
    } else {
      input.style.border = "2px solid #ff4d4d";
      convertorBtn.style.background = "rgba(63, 68, 63, 0.8)";
      convertorBtn.style.color = "#ccc";
    }
  });

  // Conversion logic
  const convertCurrency = () => {
    const rateOfFrom = parseFloat(fromSelect.value);
    const rateOfTo = parseFloat(toSelect.value);

    if (isNaN(inputValue)) {
      resultDisplay.innerHTML = `<b style="color:red">Enter a valid input !!!</b>`;
      return;
    }

    const finalValue = (inputValue / rateOfFrom) * rateOfTo;
    resultDisplay.innerHTML = `Amount = ${finalValue.toFixed(2)}`;
  };

  convertorBtn.addEventListener("click", (e) => {
    e.preventDefault();
    convertCurrency();
  });

  // Update flag
  const updateFlag = (selectElem, flagElemId) => {
    selectElem.addEventListener("change", (e) => {
      const currencyCode = e.target.selectedOptions[0].dataset.code;
      const flagCode = CurrencyToCountryCode[currencyCode] || "UN";
      document.getElementById(
        flagElemId
      ).innerHTML = `<img src="https://flagsapi.com/${flagCode}/shiny/64.png">`;
      convertCurrency();
    });
  };

  updateFlag(fromSelect, "flagFrom");
  updateFlag(toSelect, "flagTo");

  // Swap currencies on arrow click
  swapBtn.addEventListener("click", () => {
    // Swap selected indices
    const tempIndex = fromSelect.selectedIndex;
    fromSelect.selectedIndex = toSelect.selectedIndex;
    toSelect.selectedIndex = tempIndex;

    // Swap flags manually
    const tempFlag = document.getElementById("flagFrom").innerHTML;
    document.getElementById("flagFrom").innerHTML =
      document.getElementById("flagTo").innerHTML;
    document.getElementById("flagTo").innerHTML = tempFlag;

    convertCurrency();
  });
});
