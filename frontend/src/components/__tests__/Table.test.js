import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Table from "../table/Table";

describe("Table tests", () => {
  const mockData = [
    {
      fullUrl: "http://www.yahoo.com",
      shortUrl: "xdsjds",
      createdAt: "2021-03-20",
    },
  ];
  it("table renders successfully", () => {
    render(
      <MemoryRouter>
        <Table
          data={{ results: mockData }}
          loading={false}
          heading="Test Table"
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Table")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Table loading={false} data={{ results: mockData }} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("table shows spinner while loading records", () => {
    render(<Table data={{ results: []}} loading heading="Test Table" />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("displays passed in data", () => {
    render(
      <MemoryRouter>
        <Table loading={false} data={{ results: mockData }} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockData[0].fullUrl)).toBeInTheDocument();
  });
});
