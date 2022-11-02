import React, { useState } from "react";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import LocationForm from "../LocationForm/LocationForm";
import "./CreateLocation.css";

interface ICreateLocationProps {}

const CreateLocation = (props: ICreateLocationProps) => {
    const [isOpenForm, setIsOpenForm] = useState(false);

    const toggleForm = () => {
        setIsOpenForm((prev) => !prev);
    };

    if (isOpenForm) {
        return (
            <LocationForm
                onClose={toggleForm}
                onSubmit={() => {}}
                title="New Location"
            />
        );
    }

    return (
        <button className="create-location__container" onClick={toggleForm}>
            Add New Location
            <Add />
        </button>
    );
};

export default CreateLocation;
