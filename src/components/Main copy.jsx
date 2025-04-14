import { Suspense, useState, useEffect, useCallback } from "react";
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
  // Rate
  const [baseValue, setBaseValue] = useState(1);
  const [rate, setRate] = useState("");
  const [allRates, setAllRates] = useState(null);

  // Step 1: Handle currency selection
  const handleCurrencySelection = useCallback(
    (currency, source) => {
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
    },
    [
      allCurrencies,
      setBaseCurrency,
      setBaseCountry,
      setTargetCurrency,
      setTargetCountry,
    ]
  );

  // Step 2: Fetch initial data and set currencies
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        await handleCurrencySelection(INITIAL_CURRENCIES[0], "baseCurrency");
        await handleCurrencySelection(INITIAL_CURRENCIES[1], "targetCurrency");
      } catch (err) {
        console.error("Error initializing currencies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [handleCurrencySelection]);

  // Step 3: Fetch exchange rates
  useEffect(() => {
    const fetchRate = async () => {
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
      } catch (err) {
        console.error("Could not fetch the rate", err);
      }
    };

    fetchRate();
  }, [baseCurrency, targetCurrency, API_KEY]);

  // Step 4: Calculate and set the rate
  useEffect(() => {
    const calculateRate = async () => {
      if (!baseValue || baseValue === 0) {
        log("Base value is zero or not set, skipping rate calculation.");
        return;
      }

      if (!baseCurrency || !targetCurrency) {
        console.error(
          "Currency Error: baseCurrency or targetCurrency not set."
        );
        return;
      }

      if (!allRates) {
        console.log("Currencies loaded but allRates not loaded");
        return;
      }

      try {
        let newRate = allRates[targetCurrency];
        if (newRate === undefined) {
          console.error(
            `Target currency ${targetCurrency} not found in conversion rates.`
          );
          return;
        }
        newRate = (newRate * baseValue).toFixed(2);
        newRate = Number(newRate).toLocaleString();
        log("Final Rate:", newRate);
        setRate(newRate);
        log(
          `Exchange rate from ${baseCurrency} to ${targetCurrency}: ${newRate}`
        );
      } catch (error) {
        console.error("Error calculating rate:", error);
      }
    };

    calculateRate();
  }, [baseValue, targetCurrency, allRates]);

  // Step 5: Log state (for debugging)
  useEffect(() => {
    log(
      `(U) Base Country: ${baseCountry}, Target Country: ${targetCountry}, Base Value: ${baseValue}, Rate: ${rate}`
    );
  }, [baseCountry, targetCountry, baseValue]);

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

  return (
    <div
      className={`flex flex-col items-center justify-center max-h-screen text-2xl transition-all duration-300`}
    >
      {!isLoading && (
        <div className="flex flex-col items-start my-5 w-2xs md:w-125">
          <h2 className={clsx("text-gray-600: ", "text-lg font-normal")}>
            {`${Number(baseValue).toLocaleString()} ${
              baseCountry[0]?.name
            } equals`}
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
          isLoading={isLoading}
          allCurrencies={allCurrencies} // allCurrencies JSON
          handleCurrencySelection={handleCurrencySelection} // passing down handleOptionChange function
        />
      </form>
    </div>
  );
}
