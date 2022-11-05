import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import LocationForm from "./LocationForm";
import { DATA } from "../../services/mocks";

const values = DATA[0];
const mockedOnSubmit = jest.fn();
const mockedOnClose = jest.fn();

describe("LocationForm", () => {
    afterEach(cleanup);
    test("render normally as a create form", async () => {
        render(
            <LocationForm
                title="Add Location"
                onClose={mockedOnClose}
                onSubmit={mockedOnSubmit}
            />
        );

        expect(screen.getByTestId("location-form")).toBeInTheDocument();

        const title = screen.getByLabelText("title");
        const address = screen.getByLabelText("address");
        const fullname = screen.getByLabelText("fullname");
        const job = screen.getByLabelText("job");
        const email = screen.getByLabelText("email");
        const phone = screen.getByLabelText("phone");

        expect(title).toHaveValue("");
        expect(address).toHaveValue("");
        expect(fullname).toHaveValue("");
        expect(job).toHaveValue("");
        expect(email).toHaveValue("");
        expect(phone).toHaveValue("");
    });

    test("render normally as an edit form", async () => {
        render(
            <LocationForm
                title="Edit Location"
                onClose={mockedOnClose}
                onSubmit={mockedOnSubmit}
                values={values}
            />
        );

        expect(screen.getByTestId("location-form")).toBeInTheDocument();

        const title = screen.getByLabelText("title");
        const address = screen.getByLabelText("address");
        const fullname = screen.getByLabelText("fullname");
        const job = screen.getByLabelText("job");
        const email = screen.getByLabelText("email");
        const phone = screen.getByLabelText("phone");

        expect(title).toHaveValue(values.title);
        expect(address).toHaveValue(values.address);
        expect(fullname).toHaveValue(values.detail.fullname);
        expect(job).toHaveValue(values.detail.job);
        expect(email).toHaveValue(values.detail.email);
        expect(phone).toHaveValue(values.detail.phone);
    });

    test("Submit button disabled when isSubmitting equal true", async () => {
        render(
            <LocationForm
                title="Edit Location"
                onClose={mockedOnClose}
                onSubmit={mockedOnSubmit}
                values={values}
                isSubmitting={true}
            />
        );

        expect(screen.getByTestId("location-form")).toBeInTheDocument();

        const title = screen.getByLabelText("title");
        const address = screen.getByLabelText("address");
        const fullname = screen.getByLabelText("fullname");
        const job = screen.getByLabelText("job");
        const email = screen.getByLabelText("email");
        const phone = screen.getByLabelText("phone");

        expect(title).toHaveValue(values.title);
        expect(address).toHaveValue(values.address);
        expect(fullname).toHaveValue(values.detail.fullname);
        expect(job).toHaveValue(values.detail.job);
        expect(email).toHaveValue(values.detail.email);
        expect(phone).toHaveValue(values.detail.phone);

        expect(screen.getByTestId("submit-location")).toBeDisabled();
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    test("trigger onSubmit when submitting", async () => {
        render(
            <LocationForm
                title="Add Location"
                onClose={mockedOnClose}
                onSubmit={mockedOnSubmit}
            />
        );

        expect(screen.getByTestId("location-form")).toBeInTheDocument();

        const title = screen.getByLabelText("title");
        const address = screen.getByLabelText("address");
        const fullname = screen.getByLabelText("fullname");
        const job = screen.getByLabelText("job");
        const email = screen.getByLabelText("email");
        const phone = screen.getByLabelText("phone");
        const submitButton = screen.getByTestId("submit-location");

        expect(title).toHaveValue("");
        await waitFor(() => {
            fireEvent.change(title, { target: { value: DATA[0].title } });
        });

        expect(address).toHaveValue("");
        await waitFor(() => {
            fireEvent.change(address, { target: { value: DATA[0].address } });
        });

        expect(fullname).toHaveValue("");
        await waitFor(() => {
            fireEvent.change(fullname, {
                target: { value: DATA[0].detail.fullname },
            });
        });

        expect(job).toHaveValue("");
        await waitFor(() => {
            fireEvent.change(job, { target: { value: DATA[0].detail.job } });
        });

        expect(email).toHaveValue("");
        await waitFor(() => {
            fireEvent.change(email, {
                target: { value: DATA[0].detail.email },
            });
        });

        expect(phone).toHaveValue("");
        await waitFor(() => {
            fireEvent.change(phone, {
                target: { value: DATA[0].detail.phone },
            });
        });

        expect(submitButton).not.toBeDisabled();
        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(mockedOnSubmit).toHaveBeenCalled();
        });
    });

    test("click close button to closed form", async () => {
        render(
            <LocationForm
                title="Add Location"
                onClose={mockedOnClose}
                onSubmit={mockedOnSubmit}
            />
        );

        expect(screen.getByTestId("location-form")).toBeInTheDocument();

        const closeButton = screen.getByTestId("close-button");

        await waitFor(() => fireEvent.click(closeButton));

        expect(mockedOnClose).toHaveBeenCalledTimes(1);
    });
});
