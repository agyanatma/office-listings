import React from "react";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import "./CreateLocation.css";

interface ICreateLocationProps {}

const CreateLocation = (props: ICreateLocationProps) => {
    return (
        <button className="create-location__container">
            Add New Location
            <Add />
        </button>
    );
};

export default CreateLocation;
