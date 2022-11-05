import React from "react";
import "./Textfield.css";
import classNames from "classnames";
import { ReactComponent as ExclamationCircle } from "../../assets/icons/exclamation-circle.svg";

type Input = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
interface ITextfieldProps {
    label: string;
    error?: string;
}

const Textfield = React.forwardRef<HTMLInputElement, ITextfieldProps & Input>(
    ({ label, required, error, ...props }, ref) => {
        const inputStyles = classNames("textfield__input", {
            "textfield__input--error": !!error,
        });

        return (
            <div className="textfield">
                <label className="textfield__label" htmlFor={props.name}>
                    {label}{" "}
                    <span className="textfield__required">
                        {required ? "*" : ""}
                    </span>
                </label>
                <div className="textfield__input-wrapper">
                    <input
                        ref={ref}
                        className={inputStyles}
                        aria-label={props.name}
                        {...props}
                    />
                    {!!error && (
                        <div
                            className="textfield__icon"
                            data-testid="textfield-error-icon"
                        >
                            <ExclamationCircle />
                        </div>
                    )}
                </div>
                {!!error && <span className="textfield__error">{error}</span>}
            </div>
        );
    }
);

export default Textfield;
