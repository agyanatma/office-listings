import React, { useEffect } from "react";
import Textfield from "../Textfield/Textfield";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import "./LocationForm.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { string } from "yup/lib/locale";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import { COLOR } from "../../constants/common";
import { OfficesResponse } from "../../types";

interface ILocationFormProps {
    title: string;
    onClose: () => void;
    onSubmit: SubmitHandler<typeof initialValues>;
    isSubmitting?: boolean;
    values?: Omit<OfficesResponse["data"][number], "id">;
}

const FormSchema = yup.object({
    title: yup.string().required(),
    address: yup.string().required(),
    fullname: yup.string().required(),
    job: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
});

const initialValues = {
    title: "",
    address: "",
    fullname: "",
    job: "",
    email: "",
    phone: "",
};

const LocationForm: React.FC<ILocationFormProps> = ({
    title,
    onClose,
    onSubmit,
    isSubmitting = false,
    values,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<typeof initialValues>({
        resolver: yupResolver(FormSchema),
    });

    useEffect(() => {
        if (values) {
            reset({
                title: values?.title ?? "",
                address: values?.address ?? "",
                fullname: values?.detail?.fullname ?? "",
                job: values?.detail?.job ?? "",
                email: values?.detail?.email ?? "",
                phone: values?.detail?.phone ?? "",
            });
        }
    }, [values, reset]);

    return (
        <div className="location-form" data-testid="location-form">
            <div className="location-form__header">
                <div className="header__title">{title}</div>
                <button
                    className="header__close"
                    onClick={onClose}
                    data-testid="close-button"
                >
                    <Close />
                </button>
            </div>

            <form
                data-testid="location-form-submit"
                className="location-form__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Textfield
                    label="Title"
                    placeholder="Headquarters"
                    required
                    error={errors.title?.message}
                    {...register("title")}
                />
                <Textfield
                    label="Enter the address"
                    placeholder="3763 W. Dallas St."
                    required
                    error={errors.address?.message}
                    {...register("address")}
                />

                <div className="location-form__sub-header">
                    Contact Information
                    <hr />
                </div>

                <Textfield
                    label="Full name"
                    placeholder="John Michael"
                    required
                    error={errors.fullname?.message}
                    {...register("fullname")}
                />
                <Textfield
                    label="Job position"
                    placeholder="3763 W. Dallas St."
                    required
                    error={errors.job?.message}
                    {...register("job")}
                />
                <Textfield
                    label="Email"
                    placeholder="name@example.com"
                    required
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Textfield
                    label="Phone"
                    placeholder="(xxx) xxx-xxxx"
                    required
                    error={errors.phone?.message}
                    {...register("phone")}
                />

                <div className="location-form__footer">
                    <Button
                        title="Save"
                        data-testid="submit-location"
                        disabled={isSubmitting}
                        type="submit"
                    />
                    {isSubmitting && <Spinner stroke={COLOR.accentBlue} />}
                </div>
            </form>
        </div>
    );
};

export default LocationForm;
