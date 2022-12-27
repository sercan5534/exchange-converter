import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {Spin} from "antd";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store";


//Main layout
import Layout from './layout/layout';
import NotFound from './pages/404';

import CurrencyConverter from "./pages/currency-converter";
import { getConversions } from './utils';

//Lazy load for not loaded pages initially
const ConversionHistory = lazy(() => import("./pages/conversion-history"));

//get conversions from localstorage
const conversions = getConversions();


//configure store
const store = configureStore({
    history:{
        conversions
    }
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<CurrencyConverter />} />
            <Route path="converter" element={<CurrencyConverter />} />
            <Route path="history" element={<ConversionHistory />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Suspense fallback={<Spin spinning={true} />}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
    </React.StrictMode>
);