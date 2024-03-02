import 'dayjs/locale/ru';
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "./index.css";
import React from "react";
import MainRouter from "routers";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
