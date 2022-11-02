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
    ...props
}) => {
    const buttonStyles = classnames("button", {
        "button--fullwidth": fullWidth,
    });

    return (
        <button className={buttonStyles} {...props}>
            {title}
        </button>
    );
};

export default Button;
