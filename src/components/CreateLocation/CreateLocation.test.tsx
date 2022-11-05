import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import CreateLocation from "./CreateLocation";
import { DATA } from "../../services/mocks";

describe("CreateLocation", () => {
    afterEach(cleanup);

    test("render normally", () => {
        render(<CreateLocation />);

        expect(screen.getByTestId("create-location")).toBeInTheDocument();
    });

    test("click Add New Location to show a create form", async () => {
        render(<CreateLocation />);

        const addNewLocation = screen.getByTestId("create-location");

        await waitFor(() => {
            fireEvent.click(addNewLocation);
        });

        expect(addNewLocation).not.toBeInTheDocument();
        expect(screen.getByTestId("location-form")).toBeInTheDocument();
    });

    test("submit create location", async () => {
        render(<CreateLocation />);

        const addNewLocation = screen.getByTestId("create-location");

        await waitFor(() => {
            fireEvent.click(addNewLocation);
        });

        expect(addNewLocation).not.toBeInTheDocument();
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
            expect(
                screen.getByText("The location has been added.")
            ).toBeInTheDocument();
        });
    });
});
