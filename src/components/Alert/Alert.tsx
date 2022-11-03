import React from "react";
import "./Alert.css";
import { ReactComponent as Check } from "../../assets/icons/check.svg";

interface IAlertProps {
    message: string;
}

const Alert = ({ message }: IAlertProps) => {
    return (
        <div className="alert__message">
            <Check />
            <span>{message}</span>
        </div>
    );
};

export default Alert;
