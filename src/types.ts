export type OfficesResponse = {
    code: number;
    message: string;
    data: {
        id: string;
        title: string;
        address: string;
        detail: {
            fullname: string;
            job: string;
            email: string;
            phone: string;
        };
    }[];
};

export type AddOfficeBody = {
    title: string;
    address: string;
    fullname: string;
    job: string;
    email: string;
    phone: string;
};
