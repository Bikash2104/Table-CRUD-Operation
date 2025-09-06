import { Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/AddEmployee/UserForm";
import UserViewPage from "./pages/UserViewDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />

      <Route
        path="/create"
        element={
          <UserForm
            initialValues={{
              name: "",
              username: "",
              email: "",
              phone: "",
              website: "",
              isActive: false,
              skills: [""],
              availableSlots: [""],
              address: { street: "", city: "", zipcode: "" },
              company: { name: "" },
              role: "",
            }}
          />
        }
      />

      <Route
        path="/edit/:id"
        element={
          <UserForm
            initialValues={{
              name: "",
              username: "",
              email: "",
              phone: "",
              website: "",
              isActive: false,
              skills: [""],
              availableSlots: [""],
              address: { street: "", city: "", zipcode: "" },
              company: { name: "" },
              role: "",
            }}
            isEdit
          />
        }
      />
      <Route path="/view/:id" element={<UserViewPage />} />
    </Routes>
  );
}

export default App;
