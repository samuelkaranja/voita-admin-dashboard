interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export default function SelectInput({
  value,
  onChange,
  options,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-voita-border bg-voita-bg px-3 py-2.5 text-sm text-voita-text focus:border-voita-accent focus:outline-none focus:ring-1 focus:ring-voita-accent"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-voita-bg">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
