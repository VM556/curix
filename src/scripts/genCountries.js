// const fetch = require('node-fetch');
import fs from "fs";

// Function to fetch currency data
async function fetchCurrencyData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,currencies,flags,cca2,cca3"
    );
    const countries = await response.json();

    // Create an object to store currencies without duplicates
    const currencies = {};

    // Loop through countries and group by currency
    countries.forEach((country) => {
      if (country.currencies) {
        for (const [currencyCode, currencyInfo] of Object.entries(
          country.currencies
        )) {
          if (!currencies[currencyCode]) {
            currencies[currencyCode] = {
              name: currencyInfo.name,
              currencyCode: currencyCode,
              symbol: currencyInfo.symbol || "", // Some currencies may not have a symbol
              countries: [],
              countryCodes: [],
              countryFlags: [],
            };
          }
          currencies[currencyCode].countries.push(country.name.common);
          currencies[currencyCode].countryCodes.push(country.cca3);
          currencies[currencyCode].countryFlags.push(country.flags.svg);
        }
      }
    });

    // Convert currencies object to an array for sorting
    const currenciesArray = Object.values(currencies);

    // Sort by currency name (A to Z)
    currenciesArray.sort((a, b) => a.name.localeCompare(b.name));

    // Save data to a static file in the 'data' folder
    fs.writeFileSync(
      "./src/data/currencies.json",
      JSON.stringify(currenciesArray, null, 2),
      "utf-8"
    );

    console.log("Currencies data saved to currencies.json");
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

// Run the function
fetchCurrencyData();
