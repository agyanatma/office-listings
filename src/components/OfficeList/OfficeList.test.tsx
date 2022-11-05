import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import OfficeList from "./OfficeList";
import { DATA } from "../../services/mocks";

const data = DATA[0];
const mockedOnDelete = jest.fn();

describe("OfficeList", () => {
    test("render normally with title, caption, and details", async () => {
        render(
            <OfficeList
                id={data.id}
                title={data.title}
                caption={data.address}
                detail={{
                    ...data.detail,
                }}
                onDelete={mockedOnDelete}
            />
        );

        const officeContainer = screen.getByTestId("office-list");

        expect(officeContainer).toBeInTheDocument();
        expect(screen.getByText(data.title)).toBeInTheDocument();
        expect(screen.getByText(data.address)).toBeInTheDocument();

        const officeButton = screen.getByTestId("office-button");
        const officeChevron = screen.getByTestId("office-chevron");

        expect(officeContainer).toHaveStyle("margin-bottom: 0px;");
        expect(officeButton).toHaveStyle(
            "border-radius: 8px 8px 8px 8px; background-color: rgb(255, 255, 255);"
        );
        expect(officeChevron).toHaveStyle(
            "transition: all 0.5s ease; color: rgb(51, 166, 186);"
        );

        await waitFor(() => {
            fireEvent.click(officeButton);
        });

        expect(officeContainer).not.toHaveStyle("margin-bottom: 0px;");
        expect(officeButton).toHaveStyle(
            "border-radius: 8px 8px 0px 0px; background-color: rgb(152, 158, 167); color: rgb(255, 255, 255);"
        );
        expect(officeChevron).toHaveStyle(
            "transition: all 0.5s ease; color: rgb(255, 255, 255);"
        );
        expect(screen.getByText(data.detail.fullname)).toBeInTheDocument();
        expect(screen.getByText(data.detail.job)).toBeInTheDocument();
        expect(screen.getByText(data.detail.email)).toBeInTheDocument();
        expect(screen.getByText(data.detail.phone)).toBeInTheDocument();
    });

    test("click Edit to show a create form then fill all fields to submit", async () => {
        render(
            <OfficeList
                id={data.id}
                title={data.title}
                caption={data.address}
                detail={{
                    ...data.detail,
                }}
                onDelete={mockedOnDelete}
            />
        );

        const editButton = screen.getByTestId("edit-office");
        await waitFor(() => {
            fireEvent.click(editButton);
        });

        expect(screen.getByTestId("location-form")).toBeInTheDocument();
        expect(screen.queryByTestId("office-list")).not.toBeInTheDocument();

        const title = screen.getByLabelText("title");
        const address = screen.getByLabelText("address");
        const fullname = screen.getByLabelText("fullname");
        const job = screen.getByLabelText("job");
        const email = screen.getByLabelText("email");
        const phone = screen.getByLabelText("phone");
        const submitButton = screen.getByTestId("submit-location");

        expect(title).toHaveValue(data.title);
        expect(address).toHaveValue(data.address);
        expect(fullname).toHaveValue(data.detail.fullname);
        expect(job).toHaveValue(data.detail.job);
        expect(email).toHaveValue(data.detail.email);
        expect(phone).toHaveValue(data.detail.phone);

        await waitFor(() =>
            fireEvent.change(title, { target: { value: "Edited title" } })
        );
        expect(title).toHaveValue("Edited title");

        expect(submitButton).not.toBeDisabled();
        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(
                screen.getByText("The location has been updated.")
            ).toBeInTheDocument();
        });
    });
});
