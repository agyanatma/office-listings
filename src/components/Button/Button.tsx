import classnames from "classnames";
import React from "react";
import "./Button.css";

type ButtonType = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;
interface IButtonProps {
    title: string;
    fullWidth?: boolean;
}

const Button: React.FC<IButtonProps & ButtonType> = ({
    title,
    fullWidth = false,
    disabled,
    ...props
}) => {
    const buttonStyles = classnames("button", {
        "button--fullwidth": fullWidth,
        "button--disabled": disabled,
    });

    return (
        <button
            className={buttonStyles}
            disabled={disabled}
            data-testid="button"
            {...props}
        >
            {title}
        </button>
    );
};

export default Button;
