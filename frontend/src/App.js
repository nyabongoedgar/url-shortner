import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes/IndexRoutes";
import "./css/base.scss";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <IndexRoutes />
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
