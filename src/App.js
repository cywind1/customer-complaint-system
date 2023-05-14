// import using {} = a named export, you can only use that export in your code
// import without {} = the default export, gives you access to all exports from the module through the default export object
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import ComplaintsList from "./features/complaints/ComplaintsList";
// 7.7
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditComplaint from "./features/complaints/EditComplaint";
import NewComplaint from "./features/complaints/NewComplaint";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

// it is necessary to have an element inside a Route component in React.
// If without an element -> runtime error
function App() {
  return (
    <Routes>
      {/* Route for the top-level layout of the application */}
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          {/* Route for the authentication check */}
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            {/* Route for prefetching data */}
            <Route element={<Prefetch />}>
              {/* Route for the dashboard layout */}
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                {/* Route for role-based authentication check */}
                {/* The most crucial line: blocked logged in users but without roles to get access to the resources with address. */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  {/* Route for managing users */}
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>{" "}
                {/* End role-based authentication check */}
                {/* Route for managing complaints */}
                <Route path="complaints">
                  <Route index element={<ComplaintsList />} />
                  <Route path=":id" element={<EditComplaint />} />
                  <Route path="new" element={<NewComplaint />} />
                </Route>
              </Route>
              {/* End dashboard layout */}
            </Route>
            {/* End prefetching data */}
          </Route>
          {/* End authentication check */}
        </Route>
        {/* End protected routes */}
      </Route>
      {/* End top-level layout */}
    </Routes>
  );
}

export default App;
