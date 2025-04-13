import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext";
import clsx from "clsx";

export default function SwapButton({ swapCountries }) {
  const { darkMode } = useTheme();
  return (
    <button
      onClick={swapCountries}
      className={clsx(
        darkMode ? "bg-gray-700" : "bg-gray-100",
        "btn btn-soft-primary rounded-xl my-5 self-center"
      )}
    >
      <div className="tooltip tooltip-warning" data-tip="Swap Countries">
        <ArrowPathRoundedSquareIcon className="size-6" />
      </div>
    </button>
  );
}
