export default function log(...args) {
  if (import.meta.env.MODE !== "production") {
    console.log(...args);
  }
}
