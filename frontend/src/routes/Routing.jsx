import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout"
import DashboardPage from "../pages/dashboard/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import ProfilePage from "../pages/profile/Profile";
import DepartmentPage from "../pages/master/DepartmentPage";
import BatchPage from "../pages/master/BatchPage";
import FacultyPage from "../pages/master/FacultyPage";
import SubjectPage from "../pages/master/SubjectPage";
import TimetablePage from "../pages/timetable/TimetablePage";
import FacultySubjectMappingPage from "../pages/master/FacultySubjectMappingPage";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />

                    <Route path="/master/departments" element={<DepartmentPage />}/>
                    <Route path="/master/batches" element={<BatchPage />}/>
                    <Route path="/master/faculties" element={<FacultyPage />}/>
                    <Route path="/master/subjects" element={<SubjectPage />}/>
                    <Route path="/master/faculty-subject-mapping" element={<FacultySubjectMappingPage />}/>

                    <Route path="/timetable" element={<TimetablePage />}/>
                </Route>

                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default Routing;

