//create class
class Exchange {
  symbol: string;
  lastPrice: number;
  volume: number;
  priceChangePercent: number;
  constructor(s: string, lP: number, v: number, pCp: number) {
    this.symbol = s;
    this.lastPrice = lP;
    this.volume = v;
    this.priceChangePercent = pCp;
  }
}

//getData function - send request to the api https://api2.binance.com/api/v3/ticker/24hr
function getData() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api2.binance.com/api/v3/ticker/24hr");
    xhttp.onload = function () {
      if (xhttp.status == 200) {
        resolve(JSON.parse(xhttp.response));
      } else {
        reject(xhttp.status);
      }
    };
    xhttp.send();
  });
}

//create new Exchanges
let data: Exchange[];
function createDataArray() {
  getData()
    .then((value: any) => {
      data = value.map((exchange: any) => {
        return new Exchange(
          exchange.symbol,
          Number(exchange.lastPrice),
          Number(exchange.volume),
          Number(exchange.priceChangePercent)
        );
      });
      console.log(data);
      updatePage(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//on page load getData()
window.addEventListener("load", createDataArray); //createDataArray();
//display Data function
function updatePage(data: Exchange[]): void {
  //get the table by id/class
  let tableBody = document.querySelector("#tbodyResult")!;
  tableBody.innerHTML = "";
  //run on all the data
  data.forEach((exchange) => {
    //create 1 tr element for the row
    let row = document.createElement("tr");
    //create 4 td elements for symbol,price,volume,precent
    let symboleTd = document.createElement("td");
    let lastPriceTd = document.createElement("td");
    let volumeTd = document.createElement("td");
    let precentTd = document.createElement("td");
    symboleTd.innerText = exchange.symbol;
    lastPriceTd.innerText = exchange.lastPrice.toString();
    volumeTd.innerText = exchange.volume.toString();
    precentTd.innerText = exchange.priceChangePercent.toString();
    //append all td to tr
    row.appendChild(symboleTd);
    row.appendChild(lastPriceTd);
    row.appendChild(volumeTd);
    row.appendChild(precentTd);
    //append tr to the table
    tableBody.appendChild(row);
  });
}

//onClick searchBtn => search

const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
searchBtn.addEventListener("click", findByCurrencyName);

function findByCurrencyName() {
  let currencyName = document.getElementById(
    "currency-name"
  ) as HTMLInputElement;
  let currencyToShow = data.filter((exchange) => {
    return exchange.symbol.includes(currencyName.value.toUpperCase());
    //currencyName.value.toUpperCase() === exchange.symbol;
  });
  updatePage(currencyToShow);
}

//onClick filterByPrice => filter

// const priceSearchBtn = document.getElementById(
//   "price-search-button"
// ) as HTMLButtonElement;

// priceSearchBtn.addEventListener("click", filterExchangeByPrice);

// function filterExchangeByPrice() {
//   let inputMinPrice = document.getElementById("min-price") as HTMLInputElement;
//   let inputMaxPrice = document.getElementById("max-price") as HTMLInputElement;
//   let minValue = Number(inputMinPrice.value);
//   let maxValue = Number(inputMaxPrice.value);
//   console.log(maxValue);
//   console.log(minValue);

//   let filteredPrice = data.filter((exchange) => {
//     if (maxValue === 0) {
//       return exchange.lastPrice >= minValue;
//     }
//     if (minValue === 0) {
//       return exchange.lastPrice <= maxValue;
//     }
//     return exchange.lastPrice >= minValue && exchange.lastPrice <= maxValue;
//   });
//   updatePage(filteredPrice);
// }

function filterByPrice(): void {
  //get the text from the inputs
  let minInputValue = (document.querySelector("#min-price") as HTMLInputElement)
    .value;
  let maxInputValue = (document.querySelector("#max-price") as HTMLInputElement)
    .value;
  //cast to number
  let minPrice = -Infinity;
  let maxPrice = Infinity;
  if (minInputValue != "") {
    minPrice = Number(minInputValue);
  }
  if (maxInputValue != "") {
    maxPrice = Number(maxInputValue);
  }
  //filter the data according to the prices
  let filteredData = data.filter(
    (exchange: Exchange) =>
      exchange.lastPrice >= minPrice && exchange.lastPrice <= maxPrice
  );
  //display data
  updatePage(filteredData);
}
let filterByPriceBtn = document.querySelector(
  "#price-search-button"
) as HTMLButtonElement;
filterByPriceBtn.addEventListener("click", filterByPrice);

//onClick filterByVolume => filter

function filterByVolume(): void {
  //get the text from the inputs
  let minInputValue = (
    document.getElementById("min-volume") as HTMLInputElement
  ).value;
  let maxInputValue = (
    document.getElementById("max-volume") as HTMLInputElement
  ).value;
  //cast to number
  let minVolume = -Infinity;
  let maxVolume = Infinity;
  if (minInputValue != "") {
    minVolume = Number(minInputValue);
  }
  if (maxInputValue != "") {
    maxVolume = Number(maxInputValue);
  }
  //filter the data according to the prices
  let filteredData = data.filter(
    (exchange: Exchange) =>
      exchange.volume >= minVolume && exchange.volume <= maxVolume
  );
  //display data
  updatePage(filteredData);
}

const volumeSearchBtn = document.getElementById(
  "volume-search-button"
) as HTMLButtonElement;
volumeSearchBtn.addEventListener("click", filterByVolume);

// function filterExchangeByVol() {
//   let inputMinVol = document.getElementById("min-volume") as HTMLInputElement;
//   let inputMaxVol = document.getElementById("max-volume") as HTMLInputElement;
//   let minValue = Number(inputMinVol.value);
//   let maxValue = Number(inputMaxVol.value);
//   let filteredVol = data.filter((exchange) => {
//     return exchange.volume >= minValue && exchange.volume <= maxValue;
//   });
//   updatePage(filteredVol);
// }

//onClick getTop10 =>getTop10()

const top10Btn = document.getElementById("top-10-button") as HTMLButtonElement;
top10Btn.addEventListener("click", getTop10Vol);
function getTop10Vol() {
  let sortedVolArray = data.sort((a, b) => {
    return b.volume - a.volume;
  });
  //console.log(sortedVolArray);
  let top10Vol = sortedVolArray.slice(0, 10);
  updatePage(top10Vol);
}

//onClick sortData => sort the data

const sortBtn = document.getElementById("sort-button") as HTMLButtonElement;
sortBtn.addEventListener("click", sortByChosenKey);

function sortByChosenKey() {
  let checkBox = document.getElementById("sort-ascending") as HTMLInputElement;
  let reverseOrder = checkBox.checked == true;
  let selectOption = document.querySelector("#sort-by") as HTMLSelectElement;
  let optionValue = selectOption.value;

  switch (optionValue) {
    case "volume":
      let volSort = data.sort((a, b) => {
        return b.volume - a.volume;
      });
      if (reverseOrder) {
        volSort.reverse();
      }
      updatePage(volSort);
      break;
    case "lastPrice":
      let lPSort = data.sort((a, b) => {
        return b.lastPrice - a.lastPrice;
      });
      if (reverseOrder) {
        lPSort.reverse();
      }
      updatePage(lPSort);
      break;
    case "symbol":
      let sortBySymbol = data.sort((a, b) => {
        const nameA = a.symbol.toUpperCase();
        const nameB = b.symbol.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
      if (reverseOrder) {
        sortBySymbol.reverse();
      }
      updatePage(sortBySymbol);
      break;

    case "priceChangePercent":
      let sortByPercent = data.sort((a, b) => {
        return b.priceChangePercent - a.priceChangePercent;
      });
      if (reverseOrder) {
        sortByPercent.reverse();
      }
      updatePage(sortByPercent);
    default:
      break;
  }
}
