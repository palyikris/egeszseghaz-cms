/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SettingsPage from "./pages/settings";
import ServiceDetailPage from "./pages/service_detail";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SettingsPage />} path="/settings" />
      <Route element={<ServiceDetailPage />} path="/service/:serviceId" />
    </Routes>
  );
}

export default App;
