import { getRate } from "../services/exchangeRateAPI";
import FullInputSkeleton from "./skeletons/FullInputSkeleton";
import { Suspense } from "react";
import { useTheme } from "../contexts/ThemeContext";
import clsx from "clsx";

export default function FullInput(props) {
  const { darkMode } = useTheme();
  return (
    <>
      <Suspense fallback={<FullInputSkeleton />}>
        {props.isLoading ? (
          <FullInputSkeleton>
            <div className="skeleton w-12 h-12 rounded-full"></div>
          </FullInputSkeleton>
        ) : (
          <div className="card w-2xs md:w-lg bg-base-100 shadow-xl border border-gray-300">
            <div className="card-body ">
              <h2 className="card-title text-base-content">{props.name}</h2>

              {/* Flags Container */}
              <div className="hidden md:flex flex-wrap gap-2.75 mb-2.5">
                {props.allCurrencies &&
                  props?.country?.countryFlags.map((flag, index) => (
                    <div
                      key={index}
                      className="tooltip"
                      data-tip={props?.country?.countries?.[index] || "Unknown"}
                    >
                      <img
                        src={flag}
                        alt={props?.country?.name}
                        className="w-14 h-9 object-cover rounded-md"
                      />
                    </div>
                  ))}
              </div>

              {/* Input Group */}
              <div
                className={clsx(
                  darkMode ? "bg-gray-800" : "bg-gray-200",
                  "join w-full rounded-box flex flex-col sm:flex-row items-center justify-center"
                )}
              >
                <div className="join-item relative w-full sm:w-fit flex items-center justify-end ">
                  {!/[a-zA-Z]/.test(props?.country?.symbol || "") && (
                    <span className="absolute left-4 text-xl pointer-events-none z-1">
                      {props?.country?.symbol}
                    </span>
                  )}
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    value={props.rate ?? props.baseValue.toLocaleString() ?? ""} // Ensure value is never undefined
                    onChange={(e) => {
                      console.log(e.target.value);
                      props.setBaseValue(
                        Number(e.target.value.replace(/,/g, ""))
                      );
                    }}
                    readOnly={props.htmlFor === "targetCurrency"}
                    className={`input input-ghost w-full max-w-50 text-right text-xl focus:outline-none focus:bg-base-200 px-4 ${
                      props.htmlFor === "targetCurrency" &&
                      "pointer-events-none"
                    } ${
                      !/[a-zA-Z]/.test(props?.country?.symbol || "")
                        ? "pl-6"
                        : "pr-6"
                    }`}
                  />
                  {/[a-zA-Z]/.test(props?.country?.symbol || "") && (
                    <span className="absolute right-4 text-xl pointer-events-none z-1">
                      {props?.country?.symbol}
                    </span>
                  )}
                </div>
                {/* <div className="divider divider-horizontal mx-0" /> */}
                <div className="divider divider-vertical m-0 md:divider-horizontal" />

                <select
                  className="select select-ghost join-item  text-xl focus:outline-none focus:bg-base-200"
                  value={props?.country?.name}
                  onChange={(e) => {
                    props.handleCurrencySelection(
                      e.target.value,
                      props.htmlFor
                    );
                  }}
                >
                  {props.allCurrencies &&
                    props.allCurrencies.map((currency, index) => (
                      <option
                        key={index}
                        value={currency.name || "Not Available"}
                      >
                        {currency.name || "Not Available"}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
