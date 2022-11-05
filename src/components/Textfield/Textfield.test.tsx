import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import Textfield from "./Textfield";

describe("Textfield", () => {
    test("render normally without error", () => {
        render(<Textfield label="Title" name="title" />);

        expect(screen.getByLabelText("title")).toBeInTheDocument();
    });

    test("render normally with error and required equal true", () => {
        render(
            <Textfield
                label="Title"
                name="title"
                error="This field is required"
                required
            />
        );

        expect(screen.getByLabelText("title")).toBeInTheDocument();
        expect(screen.getByLabelText("title")).toHaveClass(
            "textfield__input textfield__input--error"
        );
        expect(screen.getByTestId("textfield-error-icon")).toBeInTheDocument();
        expect(screen.getByText("This field is required")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
    });
});
