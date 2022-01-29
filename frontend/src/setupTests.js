// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setLogger } from 'react-query'

import server from "./mocks/server.js";

// Establish API mocking before all tests.
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// silence react-query errors
setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
})