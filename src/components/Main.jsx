import React, { useState, useEffect } from "react";
import { getRate } from "../services/exchangeRateAPI";
import Option from "./Option";
import FullInput from "./FullInput";
import { fetchCountries } from "../services/countriesAPI";
import allCurrencies from "../data/currencies.json";
// import { fetchCountries } from "../services/countriesAPI";

export default function Main() {
  const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  const INITIAL_COUNTRIES = ["Australian dollar", "United States dollar"];
  // Currency
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  // Countries
  const [baseCountry, setBaseCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  // Rate
  const [rate, setRate] = useState(1);
  // All Countries
  // const [allCountries, setAllCountries] = useState([]);
  // ------------ Unnecessary Fetches - data moved to static json file
  // Fetch all countries for the dropdowns
  // useEffect(() => {
  //   async function fetchAllCountries() {
  //     try {
  //       const response = await fetch(
  //         "https://restcountries.com/v3.1/all?fields=name,currencies,flags,cca2,cca3"
  //       );
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       const data = await response.json();
  //       setAllCountries(data);
  //       console.log("allCountries", allCountries);
  //     } catch (err) {
  //       throw new Error("There was a problem with the fetch operation:", err);
  //     }
  //   }
  //   fetchAllCountries();
  // }, []);
  useEffect(() => {
    // Initially fetch the country details
    try {
      handleCurrencySelection(INITIAL_COUNTRIES[0], "baseCurrency");
      handleCurrencySelection(INITIAL_COUNTRIES[1], "targetCurrency");
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    // get exchange rate
    async function getRate() {
      if (!baseCurrency || !targetCurrency) return;
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );
      // console.log("response:", response);
      const { conversion_rates: conversionRates } = await response.json();
      console.log(conversionRates);
      const rate = conversionRates[targetCurrency];
      console.log("rate before:", rate);
      setRate(rate);
      console.log("rate after:", rate);
      console.log(
        `Exchange rate from ${baseCurrency} to ${targetCurrency}: ${rate}`
      );
    }
    getRate();
  }, [baseCurrency, targetCurrency]);

  // Useless console logs
  useEffect(() => {
    console.log("Base Country: ", baseCountry);
    console.log("Target Country: ", targetCountry);
  }, [baseCountry, targetCountry]);

  // async function findCountryDetails(countryCode) {
  //   try {
  //     const response = await fetch(
  //       `https://restcountries.com/v3.1/alpha/${countryCode}`
  //     );
  //     if (!response.ok) throw new Error("Network response was not ok");
  //     const data = await response.json();
  //     // console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //     return;
  //   }
  // }

  function swapCountries() {
    const tempCountry = baseCountry;
    setBaseCountry(targetCountry);
    setTargetCountry(tempCountry);
  }

  function handleCurrencySelection(currency, source) {
    console.log(
      "Starting handleCurrencySelection function...",
      currency,
      source
    );
    try {
      console.log("trying");
      for (let i = 0; i < allCurrencies.length - 1; i++) {
        console.log("i: ", i);
        if (allCurrencies[i].name === currency) {
          if (source === "baseCurrency") {
            setBaseCountry([allCurrencies[i]]);
            console.log("setBaseCountry");
            setBaseCurrency(allCurrencies[i].currencyCode);
            console.log("setBaseCurrency");
          } else if (source === "targetCurrency") {
            setTargetCountry([allCurrencies[i]]);
            console.log("setTargetCountry");
            setTargetCurrency(allCurrencies[i].currencyCode);
            console.log("setTargetCurrency");
          } else {
            throw new Error("Edge Case while setting the country or currency");
          }
          return;
        }
      }
      throw new Error("Couldn't update country and/or currency");
    } catch (err) {
      throw new Error(err);
    }
  }

  // function handleOptionChange(countryCodes, source) {
  //   console.log(
  //     "Handle change happening now...Value was:",
  //     countryCodes,
  //     "arose from:",
  //     source
  //   );

  //   countryCodes.forEach(async (countryCode) => {
  //     if (source === "baseCurrency") {
  //       try {
  //         const countryDetails = await findCountryDetails(countryCode);
  //         console.log("Changing Base: ", countryDetails);
  //         setBaseCountry(countryDetails[0]);
  //         setBaseCurrency(countryDetails[0]);
  //       } catch (err) {
  //         throw new Error(
  //           "Couldn't set the country or currency to selected value",
  //           err
  //         );
  //       }
  //     } else if (source === "targetCurrency") {
  //       try {
  //         const countryDetails = await findCountryDetails(countryCode);
  //         console.log("Changing Target: ", countryDetails);
  //         setTargetCountry(countryDetails[0]);
  //         setTargetCurrency(countryDetails[0]);
  //       } catch (err) {
  //         throw new Error(
  //           "Couldn't set the country or currency to selected value",
  //           err
  //         );
  //       }
  //     } else {
  //       throw new Error("Edge Case while setting the country or currency");
  //     }
  //   });
  // }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen text-2xl">
        <form className="flex flex-col justify-center items-center space-y-4 text-2xl">
          <FullInput
            htmlFor="baseCurrency" // For the form essentially
            name="Convert from" // Name for the label
            country={baseCountry} // Country object or array of objects (multiple countries)
            rate={1}
            // currencyFor={baseCurrency} // Needs to be removed
            // setCurrency={setBaseCurrency}
            allCurrencies={allCurrencies} // allCurrencies JSON
            handleCurrencySelection={handleCurrencySelection} // passing down handleOptionChange function
          />
          <button
            onClick={swapCountries}
            className="btn btn-soft-primary m-1 mb-5"
            title="Swap Countries"
          >
            ⬆️⬇️
          </button>
          <FullInput
            htmlFor="targetCurrency" // For the form essentially
            name="To" // Name for the label
            country={targetCountry} // Country object or array of objects (multiple countries)
            rate={rate}
            // currencyFor={targetCurrency} // Needs to be removed
            // setCurrency={setTargetCurrency}
            allCurrencies={allCurrencies} // allCurrencies JSON
            handleCurrencySelection={handleCurrencySelection} // passing down handleOptionChange function
          />
          {/* <button
            type="button"
            onClick={getRate}
            className="btn btn-soft btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl w-64 rounded-full "
          >
            Get Exchange Rate
          </button> */}
        </form>
      </div>
    </>
  );
}
