import {
    render,
    fireEvent,
    screen,
    waitFor,
    cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DATA } from "./services/mocks";

jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual<any>("@tanstack/react-query"),
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));

let mockedMutate = jest.fn();
const mockedUseQuery = useQuery as jest.MockedFunction<any>;
const mockedUseMutation = useMutation as jest.MockedFunction<any>;

describe("App", () => {
    afterEach(cleanup);

    test("show spinner when office data is fetching", async () => {
        mockedUseQuery.mockImplementation(() => ({
            data: undefined,
            status: "loading",
        }));
        mockedUseMutation.mockImplementation(() => ({
            mutate: mockedMutate,
            isSuccess: true,
            status: "success",
        }));

        render(<App />);

        expect(screen.queryAllByTestId("office-list")).toHaveLength(0);
        expect(screen.getByTestId("spinner"));
    });

    test("rendered with office data", () => {
        mockedUseQuery.mockImplementation(() => ({
            data: {
                code: 200,
                message: "Get Success",
                data: DATA,
            },
            status: "success",
        }));
        mockedUseMutation.mockImplementation(() => ({
            mutate: mockedMutate,
            isSuccess: true,
            status: "success",
        }));

        render(<App />);

        expect(screen.getAllByTestId("office-list")).toHaveLength(DATA.length);
    });

    test("render header and footer information", () => {
        mockedUseQuery.mockImplementation(() => ({
            data: {
                code: 200,
                message: "Get Success",
                data: DATA,
            },
            status: "success",
        }));
        mockedUseMutation.mockImplementation(() => ({
            mutate: mockedMutate,
            isSuccess: true,
            status: "success",
        }));

        render(<App />);

        expect(screen.getByText("Offices")).toBeInTheDocument();
        expect(
            screen.getByText("This project is for test purpose only.")
        ).toBeInTheDocument();
        expect(
            screen.getByText("www.dogandponystudios.com")
        ).toBeInTheDocument();
    });

    test("delete office list", async () => {
        mockedUseQuery.mockImplementation(() => ({
            data: {
                code: 200,
                message: "Get Success",
                data: DATA,
            },
            status: "success",
        }));
        mockedUseMutation.mockImplementation(() => ({
            mutate: mockedMutate,
            isSuccess: true,
            status: "success",
        }));

        render(<App />);

        const deleteOfficeButton = screen.getAllByTestId("delete-office")[0];
        await waitFor(() => {
            fireEvent.click(deleteOfficeButton);
        });

        expect(mockedMutate).toHaveBeenCalled();
    });
});
