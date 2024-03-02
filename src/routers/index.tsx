import { Layout } from "components";
import { Dashboard, Home, Profile } from "pages";
import { Route, Routes } from "react-router-dom";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
