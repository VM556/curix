import Option from "./Option";

function FullInput(props) {
  console.log(props);
  return (
    <div>
      <label htmlFor={props.htmlFor} className="p-2 block">
        {props.name}:
      </label>
      <div className="p-2 flex justify-center items-center rounded-lg bg-gray-200 ">
        <input
          type="text"
          defaultValue="1"
          className="input m-1 w-11 text-right text-xl"
        />
        <p className=" m-1">|</p>
        <img
          src={props.whichCountry?.flags?.svg}
          alt={props.whichCountry?.name?.common}
          className=" m-1 h-12 w-20 rounded-md"
        />
        <select
          id="baseCurrency"
          value={props.currencyFor}
          onChange={(e) =>
            props.handleOptionChange(e.target.value, props.htmlFor)
          }
          className="px-4 py-2 "
          suppressHydrationWarning
        >
          {props.allCountries &&
            props.allCountries.map((country) => (
              <option
                key={country?.cca2}
                value={country?.cca3 ? country?.cca3 : "Whatever"}
                // onChange={props.handleOptionChange}
              >
                {country?.currencies
                  ? Object.values(country?.currencies)[0]?.name
                  : "Whatever"}
              </option>
            ))}
        </select>

        {/* <div className="dropdown m-1">
          <div tabIndex={0} role="button" className="btn m-1 w-64 text-left">
            {props.whichCountry?.currencies &&
              Object.values(props.whichCountry?.currencies)[0]?.name}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {props.allCountries &&
              props.allCountries.map((country) => (
                <li>
                  <a>
                    {country?.currencies
                      ? Object.values(country?.currencies)[0]?.name
                      : "Whatever"}
                  </a>
                </li>
              ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default FullInput;
