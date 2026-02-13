import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  type?: "square" | "round";
  name?: string;
  value?: string;
}

/**
 * Universal Checkbox/Radio component.
 *
 * This component supports:
 * - Square checkboxes (default)
 * - Round radio buttons
 * - Custom styling matching design system
 *
 * 🧠 Use cases:
 * - Form checkboxes (square type)
 * - Radio button groups (round type)
 * - Yes/No selections
 * - Multiple choice options
 *
 * @example Square Checkbox
 * <Checkbox
 *   label="Paid job"
 *   checked={isPaidJob}
 *   onChange={() => setIsPaidJob(!isPaidJob)}
 * />
 *
 * @example Round Radio
 * <Checkbox
 *   type="round"
 *   name="housingAssistance"
 *   label="Yes"
 *   checked={housing === 'YES'}
 *   onChange={() => setHousing('YES')}
 * />
 *
 * @param {string} label - Label text displayed next to checkbox/radio.
 * @param {boolean} checked - Whether the checkbox/radio is checked.
 * @param {function} onChange - Handler called when state changes.
 * @param {"square" | "round"} [type="square"] - Visual style of the input.
 * @param {string} [name] - Name attribute (important for radio groups).
 * @param {string} [value] - Value attribute.
 *
 * @returns {JSX.Element} A styled checkbox or radio button.
 */

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  type = "square",
  name,
  value,
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type={type === "round" ? "radio" : "checkbox"}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`w-5 h-5 accent-primary-500 cursor-pointer ${
          type === "round" ? "" : "rounded"
        }`}
      />
      <span className="text-base text-gray-600">{label}</span>
    </label>
  );
};

export default Checkbox;
