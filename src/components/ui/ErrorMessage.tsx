interface ErrorMessageProps {
  innerBtnText: string;
  innerBtnTextColour: string;
  innerBtnBgColour: string;
  errorMessageText: string;
  backgroundColour: string;
  arrow: boolean;
}

export default function ErrorMessage({
  innerBtnText,
  innerBtnTextColour,
  innerBtnBgColour,
  errorMessageText,
  backgroundColour,
  arrow,
}: ErrorMessageProps) {
  const classes = `px-2 py-0.5 rounded-full flex gap-1 ${innerBtnBgColour} ${innerBtnTextColour}`;

  return (
    <section>
      <div
        className={`inline-flex gap-2 py-1 ${
          innerBtnText == "Error" ? "pl-1 pr-1" : "pl-3 pr-1"
        }  align-middle rounded-full ${backgroundColour}
      ${innerBtnText == "Fix now" ? "flex-row-reverse" : ""}`}
      >
        <div
          aria-label="Fix button"
          className={`flex justify-center gap-2 align-middle`}
        >
          {innerBtnText == "Fix now" ? (
            <button className={`${classes} cursor-pointer`}>
              {innerBtnText}
              {innerBtnText === "Fix now" && arrow && (
                <span className="text-red-600 text-md">&#8594;</span>
              )}
            </button>
          ) : (
            <p className={`${classes} aria-disabled:`}>
              {innerBtnText}
              {innerBtnText === "Fix now" && arrow && (
                <span className="text-red-600 text-md">&#8594;</span>
              )}
            </p>
          )}
        </div>
        <p className="text-[#B42318]">{errorMessageText}</p>
        {innerBtnText == "Error" && arrow && (
          <span className="text-red-600 text-xl">&#8594;</span>
        )}
      </div>
    </section>
  );
}

// A new ErrorMessage component is created and exported for use across the application.

// The component accepts a message prop (or similar) to render the error text.

// Styles (font, color, spacing) match Figma’s error label design.

// Component is responsive and accessible (e.g., proper aria attributes if needed).

// Used in at least one form (e.g., the signup page) as a test case.
