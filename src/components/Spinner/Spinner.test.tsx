import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import Spinner from "./Spinner";

describe("Spinner", () => {
    test("render normally", () => {
        render(<Spinner />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
});
