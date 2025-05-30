import FullInputSkeleton from "./skeletons/FullInputSkeleton";
import { Suspense, useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import log from "../utils/logger";
import FlagSkeleton from "./skeletons/FlagSkeleton";

export default function FullInput(props) {
  const [flagLoaded, setFlagLoaded] = useState(
    Array(props?.country?.countryFlags.length).fill(false)
  );

  useEffect(() => {
    log("Flags Loaded", flagLoaded);
  }, [flagLoaded]);

  const { darkMode } = useTheme();
  const symbolOnRight = /[a-zA-Z]/.test(props?.country?.symbol || "");

  function handleInputChange(e) {
    let value = e.replace(/,/g, "");
    log("Input value:", value);

    // Allow empty string, numbers, and single decimal point and only upto 3 digits after decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      if (value.includes(".") && !(value.split(".")[1].length <= 3)) {
        return;
        // can possibly give like a shaking animation here in future iterations
      }
      // Don't convert to number yet - keep as string
      if (value.slice(-1) == ".") {
        // const valueWithoutCommas = value.slice(0, -1).replace(/,/g, "");
        value = Number(value.slice(0, -1)).toLocaleString() + ".";
      } else {
        value = Number(value).toLocaleString();
      }
      log("Setting baseValue to:", value);
      props.setBaseValue(value);
    } else {
      log("Invalid input rejected:", value);
    }
  }

  const handleClear = () => {
    if (props.htmlFor === "baseCurrency") {
      props.setBaseValue("0");
    }
  };

  return (
    <>
      <Suspense fallback={<FullInputSkeleton />}>
        {props.isLoading ? (
          <FullInputSkeleton>
            <div className="skeleton w-10 h-10 rounded-sm"></div>
          </FullInputSkeleton>
        ) : (
          <div className="card w-2xs md:w-lg bg-base-100 shadow-xl border border-gray-300">
            <div className="card-body ">
              {props.htmlFor === "baseCurrency" &&
                props.baseValue.length >= 3 && (
                  <button
                    onClick={handleClear}
                    type="button"
                    className={clsx(
                      darkMode
                        ? "text-red-700 border-red-700 hover:bg-red-950 active:bg-red-950"
                        : "text-red-600 border-red-600 hover:bg-red-800 active:bg-red-800",
                      "btn h-auto shadow px-1 pr-1.25 btn-outline transform-transition duration-200 hover:scale-110 rounded-md absolute top-2 right-2 active:bg-transparent"
                    )}
                    aria-label="Clear input"
                  >
                    <span className="flex justify-between items-center">
                      <BackspaceIcon className="size-5" />
                      <p className="pt-1">Clear</p>
                    </span>
                  </button>
                )}
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
                      {!flagLoaded && <FlagSkeleton />}
                      <img
                        src={flag}
                        alt={props?.country?.name}
                        onLoad={() => setFlagLoaded(true)}
                        className={clsx(
                          "w-14 h-9 object-cover rounded-md transition-opacity duration-300",
                          flagLoaded ? "opacity-100" : "opacity-0 absolute"
                        )}
                      />
                    </div>
                  ))}
              </div>

              {/* Input Group */}
              <div
                className={clsx(
                  darkMode ? "bg-gray-800" : "bg-gray-200",
                  "join w-full rounded-box flex flex-col md:flex-row items-center justify-center"
                )}
              >
                <div className="join-item relative w-full sm:w-fit flex items-center justify-end ">
                  {!symbolOnRight && (
                    <span className="absolute left-2 md:left-4 pt-2.5 md:pt-0 text-xl pointer-events-none z-1">
                      {props?.country?.symbol}
                    </span>
                  )}
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    value={
                      props.rate ??
                      (props.baseValue === ""
                        ? " "
                        : props.baseValue.slice(-1) === "."
                        ? props.baseValue.slice(0, -1) + "."
                        : props.baseValue)
                    }
                    onChange={(e) =>
                      handleInputChange(
                        String(e.target.value) // ONLY STRING
                      )
                    }
                    readOnly={props.htmlFor === "targetCurrency"}
                    className={`input input-ghost w-full pt-3 md:pt-0.25 left-4 md:left-6  text-left text-xl focus:outline-none focus:bg-transparent active:bg-transparent px-3 ${
                      props.htmlFor === "targetCurrency" &&
                      "pointer-events-none"
                    }`}
                  />
                  {symbolOnRight && (
                    <span className="absolute right-2 pt-2.5 md:pt-0 text-xl pointer-events-none z-1">
                      {props?.country?.symbol}
                    </span>
                  )}
                </div>
                {/* <div className="divider divider-horizontal mx-0" /> */}
                <div className="divider divider-vertical m-0 md:divider-horizontal" />

                <select
                  className="select select-ghost join-item text-xl focus:outline-none focus:bg-transparent active:bg-transparent"
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
