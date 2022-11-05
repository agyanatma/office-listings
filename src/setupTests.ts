// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { QueryCache } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { DATA } from "./services/mocks";

const queryCache = new QueryCache();

let mock = new MockAdapter(axios);

mock.onGet("/offices").reply(200, {
    code: 200,
    message: "Get Success",
    data: DATA,
});
mock.onPost("/office").reply(200, {
    code: 200,
    message: "The location has been added.",
});
mock.onPut(/\/office\/\d+/).reply(200, {
    code: 200,
    message: "The location has been updated.",
});
mock.onDelete(/\/office\/\d+/).reply(200, {
    code: 200,
    message: "The location has been deleted.",
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    queryCache.clear();
    cleanup();
});
