import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { renderWithClient } from "../../mocks/utils";
import server from "../../mocks/server";
import Container from "../container/Container";
import userEvent from "@testing-library/user-event";

describe("container component", () => {
  it("container render successfully", async () => {
    renderWithClient(<Container />);
    expect(await screen.findByText(/Generate/i)).toBeInTheDocument();
  });

  it("displays form errors", () => {
    renderWithClient(
      <MemoryRouter>
        <Container />
      </MemoryRouter>
    );
    const TEXT = "hoooo";
    const INPUT = screen.getByPlaceholderText("Simplify your URL");
    fireEvent.change(INPUT, { target: { value: TEXT } });
    userEvent.click(screen.getByText("Generate"));
    expect(screen.getByText("Please enter a valid url!")).toBeInTheDocument();
  });

  it("failure query component", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithClient(
      <MemoryRouter>
        <Container />
      </MemoryRouter>
    );
    expect(await screen.findByTestId('get-server-error')).toHaveTextContent("Failed to load recent urls")
  });
});
