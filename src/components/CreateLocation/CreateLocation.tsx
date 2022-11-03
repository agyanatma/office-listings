import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { addOffice } from "../../services/mocks";
import LocationForm from "../LocationForm/LocationForm";
import "./CreateLocation.css";
import { AddOfficeBody, OfficesResponse } from "../../types";
import { toast } from "react-toastify";
import Alert from "../Alert/Alert";

interface ICreateLocationProps {}

const CreateLocation = (props: ICreateLocationProps) => {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: addOffice,
        onMutate: (values: AddOfficeBody) => {
            const prevOffices = queryClient.getQueryData<OfficesResponse>([
                "offices",
            ]);

            if (prevOffices) {
                queryClient.setQueryData<OfficesResponse>(["offices"], {
                    ...prevOffices,
                    data: [
                        ...prevOffices.data,
                        {
                            id: uuid(),
                            title: values.title,
                            address: values.address,
                            detail: {
                                fullname: values.fullname,
                                job: values.job,
                                email: values.email,
                                phone: values.phone,
                            },
                        },
                    ],
                });
            }
        },
        onSuccess: () => {
            setIsOpenForm(false);
            toast(<Alert message="The location has been added." />);
        },
    });
    const [isOpenForm, setIsOpenForm] = useState(false);

    const toggleForm = () => {
        setIsOpenForm((prev) => !prev);
    };

    if (isOpenForm) {
        return (
            <LocationForm
                onClose={toggleForm}
                onSubmit={(values) => {
                    console.log(values);
                    mutate(values);
                }}
                title="New Location"
                isSubmitting={isLoading}
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
