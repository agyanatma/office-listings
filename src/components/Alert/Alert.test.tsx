import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "./Alert";

const message = "This is an alert.";

describe("Alert", () => {
    test("render alert with message", async () => {
        render(<Alert message={message} />);

        expect(screen.getByTestId("alert-message")).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
