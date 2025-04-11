export default function FullInput(props) {
  return (
    <div className="card w-125 bg-base-100 shadow-xl border border-gray-300">
      <div className="card-body ">
        <h2 className="card-title text-base-content">{props.name}</h2>

        {/* Flags Container */}
        <div className="flex flex-wrap gap-2">
          {props.allCurrencies &&
            props?.country[0]?.countryFlags.map((flag, index) => (
              <div key={index} className="avatar">
                <div className="w-12 rounded-sm">
                  <img src={flag} alt={props?.country?.name} />
                </div>
              </div>
            ))}
        </div>

        {/* Input Group */}
        <div className="join w-full bg-base-200 rounded-box">
          <div className="join-item">
            <input
              type="text"
              value={props.rate}
              className="input input-ghost w-24 text-right text-xl font-medium"
            />
          </div>
          <div className="divider divider-horizontal mx-0">|</div>
          <select
            className="select select-ghost join-item flex-1"
            value={props?.country[0]?.name}
            onChange={(e) => {
              props.handleCurrencySelection(e.target.value, props.htmlFor);
            }}
          >
            {props.allCurrencies &&
              props.allCurrencies.map((currency, index) => (
                <option key={index} value={currency.name || "Not Available"}>
                  {currency.name || "Not Available"}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
