export default function PriceLabel({ amount }: { amount: number }) {
  const formatted = new Intl.NumberFormat("en-NG").format(amount);
  return (
    <span className="text-voita-text-secondary text-sm font-medium">
      Kshs{formatted}
    </span>
  );
}
