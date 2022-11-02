import React, { useState } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import LocationForm from "./components/LocationForm/LocationForm";
import OfficeList from "./components/OfficeList/OfficeList";
import Textfield from "./components/Textfield/Textfield";

function App() {
    return (
        <Container>
            <header className="display-2 accent">Offices</header>
            <main>
                <CreateLocation />

                <OfficeList
                    id="1"
                    title="Headquarters"
                    caption="3763 W. Dllas St."
                    detail={{
                        name: "Hellena John",
                        position: "Software Tester",
                        email: "georgia.young@example.com",
                        phone: "(808) 555-0111",
                    }}
                />
                <OfficeList
                    id="2"
                    title="Headquarters"
                    caption="3763 W. Dllas St."
                    detail={{
                        name: "Hellena John",
                        position: "Software Tester",
                        email: "georgia.young@example.com",
                        phone: "(808) 555-0111",
                    }}
                />
                <OfficeList
                    id="3"
                    title="Headquarters"
                    caption="3763 W. Dllas St."
                    detail={{
                        name: "Hellena John",
                        position: "Software Tester",
                        email: "georgia.young@example.com",
                        phone: "(808) 555-0111",
                    }}
                />
                <OfficeList
                    id="4"
                    title="Headquarters"
                    caption="3763 W. Dllas St."
                    detail={{
                        name: "Hellena John",
                        position: "Software Tester",
                        email: "georgia.young@example.com",
                        phone: "(808) 555-0111",
                    }}
                />
            </main>
            <footer>
                <div>This project is for test purpose only.</div>
                <div className="accent text-uppercase">
                    www.dogandponystudios.com
                </div>
            </footer>
        </Container>
    );
}

export default App;
