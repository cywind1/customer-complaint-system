// rafce
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

// it is necessary to have an element inside a Route component in React.
// If without an element -> runtime error
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>

              <Route path="complaints">
                <Route index element={<ComplaintsList />} />
                <Route path=":id" element={<EditComplaint />} />
                <Route path="new" element={<NewComplaint />} />
              </Route>
            </Route>
            {/* End Dash */}
          </Route>{" "}
          {/* End Prefetch */}
        </Route>
        {/* End PersistLogin  */}
      </Route>
    </Routes>
  );
}

export default App;
