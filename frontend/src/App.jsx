import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import Routing from "./routes/Routing";

import useAuthStore from "./store/auth.store";

function App() {
  const auth = useAuthStore((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {auth?.access_token ? (
          <Route path="/*" element={<Routing />} />
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;