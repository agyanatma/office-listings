import React, { ReactNode } from "react";
import "./Container.css";

interface IContainerProps {
    children: ReactNode;
}

const Container = ({ children }: IContainerProps) => {
    return (
        <div className="container">
            <div>{children}</div>
        </div>
    );
};

export default Container;
