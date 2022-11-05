import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Slide, ToastContainer } from "react-toastify";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
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
            <ToastContainer
                toastClassName={() => "toast__container"}
                bodyClassName={() => "toast__body"}
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
            />
            {children}
        </QueryClientProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
