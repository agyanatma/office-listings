import { QueryObserverResult } from "@tanstack/react-query";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuid } from "uuid";
import { AddOfficeBody, OfficesResponse } from "../types";

export const DATA = [
    {
        id: uuid(),
        title: "Headquarters",
        address: "3763 W. Dallas St.",
        detail: {
            fullname: "Hellena John",
            job: "Software Tester",
            email: "georgia.young@example.com",
            phone: "(808) 555-0111",
        },
    },
    {
        id: uuid(),
        title: "Headquarters",
        address: "3763 W. Dallas St.",
        detail: {
            fullname: "Hellena John",
            job: "Software Tester",
            email: "georgia.young@example.com",
            phone: "(808) 555-0111",
        },
    },
    {
        id: uuid(),
        title: "Headquarters",
        address: "3763 W. Dallas St.",
        detail: {
            fullname: "Hellena John",
            job: "Software Tester",
            email: "georgia.young@example.com",
            phone: "(808) 555-0111",
        },
    },
];

let mock = new MockAdapter(axios, { delayResponse: 500 });

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

export const fetchOffices = async () => {
    const { data } = await axios.get<OfficesResponse>("/offices");
    return data;
};

export const addOffice = async (values: AddOfficeBody) => {
    const { data } = await axios.post("/office", values);
    return data;
};

export const updateOffice = async (id: string, values: AddOfficeBody) => {
    const { data } = await axios.put(`/office/${id}`, values);
    return data;
};

export const deleteOffice = async (id: string) => {
    const { data } = await axios.delete(`/office/${id}`);
    return data;
};
