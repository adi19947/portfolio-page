const apiKey = "6395ab03267edbf2f90fa9b7"

//find airports in specific city
const searchAirports = document.getElementById('searchAirports').addEventListener('click', getAirportsByCityName);

function getAirportsByCityName() {
    const cityInputValue = getInputValueById('city-input');
    const promiseGetAirports = new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        if (cityInputValue === "") {
            return;
        }
        xhttp.open("GET", `https://api.flightapi.io/iata/${apiKey}?name=${cityInputValue}&type=airport`);

        xhttp.onload = function () {
            if (xhttp.status == 200) {
                resolve(xhttp.response);
            } else {
                reject(xhttp.status)
            }
        };

        xhttp.send()
    });

    promiseGetAirports.then((res) => {
        displayAirPortsOnPage(JSON.parse(res));
    }).catch((error) => {
        console.log(error);
    })
}

function getInputValueById(id) {
    return document.getElementById(id).value;
}



//display airports list in HTML
function displayAirPortsOnPage(data) {
    clearInnerHTML('airportsResult');
    const resultContainer = document.getElementById('airportsResult');
    let title = document.createElement('h1');
    title.style.textDecoration = "underline";

    title.innerText = "airports list:";
    resultContainer.appendChild(title);
    for (const key in data) {
        let array = data[key];
        array.map((value, index) => {
            let h2Element = document.createElement('h2');
            h2Element.innerText = `${index + 1}. ${value.name}  :   ${value.fs}`;
            resultContainer.appendChild(h2Element);
        })
        if (array == '') {
            let noResult = document.createElement('h1');
            noResult.innerText = "No results found";
            resultContainer.appendChild(noResult);
        }

    }
}

const searchFlights = document.getElementById('searchFlights').addEventListener('click', getFlightsResult);
//build request of flights to api
function getFlightsResult() {
    const departureAirportCode = getInputValueById('takeOffInput');
    const arrivalAirportCode = getInputValueById('landingInput');
    const directions = getInputValueById('directions');
    const departureDate = getInputValueById('startDateInput');
    const returnDate = getInputValueById('endDateInput');
    let trip;
    let url;
    const promiseGetFlights = new Promise((resolve, reject) => {


        console.log(returnDate);

        if (directions == 'roundtrip') {
            trip = 'roundtrip';
        }
        else {
            trip = "onewaytrip";
        }

        url = `https://api.flightapi.io/${trip}/${apiKey}/${departureAirportCode}/${arrivalAirportCode}/${departureDate}`;
        if (directions == "roundtrip") {
            url += `/${returnDate}`
        }
        url += `/1/0/0/Economy/USD`;
        console.log(url);
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url);

        console.log("lol");
        xhttp.onload = function () {
            if (xhttp.status == 200) {
                resolve(xhttp.response)
            } else {
                reject(xhttp.status)
            }
        };

        xhttp.send()
    });
    promiseGetFlights.then((res) => {
        displayFlightsOnPage(JSON.parse(res));
    }).catch((error) => {
        console.log(error);
    })

}








//display flights list in HTML
function displayFlightsOnPage(data) {
    clearInnerHTML('flightsResultContainer');
    const flightsResultContainer = document.getElementById('flightsResultContainer');
    let title = document.createElement('h1');
    title.style.backgroundColor = "rgba(0, 0, 80, 0.3)"
    title.style.textDecoration = "underline";
    title.style.color = "aliceblue";
    title.innerText = "Flights list:";
    flightsResultContainer.appendChild(title);
    let trips = data.trips;
    trips.map((trip, index) => {
        let fares = data.fares;
        const fare = fares.find((fare) => {
            return fare.tripId === trip.id;
        })
        let divElement = document.createElement('div');
        divElement.className = "flightDiv";
        let pElement = document.createElement('p');
        pElement.innerText = `Flight ${index + 1}:\n id: ${trip.id}\nprice: ${fare.price.totalAmount}$`
        divElement.appendChild(pElement);


        console.log(fare.price.totalAmount);
        flightsResultContainer.appendChild(divElement);
    })
    document.body.appendChild(flightsResultContainer);
}




function clearInnerHTML(id) {
    const container = document.getElementById(id); container.innerHTML = "";
}

