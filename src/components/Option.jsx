export default function Option({ country }) {
  log("THIS:", country?.currencies);
  return (
    <option
      // key={country?.cca2}
      // value={country?.currencies ? Object.keys(country?.currencies)[0] : ""}
      value={Object.keys(country?.currencies)}
    >
      {country?.name?.common}
      {/* <img
          src={country?.flags?.svg}
          alt={country?.name?.common}
          className="inline-block w-6 h-4 mr-2"
        /> */}
    </option>
  );
}
