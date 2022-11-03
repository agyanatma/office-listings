import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import LocationForm from "./components/LocationForm/LocationForm";
import OfficeList from "./components/OfficeList/OfficeList";
import Textfield from "./components/Textfield/Textfield";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { deleteOffice, fetchOffices } from "./services/mocks";
import Spinner from "./components/Spinner/Spinner";
import { COLOR } from "./constants/common";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OfficesResponse } from "./types";

const Root = () => {
    const { data, status } = useQuery({
        queryKey: ["offices"],
        queryFn: fetchOffices,
    });
    const [officeId, setOfficeId] = useState<string>();

    const queryClient = useQueryClient();
    const { mutate: mutateDeleteOffice, isLoading: isSubmitDelete } =
        useMutation({
            mutationFn: () => deleteOffice(officeId ?? ""),
            onMutate: () => {
                const prevOffices = queryClient.getQueryData<OfficesResponse>([
                    "offices",
                ]);

                if (prevOffices) {
                    const newOffices = prevOffices.data.filter(
                        (of) => of.id !== officeId
                    );

                    queryClient.setQueryData<OfficesResponse>(["offices"], {
                        ...prevOffices,
                        data: [...newOffices],
                    });
                }
            },
            onSuccess: () => {
                setOfficeId(undefined);
            },
        });

    useEffect(() => {
        if (officeId) {
            mutateDeleteOffice();
        }
    }, [officeId, mutateDeleteOffice]);

    return (
        <Container>
            <header className="display-2 accent">Offices</header>
            <main>
                <CreateLocation />
                {status === "loading" && (
                    <div style={{ textAlign: "center" }}>
                        <Spinner stroke={COLOR.accentBlue} />
                    </div>
                )}
                {data?.data?.map((of) => (
                    <OfficeList
                        key={of.id}
                        id={of.id}
                        title={of.title}
                        caption={of.address}
                        detail={{
                            ...of.detail,
                        }}
                        onDelete={() => setOfficeId(of.id)}
                    />
                ))}
            </main>
            <footer>
                <div>This project is for test purpose only.</div>
                <div className="accent text-uppercase">
                    www.dogandponystudios.com
                </div>
            </footer>
        </Container>
    );
};

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Root />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
