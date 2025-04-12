import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

export default function SwapButton({ swapCountries }) {
  return (
    <button onClick={swapCountries} className="btn btn-soft-primary m-1 mb-5">
      <ArrowPathRoundedSquareIcon className="size-6" />
    </button>
  );
}
