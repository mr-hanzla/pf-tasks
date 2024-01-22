const countryObj = {
    Pakistan: {
        states: {
            Punjab: ["Lahore", "Faisalabad", "Islamabad", "Jehlum"],
            Sindh: ["Karachi", "Hedarabad"],
            Balochistan: ["Gawadar"],
            KPK: ["Peshawar"],
        },
    },
    USA: {
        states: {
            California: ["Los Angeles", "San Francisco", "San Diego"],
            Texas: ["Houston", "Dallas", "Austin"],
            NewYork: ["New York City", "Buffalo", "Albany"],
        },
    },
    India: {
        states: {
            Maharashtra: ["Mumbai", "Pune", "Nagpur"],
            Delhi: ["New Delhi", "Noida", "Gurgaon"],
            Karnataka: ["Bangalore", "Mysore", "Hubli"],
        },
    },
    Canada: {
        states: {
            Ontario: ["Toronto", "Ottawa", "Hamilton"],
            Quebec: ["Montreal", "Quebec City", "Laval"],
            BritishColumbia: ["Vancouver", "Victoria", "Surrey"],
        },
    },
}

// ========================================================
function addDisabledOption(value, element) {
    const optionElement = document.createElement("option");
    optionElement.innerText = value;
    optionElement.setAttribute("value", value);
    optionElement.disabled = true;
    optionElement.selected = true;

    element.appendChild(optionElement);
}

function addIntoSelection(value, element) {
    const optionElement = document.createElement("option");
    optionElement.innerText = value;
    optionElement.setAttribute("value", value);

    element.appendChild(optionElement);
}

function updateStates() {
    let country = countryDropdown.value;
    let states = Object.keys(countryObj[country].states);

    resetStateDropdown();
    states.forEach(function(value) { addIntoSelection(value, stateDropdown) });
}

function updateCities() {
    let country = countryDropdown.value;
    let state = stateDropdown.value;

    resetCityDropdown();
    let cities = countryObj[country].states[state];
    cities.forEach(function(value) {
        addIntoSelection(value, cityDropdown);
    });

}

function resetCityDropdown() {
    cityDropdown.innerHTML = "";
    addDisabledOption("Select City", cityDropdown);
}

function resetStateDropdown() {
    stateDropdown.innerHTML = "";
    addDisabledOption("Select State", stateDropdown);

    resetCityDropdown();
}

// ============================== COUNTRY SELECTION ==============================
let countryDropdown = document.getElementById("countries");
countryDropdown.onchange = updateStates;

// ============================== STATE SELECTION ==============================
let stateDropdown = document.getElementById("states");
stateDropdown.onchange = updateCities;

// ============================== CITY SELECTION ==============================
let cityDropdown = document.getElementById("cities");

// add countries to dropdown list
resetStateDropdown();
let allCountries = Object.keys(countryObj);
addDisabledOption("Select Country", countryDropdown);
allCountries.forEach(function(value) { 
    addIntoSelection(value, countryDropdown);
});
