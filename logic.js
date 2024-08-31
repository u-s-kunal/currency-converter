let amount = document.getElementById("amount");
let resultDisplay = document.getElementById("result");
let select = document.querySelectorAll("select");
let convertorBtn = document.getElementById("convertorBtn");
let inputValue = 0;
let fromSelect = document.getElementById("from_select");
let toSelect = document.getElementById("to_select");
let input = document.querySelector(".input");

//////////RATESSS////////////
let Rates = {
  AED: 4.101573,
  AFN: 78.909784,
  ALL: 99.986583,
  AMD: 433.083754,
  ANG: 2.010102,
  AOA: 1013.417796,
  ARS: 1059.496025,
  AUD: 1.641912,
  AWG: 2.010084,
  AZN: 1.879901,
  BAM: 1.955561,
  BBD: 2.252045,
  BDT: 133.423666,
  BGN: 1.955915,
  BHD: 0.420807,
  BIF: 3221.58799,
  BMD: 1.116713,
  BND: 1.454424,
  BOB: 7.716195,
  BRL: 6.152305,
  BSD: 1.115335,
  BTC: 0.000018734684,
  BTN: 93.725994,
  BWP: 14.822187,
  BYN: 3.65006,
  BYR: 21887.580473,
  BZD: 2.24825,
  CAD: 1.501869,
  CDF: 3177.04914,
  CHF: 0.941608,
  CLF: 0.036738,
  CLP: 1013.718624,
  CNY: 7.960717,
  CNH: 7.963143,
  COP: 4513.576442,
  CRC: 588.926695,
  CUC: 1.116713,
  CUP: 29.592902,
  CVE: 110.809692,
  CZK: 25.007902,
  DJF: 198.614707,
  DKK: 7.460204,
  DOP: 66.573888,
  DZD: 149.552417,
  EGP: 54.37143,
  ERN: 16.750699,
  ETB: 126.756383,
  EUR: 1,
  FJD: 2.457108,
  FKP: 0.869385,
  GBP: 0.842856,
  GEL: 3.009487,
  GGP: 0.869385,
  GHS: 17.476633,
  GIP: 0.869385,
  GMD: 79.286759,
  GNF: 9615.007401,
  GTQ: 8.648258,
  GYD: 233.615918,
  HKD: 8.708845,
  HNL: 27.637403,
  HRK: 7.669686,
  HTG: 147.061868,
  HUF: 392.739684,
  IDR: 17262.321535,
  ILS: 4.111177,
  IMP: 0.869385,
  INR: 93.73917,
  IQD: 1462.894409,
  IRR: 47005.25294,
  ISK: 152.899988,
  JEP: 0.869385,
  JMD: 174.900041,
  JOD: 0.791418,
  JPY: 161.288041,
  KES: 144.056387,
  KGS: 95.073056,
  KHR: 4544.804038,
  KMF: 492.74947,
  KPW: 1005.041871,
  KRW: 1491.962451,
  KWD: 0.34091,
  KYD: 0.930528,
  KZT: 536.425991,
  LAK: 24633.058222,
  LBP: 99879.404764,
  LKR: 335.388941,
  LRD: 217.814848,
  LSL: 19.805135,
  LTL: 3.297364,
  LVL: 0.675489,
  LYD: 5.309977,
  MAD: 10.765674,
  MDL: 19.395999,
  MGA: 5092.223787,
  MKD: 61.522351,
  MMK: 3627.041204,
  MNT: 3794.591096,
  MOP: 8.972467,
  MRU: 44.178492,
  MUR: 51.55847,
  MVR: 17.141257,
  MWK: 1933.988919,
  MXN: 22.023145,
  MYR: 4.850444,
  MZN: 71.357969,
  NAD: 19.821356,
  NGN: 1775.518748,
  NIO: 41.053065,
  NOK: 11.697041,
  NPR: 149.785754,
  NZD: 1.786127,
  OMR: 0.429877,
  PAB: 1.116628,
  PEN: 4.1793,
  PGK: 4.406962,
  PHP: 62.799496,
  PKR: 310.401206,
  PLN: 4.282618,
  PYG: 8497.361271,
  QAR: 4.065674,
  RON: 4.977971,
  RSD: 117.04163,
  RUB: 102.176584,
  RWF: 1492.793326,
  SAR: 4.190238,
  SBD: 9.384808,
  SCR: 14.273234,
  SDG: 671.700744,
  SEK: 11.346756,
  SGD: 1.455033,
  SHP: 0.869385,
  SLE: 25.513887,
  SLL: 23416.883812,
  SOS: 637.371309,
  SRD: 32.19493,
  STD: 23113.710456,
  SVC: 9.768804,
  SYP: 2805.775858,
  SZL: 19.810529,
  THB: 37.916888,
  TJS: 11.903402,
  TMT: 3.908497,
  TND: 3.395646,
  TOP: 2.611767,
  TRY: 38.076634,
  TTD: 7.584192,
  TWD: 35.681254,
  TZS: 3031.876721,
  UAH: 46.13046,
  UGX: 4144.492622,
  USD: 1.116713,
  UYU: 44.954497,
  UZS: 14148.757179,
  VEF: 4045352.556921,
  VES: 40.807644,
  VND: 27741.949893,
  VUV: 132.578411,
  WST: 3.127828,
  XAF: 655.207917,
  XAG: 0.0374,
  XAU: 0.000444,
  XCD: 3.017974,
  XDR: 0.82866,
  XOF: 655.213778,
  XPF: 119.331742,
  YER: 278.98285,
  ZAR: 19.813899,
  ZMK: 10051.754036,
  ZMW: 29.305758,
  ZWL: 359.581224,
};
///////////// polupatng data of select i.e. country codes //////////////

