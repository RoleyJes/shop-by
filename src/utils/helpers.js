export function formatCurrency(value, localCode = "en-US", currencyCode = "USD") {
  return new Intl.NumberFormat(localCode, {
    style: "currency",
    currency: currencyCode,
  }).format(value);
}

export function formatNumber(value) {
  return value.toLocaleString("en-US");
}
