import routes from "./routes";
import {
    BrowserRouter,
    Route,
    type RouteObject,
    Routes,
} from "react-router-dom";
import { ReactElement } from "react";

const Router = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route: RouteObject) => {
                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={route.element}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
