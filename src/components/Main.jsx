import React, { useState, useEffect } from "react";
import { getRate } from "../services/exchangeRateAPI";
import Option from "./Option";
import FullInput from "./FullInput";
import { fetchCountries } from "../services/countriesAPI";
import { allCurrencies } from "../data/allCurrencies";
// import { fetchCountries } from "../services/countriesAPI";

export default function Main() {
  // Currency
  const [baseCurrency, setBaseCurrency] = useState("AUS"); // Use cca3 here
  const [targetCurrency, setTargetCurrency] = useState("USA"); // and here
  // Countries
  const [baseCountry, setBaseCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  // All Countries
  const [allCountries, setAllCountries] = useState([]);

  // Fetch all countries for the dropdowns
  useEffect(() => {
    async function fetchAllCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,currencies,flags,cca2,cca3"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAllCountries(data);
        console.log("allCountries", allCountries);
      } catch (err) {
        throw new Error("There was a problem with the fetch operation:", err);
      }
    }
    fetchAllCountries();
  }, []);

  // Initially fetch the country details
  useEffect(() => {
    async function setInitialCountryDetails() {
      try {
        const baseCountryData = (await findCountryDetails(baseCurrency))[0];
        const targetCountryData = (await findCountryDetails(targetCurrency))[0];
        setBaseCountry(baseCountryData);
        setTargetCountry(targetCountryData);
      } catch (err) {
        throw new Error("Couldn't set initial country details", err);
      }
    }
    setInitialCountryDetails();
  }, [baseCurrency, targetCurrency]);

  // Useless console logs
  // useEffect(() => {
  //   console.log("Base Country: ", baseCountry);
  //   console.log("Target Country: ", targetCountry);
  // }, [baseCountry, targetCountry]);

  async function findCountryDetails(countryCode) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return;
    }
  }

  async function handleOptionChange(countryCode, source) {
    console.log(
      "Handle change happening now...Value was:",
      countryCode,
      "arose from:",
      source
    );

    if (source === "baseCurrency") {
      try {
        const countryDetails = await findCountryDetails(countryCode);
        console.log("Changing Base: ", countryDetails);
        setBaseCountry(countryDetails[0]);
        setBaseCurrency(countryDetails[0]?.cca3);
      } catch (err) {
        throw new Error(
          "Couldn't set the country or currency to selected value",
          err
        );
      }
    } else if (source === "targetCurrency") {
      try {
        const countryDetails = await findCountryDetails(countryCode);
        console.log("Changing Target: ", countryDetails);
        setTargetCountry(countryDetails[0]);
        setTargetCurrency(countryDetails[0]?.cca3);
      } catch (err) {
        throw new Error(
          "Couldn't set the country or currency to selected value",
          err
        );
      }
    } else {
      throw new Error("Edge Case while setting the country or currency");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen text-2xl">
        <form className="flex flex-col justify-center items-center space-y-4 text-2xl">
          <FullInput
            htmlFor="baseCurrency"
            name="Base Currency"
            whichCountry={baseCountry}
            currencyFor={baseCurrency}
            setCurrency={setBaseCurrency}
            allCountries={allCountries}
            handleOptionChange={handleOptionChange}
          />
          <p className=" m-1">⬆️⬇️</p>
          <FullInput
            htmlFor="targetCurrency"
            name="Target Currency"
            whichCountry={targetCountry}
            currencyFor={targetCurrency}
            setCurrency={setTargetCurrency}
            allCountries={allCountries}
            handleOptionChange={handleOptionChange}
          />
          <button
            type="button"
            onClick={getRate}
            className="btn btn-soft btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl w-64 rounded-full "
          >
            Get Exchange Rate
          </button>
        </form>
      </div>
    </>
  );
}
