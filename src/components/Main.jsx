import { Suspense, useState, useEffect } from "react";
import { getRate } from "../services/exchangeRateAPI";
import Option from "./Option";
import FullInput from "./FullInput";
import { fetchCountries } from "../services/countriesAPI";
import allCurrencies from "../data/currencies.json";
import SwapButton from "./SwapButton";
// import { fetchCountries } from "../services/countriesAPI";

export default function Main() {
  const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  const INITIAL_CURRENCIES = ["Australian dollar", "United States dollar"];
  const [isLoading, setIsLoading] = useState(true);
  // Currency
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  // Countries
  const [baseCountry, setBaseCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  // Rate
  const [baseValue, setBaseValue] = useState(1);
  const [rate, setRate] = useState("");

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
    setIsLoading(true);
    try {
      handleCurrencySelection(INITIAL_CURRENCIES[0], "baseCurrency");
      handleCurrencySelection(INITIAL_CURRENCIES[1], "targetCurrency");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    // get exchange rate
    // console.log("BaseValue before getRate()", baseValue);
    // console.log("NAN:", Number.isNaN(baseValue));
    if (!baseValue || baseValue == 0) {
      console.log("return 1");
      return;
    }

    async function getRate() {
      if (!baseCurrency || !targetCurrency) {
        console.log("return 2");
        return;
      }
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );
      // console.log("response:", response);
      const { conversion_rates: conversionRates } = await response.json();
      console.log(conversionRates);
      let rate = conversionRates[targetCurrency];
      rate = rate * baseValue;
      console.log("Final Rate:", rate);
      setRate(rate);
      console.log(
        `Exchange rate from ${baseCurrency} to ${targetCurrency}: ${rate}`
      );
    }
    baseValue && getRate();
  }, [baseCurrency, targetCurrency, baseValue]);

  // Useless console logs
  useEffect(() => {
    console.log("Base Country: ", baseCountry);
    console.log("Target Country: ", targetCountry);
    console.log("Base Value: ", baseValue);
    console.log("Rate: ", rate);
  }, [baseCountry, targetCountry, baseValue]);

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

  function swapCountries(event) {
    event.preventDefault();
    if (!baseCurrency || !targetCurrency) return;
    setIsLoading(true);
    const tempCountry = baseCountry;
    const tempCurrency = baseCurrency;
    setBaseCountry(targetCountry);
    setBaseCurrency(targetCurrency);
    setTargetCountry(tempCountry);
    setTargetCurrency(tempCurrency);
    setIsLoading(false);
  }

  function handleCurrencySelection(currency, source) {
    console.log(
      "Starting handleCurrencySelection function...",
      currency,
      source
    );
    // if(base)
    try {
      for (let i = 0; i < allCurrencies.length - 1; i++) {
        // console.log("i: ", i);
        if (allCurrencies[i].name === currency) {
          if (source === "baseCurrency") {
            setBaseCountry([allCurrencies[i]]);
            // console.log("setBaseCountry");
            setBaseCurrency(allCurrencies[i].currencyCode);
            // console.log("setBaseCurrency");
          } else if (source === "targetCurrency") {
            setTargetCountry([allCurrencies[i]]);
            // console.log("setTargetCountry");
            setTargetCurrency(allCurrencies[i].currencyCode);
            // console.log("setTargetCurrency");
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
      <div className="flex flex-col mt-7 md:mt-7 items-center justify-center  max-h-screen text-2xl ">
        {!isLoading && <div className="flex flex-col items-start my-5 w-2xs md:w-125">
          <h2 className="text-slate-700 text-lg">
            {`${baseValue} ${baseCurrency} equals`}
          </h2>
          <h1>{`${rate} ${targetCountry[0]?.name}`}</h1>
        </div>}
        <form className="flex flex-col justify-center items-center space-y-4 text-2xl">
          <FullInput
            htmlFor="baseCurrency" // For the form essentially
            name="Convert from" // Name for the label
            country={baseCountry[0]} // Country object or array of objects (multiple countries)
            baseValue={baseValue}
            // currencyFor={baseCurrency} // Needs to be removed
            // setCurrency={setBaseCurrency}
            isLoading={isLoading}
            allCurrencies={allCurrencies} // allCurrencies JSON
            handleCurrencySelection={handleCurrencySelection} // passing down handleOptionChange function
            setBaseValue={setBaseValue}
          />
          <SwapButton swapCountries={swapCountries} />
          <FullInput
            htmlFor="targetCurrency" // For the form essentially
            name="To" // Name for the label
            country={targetCountry[0]} // Country object or array of objects (multiple countries)
            rate={rate}
            // currencyFor={targetCurrency} // Needs to be removed
            // setCurrency={setTargetCurrency}
            isLoading={isLoading}
            allCurrencies={allCurrencies} // allCurrencies JSON
            handleCurrencySelection={handleCurrencySelection} // passing down handleOptionChange function
          />
        </form>
      </div>
    </>
  );
}
