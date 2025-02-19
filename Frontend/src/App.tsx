import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./component/Auth";
import Task from "./component/Task";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Toaster } from 'react-hot-toast';
import Authenticate from "./component/ProtectedRoute";

const App = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    return (
        <Router>
            <Toaster/>
            <Authenticate>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/task" element={ <Task /> } />
                <Route path="*" element={<Navigate to={user ? "/task" : "/auth"} replace />} />
            </Routes>
            </Authenticate>
        </Router>
    );
};

export default App;
