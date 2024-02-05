import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { createContext, useState } from "react";
export const AuthContext = createContext();
function App() {
  const [jwt, setJWt] = useState(null)
  return (
    <>
    
      <AuthContext.Provider value={{
                auth: [jwt, setJWt],
              }}>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/sign" replace />} 
            
          />
        </Routes>
        </AuthContext.Provider>
    
    </>
  );
}

export default App;
