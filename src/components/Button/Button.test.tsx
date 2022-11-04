import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

const title = "Click here";

describe("Button", () => {
    test("render button with title", () => {
        render(<Button title={title} />);
        expect(screen.getByTestId("button")).toBeInTheDocument();

        expect(screen.getByText(title)).toBeInTheDocument();
    });

    test("render button with title and fullwidth style", () => {
        render(<Button title={title} fullWidth />);
        expect(screen.getByTestId("button")).toBeInTheDocument();

        expect(screen.getByTestId("button")).toHaveClass("button--fullwidth");
    });

    test("render button as disabled", async () => {
        render(<Button title={title} disabled />);
        const button = screen.getByTestId("button");
        expect(button).toBeInTheDocument();

        await userEvent.click(button);

        expect(button).toHaveClass("button--disabled");
        expect(button).toBeDisabled();
    });
});
