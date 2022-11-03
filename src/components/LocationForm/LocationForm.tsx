import React from "react";
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

interface ILocationFormProps {
    title: string;
    onClose: () => void;
    onSubmit: SubmitHandler<typeof initialValues>;
    isSubmitting?: boolean;
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
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<typeof initialValues>({
        resolver: yupResolver(FormSchema),
    });

    return (
        <div className="location-form">
            <div className="location-form__header">
                <div className="header__title">{title}</div>
                <button className="header__close" onClick={onClose}>
                    <Close />
                </button>
            </div>

            <form
                className="location-form__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Textfield
                            label="Title"
                            placeholder="Headquarters"
                            required
                            error={errors.title?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <Textfield
                            label="Enter the address"
                            placeholder="3763 W. Dallas St."
                            required
                            error={errors.address?.message}
                            {...field}
                        />
                    )}
                />

                <div className="location-form__sub-header">
                    Contact Information
                    <hr />
                </div>

                <Controller
                    name="fullname"
                    control={control}
                    render={({ field }) => (
                        <Textfield
                            label="Full name"
                            placeholder="John Michael"
                            required
                            error={errors.fullname?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="job"
                    control={control}
                    render={({ field }) => (
                        <Textfield
                            label="Job position"
                            placeholder="3763 W. Dallas St."
                            required
                            error={errors.job?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Textfield
                            label="Email"
                            placeholder="name@example.com"
                            required
                            error={errors.email?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <Textfield
                            label="Phone"
                            placeholder="(xxx) xxx-xxxx"
                            required
                            error={errors.phone?.message}
                            {...field}
                        />
                    )}
                />

                <div className="location-form__footer">
                    <Button title="Save" disabled={isSubmitting} />
                    {isSubmitting && <Spinner stroke={COLOR.accentBlue} />}
                </div>
            </form>
        </div>
    );
};

export default LocationForm;
