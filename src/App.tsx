import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css'
import AdminLogin from "./pages/Admin/Login";
import AdminElections from "./pages/Admin/Elections";
import NewElection from "./pages/Admin/NewElection";
import ElectionResult from "./pages/Admin/ElectionResult";
import Admins from "./pages/Admin/Admins";
import NewAdmin from "./pages/Admin/NewAdmin";

import ClientLogin from "./pages/Client/Login";
import ClientRegister from "./pages/Client/Register";
import ClientElections from "./pages/Client/Elections";
import ElectionsHistory from "./pages/Client/ElectionsHistory";
import Election from "./pages/Client/Election";
import {getTokens, localStorageGetUser} from "./utils";
import axios from "axios";
import {AuthProvider, useAuth} from "./utils/auth";
import {RequireAuth} from "./utils/RequireAuth";


function App() {
    const auth = useAuth();

    (function () {
        const tokens = getTokens();
        // @ts-ignore
        if (tokens?.token && localStorageGetUser()) {
            console.log("have token")
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokens?.token}`;
            // @ts-ignore
            auth?.login(tokens?.token);
        } else {
            console.log("NOT have token")

            axios.defaults.headers.common['Authorization'] = null;
            // @ts-ignore
            auth?.logout();
        }
    })();

    return (
        <AuthProvider>
            <div className="h-screen flex justify-center">
                <div className="w-full space-y-8">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/admin/login" element={<AdminLogin/>}/>
                            <Route path="/admin/elections" element={<RequireAuth><AdminElections/></RequireAuth>}/>
                            <Route path="/admin/new-election" element={<RequireAuth><NewElection/></RequireAuth>}/>
                            <Route path="/admin/election-result/:id"
                                   element={<RequireAuth><ElectionResult/></RequireAuth>}/>
                            <Route path="/admin/admins" element={<RequireAuth><Admins/></RequireAuth>}/>
                            <Route path="/admin/new-admin" element={<RequireAuth><NewAdmin/></RequireAuth>}/>

                            <Route path="/login" element={<ClientLogin/>}/>
                            <Route path="/register" element={<ClientRegister/>}/>
                            <Route path="/elections" element={<RequireAuth><ClientElections/></RequireAuth>}/>
                            <Route path="/elections-history" element={<RequireAuth><ElectionsHistory/></RequireAuth>}/>
                            <Route path="/elections/:id" element={<RequireAuth><Election/></RequireAuth>}/>

                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </AuthProvider>
    )
}

export default App
