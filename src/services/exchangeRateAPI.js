const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export async function getRate() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
  );
  log("response:", response);
  const { conversion_rates: conversionRates } = await response.json();
  log(conversionRates);
  const rate = conversionRates[targetCurrency];
  log(`Exchange rate from ${baseCurrency} to ${targetCurrency}: ${rate}`);
}

// // function logger() {
// log(countries);
//   log(countries[0].flags);
//   log(countries[0].flags.svg);
// }
// logger();
