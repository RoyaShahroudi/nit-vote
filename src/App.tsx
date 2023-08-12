import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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


function App() {

  return (
      <div className="h-screen flex justify-center">
          <div className="w-full space-y-8">
              <BrowserRouter>
                  <Routes>
                      <Route path="/admin/login" element={<AdminLogin/>} />
                      <Route path="/admin/elections" element={<AdminElections/>} />
                      <Route path="/admin/new-election" element={<NewElection/>} />
                      <Route path="/admin/election-result/:id" element={<ElectionResult/>} />
                      <Route path="/admin/admins" element={<Admins/>} />
                      <Route path="/admin/new-admin" element={<NewAdmin/>} />

                      <Route path="/login" element={<ClientLogin/>} />
                      <Route path="/register" element={<ClientRegister/>} />
                      <Route path="/elections" element={<ClientElections/>} />
                      <Route path="/elections-history" element={<ElectionsHistory/>} />
                      <Route path="/elections/:id" element={<Election/>} />

                  </Routes>
              </BrowserRouter>
          </div>
      </div>
  )
}

export default App
