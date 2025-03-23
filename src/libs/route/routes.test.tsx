import { render } from "@testing-library/react";
import { describe, expect, test } from "bun:test";
import { Outlet } from "./outlet";
import { Routes } from "./routes";

const config = {
  "/": {
    layout: <h1>Home</h1>,
  },
  about: {
    layout: (
      <div>
        <h1>About</h1>
        <Outlet />
      </div>
    ),
    child: {
      dia: {
        layout: (
          <div>
            <p>Dia</p>
            <Outlet />
          </div>
        ),
        child: {
          itu: {
            layout: (
              <div>
                <p>Itu</p>
                <Outlet />
              </div>
            ),
            child: {
              istimewa: {
                layout: (
                  <div>
                    <p>Istimewa</p>
                  </div>
                ),
              },
            },
          },
        },
      },
    },
  },
};

describe("Routes Component", () => {
  test("Render params ''", () => {
    const screen = render(<Routes initialConfig={config} initialParams="" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  test("Render params '/about'", () => {
    const screen = render(
      <Routes initialConfig={config} initialParams="about" />
    );
    expect(screen.getByText("About")).toBeInTheDocument();
  });
  test("Render params '/about/dia/itu/istimewa'", () => {
    const screen = render(
      <Routes initialConfig={config} initialParams="about/dia/itu/istimewa" />
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Dia")).toBeInTheDocument();
    expect(screen.getByText("Itu")).toBeInTheDocument();
    expect(screen.getByText("Istimewa")).toBeInTheDocument();
  });
});
