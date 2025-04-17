import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import FullInput from "./FullInput";
import allCurrencies from "../data/currencies.json";
import SwapButton from "./SwapButton";
import { useTheme } from "../contexts/ThemeContext";
import log from "../utils/logger";

export default function Main() {
  const { darkMode } = useTheme();
  const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  const INITIAL_CURRENCIES = ["Australian dollar", "United States dollar"];
  const [isLoading, setIsLoading] = useState(true);
  // Currency
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  // Countries
  const [baseCountry, setBaseCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  // Base Value
  const [baseValue, setBaseValue] = useState("1");
  // Rate
  const [rate, setRate] = useState("");
  const [allRates, setAllRates] = useState("");

  // Step 1 Initiator
  useEffect(() => {
    // Initially fetch the country details
    async function initiateCountries() {
      setIsLoading(true);
      try {
        await handleCurrencySelection(INITIAL_CURRENCIES[0], "baseCurrency");
        await handleCurrencySelection(INITIAL_CURRENCIES[1], "targetCurrency");
      } catch (err) {
        throw new Error(err);
      } finally {
        setIsLoading(false);
      }
    }
    initiateCountries();
  }, []);

  // Step 3
  useEffect(() => {
    async function fetchRate() {
      if (!baseCurrency || !targetCurrency) {
        console.error("Currency not loaded in fetchRate");
        return;
      }
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        log("allRates (OUTGOING):", data.conversion_rates);
        setAllRates(data.conversion_rates);
        console.info(
          `Exchange rate from ${baseCurrency} to ${targetCurrency}: ${data.conversion_rates[targetCurrency]}`
        );
      } catch (err) {
        throw new Error("Could not fetch the rate", err);
      }
    }
    fetchRate();
  }, [baseCountry, targetCountry]);

  // Step 4
  useEffect(() => {
    async function calculateRate() {
      if (!baseValue || baseValue === 0) {
        log("Base value is zero or not set, skipping rate calculation.");
        return;
      }
      if (!baseCurrency || !targetCurrency) {
        log("Currency Error: baseCurrency or targetCurrency not set.");
        return;
      }
      if (!allRates) {
        log("Currencies loaded but allRates not loaded");
        return;
      }
      if (baseValue.slice(-1) == ".") {
        return;
      }
      try {
        const newBaseValue = baseValue.replace(/,/g, "");
        log("allRates (INCOMING):", allRates);
        let rate = allRates[targetCurrency];
        rate = (rate * newBaseValue).toFixed(3);
        rate = Number(rate).toLocaleString();
        log("Final Rate:", rate);
        setRate(rate);
      } catch (err) {
        throw new Error("Error calculating rate:", err);
      }
    }
    calculateRate();
  }, [baseCountry, targetCountry, baseValue, allRates]);

  // Step 5
  // Useless console logs
  useEffect(() => {
    log(
      "(U) Base Country:",
      baseCountry,
      ", (U) Target Country:",
      targetCountry,
      ", (U) Base Value:",
      baseValue,
      ", (U) Rate:",
      rate
    );
  }, [baseCountry, targetCountry, baseValue, rate]);

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

  // Step 2
  function handleCurrencySelection(currency, source) {
    log("Starting handleCurrencySelection function...", currency, source);
    try {
      const selectedCurrency = allCurrencies.find((c) => c.name === currency);
      if (!selectedCurrency) {
        throw new Error("Couldn't find currency in allCurrencies");
      }
      if (source === "baseCurrency") {
        setBaseCurrency(selectedCurrency.currencyCode);
        setBaseCountry([selectedCurrency]);
      } else if (source === "targetCurrency") {
        setTargetCurrency(selectedCurrency.currencyCode);
        setTargetCountry([selectedCurrency]);
      } else {
        throw new Error("Edge Case while setting the country or currency");
      }
    } catch (err) {
      console.error("Error in handleCurrencySelection:", err);
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center max-h-auto text-2xl transition-all duration-300 max-w-screen overflow-x-hidden`}
    >
      {!isLoading && (
        <div className="flex flex-col items-start my-5 w-2xs md:w-125">
          <h2 className={clsx("text-gray-600: ", "text-lg font-normal")}>
            {`${baseValue} ${baseCountry[0]?.name} equals`}
          </h2>
          <h1 className="font-semibold">{`${rate} ${targetCountry[0]?.name}`}</h1>
        </div>
      )}
      <form className="flex flex-col justify-center items-center text-2xl">
        <FullInput
          htmlFor="baseCurrency" // For the form essentially
          name="Convert from:" // Name for the label
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
          name="To:" // Name for the label
          country={targetCountry[0]} // Country object or array of objects (multiple countries)
          rate={rate}
          // currencyFor={targetCurrency} // Needs to be removed
          // setCurrency={setTargetCurrency}
          isLoading={isLoading}
          allCurrencies={allCurrencies} // allCurrencies JSON
          handleCurrencySelection={handleCurrencySelection} // passing down handleOptionChange function
        />
      </form>
      <footer className="mt-8 text-base text-gray-400">Made by <a className="link"href="https://github.com/RockyBoiOff/">Vans</a> &copy; 2025</footer>
    </div>
  );
}
