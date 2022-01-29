import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Form from "../form/UrlShortnerForm";


describe("URL Shortner form test", () => {

    it("renders successfully", () => {
        render(<Form />)
        expect(screen.getByPlaceholderText("Simplify your URL")).toBeInTheDocument()
    });

    it("matches snapshot", () => {
        const { asFragment } = render(<Form />)
        expect(asFragment()).toMatchSnapshot();
    })

    it("changes text of the url input", () => {
        render(<Form />);
        const TEXT = "https://www.yahoo.com";
        const INPUT = screen.getByPlaceholderText("Simplify your URL");
        fireEvent.change(INPUT, { target: { value: TEXT}});
        expect(INPUT.value).toBe(TEXT);
    });

    it("short url form submits", () => {
        const handleSubmit = jest.fn(e => e.preventDefault())
        render(<Form handleSubmit={handleSubmit} />);
        const TEXT = "https://www.yahoo.com";
        const INPUT = screen.getByPlaceholderText("Simplify your URL");
        fireEvent.change(INPUT, { target: { value: TEXT}});
        userEvent.click(screen.getByText('Generate'));
        expect(handleSubmit).toHaveBeenCalled();
    })
})