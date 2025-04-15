/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./app";

hydrateRoot(document, <App path={window.location.pathname.replace("/", "")} />);
