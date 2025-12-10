/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SettingsPage from "./pages/settings";
import ServiceDetailPage from "./pages/service_detail";
import ServiceContentPage from "./pages/service_content";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SettingsPage />} path="/settings" />
      <Route element={<ServiceDetailPage />} path="/service/:serviceId" />
      <Route element={<ServiceContentPage />} path="/service/:serviceId/edit" />
    </Routes>
  );
}

export default App;
