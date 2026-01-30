import React, { useState, useRef, useEffect } from "react";
import DownArrowIcon from "@/icons/ChevronDown";
import UpArrowIcon from "@/icons/ChevronUp";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  name: string;
  label?: string;
  labelTooltip?: React.ReactNode;
  options: Option[];
  values: string[];
  onChange: (name: string, values: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

/**
 * Universal MultiSelect component with checkboxes.
 *
 * This component supports:
 * - Multiple selection with checkboxes
 * - Custom label text (`label`)
 * - Tooltip next to the label (`labelTooltip`)
 * - Customizable dropdown options (`options`)
 * - Built-in toggle icons (Down/Up arrow)
 *
 * 🧠 Use cases:
 * - Industry selection for companies
 * - Location selection
 * - Multiple skills/categories selection
 *
 * @example
 * <MultiSelect
 *   name="industries"
 *   label="Industry"
 *   values={selectedIndustries}
 *   onChange={(name, values) => setSelectedIndustries(values)}
 *   options={[
 *     { label: "Technology", value: "tech" },
 *     { label: "Healthcare", value: "health" },
 *   ]}
 * />
 *
 * @param {string} name - Name of the field.
 * @param {string[]} values - Array of selected values.
 * @param {function} onChange - Change handler receiving (name, values).
 * @param {Array<{ label: string, value: string }>} options - Array of dropdown options.
 * @param {string} [label] - Optional label text above the select.
 * @param {ReactNode} [labelTooltip] - Optional tooltip next to the label.
 * @param {string} [placeholder] - Optional placeholder shown when nothing selected.
 * @param {boolean} [required] - Whether the field is required.
 *
 * @returns {JSX.Element} A styled multi-select dropdown with checkboxes.
 */

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  label,
  labelTooltip,
  options,
  values,
  onChange,
  placeholder = "Select options",
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];
    onChange(name, newValues);
  };

  const selectedLabels = options
    .filter((opt) => values.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <div className="w-full" ref={selectRef}>
      {label && (
        <div className="flex items-center gap-2 mb-1">
          <label htmlFor={name} className="text-base font-bold text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {labelTooltip}
        </div>
      )}

      <div
        className="relative border rounded-md bg-white border-gray-300 px-4 py-2 cursor-pointer focus-within:ring-2 focus-within:ring-gray-500 min-h-[44px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`text-base ${values.length > 0 ? "text-gray-900" : "text-gray-500"}`}
        >
          {selectedLabels || placeholder}
        </span>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {open ? <UpArrowIcon /> : <DownArrowIcon />}
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md border border-gray-200 rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center px-4 py-2 hover:bg-primary-100 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={values.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="mr-3 w-4 h-4 accent-primary-500"
                />
                <span className="text-base text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
