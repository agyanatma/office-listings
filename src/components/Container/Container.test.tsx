import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import Container from "./Container";

const children = <span>This is Children</span>;

describe("Container", () => {
    test("render normally with children", () => {
        render(<Container>{children}</Container>);

        expect(screen.getByText("This is Children"));
    });
});
