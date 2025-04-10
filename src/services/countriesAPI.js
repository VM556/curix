// Fetch the list of countries from the REST Countries API
export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return;
  }
};

// fetchCountries();

// // function logger() {
// console.log(countries);
//   console.log(countries[0].flags);
//   console.log(countries[0].flags.svg);
// }
// logger();
