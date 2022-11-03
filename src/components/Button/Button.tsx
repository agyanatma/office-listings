import classnames from "classnames";
import React from "react";
import "./Button.css";

type Button = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;
interface IButtonProps {
    title: string;
    fullWidth?: boolean;
}

const Button: React.FC<IButtonProps & Button> = ({
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
        <button className={buttonStyles} disabled={disabled} {...props}>
            {title}
        </button>
    );
};

export default Button;
