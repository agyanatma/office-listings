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

const Textfield: React.FC<ITextfieldProps & Input> = ({
    label,
    required,
    error,
    ...props
}) => {
    const inputStyles = classNames("textfield__input", {
        "textfield__input--error": !!error,
    });

    return (
        <div className="textfield">
            <label className="textfield__label">
                {label}{" "}
                <span className="textfield__required">
                    {required ? "*" : ""}
                </span>
            </label>
            <div className="textfield__input-wrapper">
                <input className={inputStyles} {...props} />
                {!!error && (
                    <div className="textfield__icon">
                        <ExclamationCircle />
                    </div>
                )}
            </div>
            {!!error && <span className="textfield__error">{error}</span>}
        </div>
    );
};

export default Textfield;