// async function getData() {
//   const URL = `https://api.exchangeratesapi.io/v1/latest?access_key=b8e5e4be914ec01f1cd06bf5808f6f79`;

//   const response = await fetch(URL);
//   if (!response.ok) {
//     throw new console.error(response.status);
//   }

// const json = await response.json();

// let ConversionRates = json.rates;
getData = () => {
  for (rate in Rates) {
    for (let i = 0; i < select.length; i++) {
      let option = document.createElement("option");
      option.innerHTML = `<p style ="font-size: 1.2rem;">${rate}</p>`;
      select[i].appendChild(option);
      let ratex = Rates[rate];
      option.value = ratex;
    }
  }
};

getData();
/////////////Amount change algorithm//////////////////
amount.onchange = () => {
  let enteredAmount = event.target.value;

  inputValue = enteredAmount;
};
/// ALGORITH FOR WRONG INPUT EFFECTS ////

amount.oninput = () => {
  let enterdText = event.target.value;
  if (enterdText * 0 === 0) {
    input.style.background = "rgb(225, 225, 228)";
    input.style.border = "none";
    convertorBtn.style = " background-color: rgb(56, 153, 54";
  } else {
    input.style.border = "3px solid rgb(189, 46, 46)";
    input.style.background = " rgba(242, 125, 125, 0.80)";
    convertorBtn.style = "  background-color: rgb(63, 68, 63";
  }
};
//////////main  btn///////////
convertorBtn.onclick = () => {
  event.preventDefault();

  ///////selection logic From ///////

  fromSelect = document.getElementById("from_select");
  let rateOfFrom = fromSelect.value;

  // console.log(`rate of from  ${rateOfFrom}`);

  ///////selection logic to ///////

  toSelect = document.getElementById("to_select");
  let rateOfTo = toSelect.value;
  // console.log(`rate of to  ${rateOfTo}`);

  // console.log(`input value = ${inputValue}`);

  ///////////FINAL LOGIC //////////

  let finalValue;
  let finalFrom;

  if (finalFrom < rateOfTo) {
    finalFrom = inputValue * rateOfFrom;
    finalValue = rateOfTo / finalFrom;
  } else {
    finalFrom = inputValue / rateOfFrom;
    finalValue = rateOfTo * finalFrom;
  }
  /////////// Result display //////////

  if (inputValue * 0 !== 0) {
    resultDisplay.innerHTML = `<b style="color: rgb(189, 46, 46);"> Enter A valid Input  !!!</b>`;
  } else {
    console.log(`final value = ${finalValue}`);
    resultDisplay.innerHTML = ` Amount =  ${finalValue.toFixed(2)}`;
  }
};

///Now adding and changing Flags /////

fromSelect.onchange = (event) => {
  const target = event.target;
  const desc = target.selectedOptions[0].text;
  let flagFromCode = desc.slice(0, 2);
  let flagFrom = `<img src="https://flagsapi.com/${flagFromCode}/shiny/64.png">`;

  let flagFromChange = document.getElementById("flagFrom");
  flagFromChange.innerHTML = flagFrom;
};
toSelect.onchange = (event) => {
  const target = event.target;
  const desc = target.selectedOptions[0].text;
  let flagToCode = desc.slice(0, 2);
  let flagTO = `<img src="https://flagsapi.com/${flagToCode}/shiny/64.png">`;

  let flagToChange = document.getElementById("flagTo");
  flagToChange.innerHTML = flagTO;
};
