import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CompleteProfile from "./components/Auth/CompleteProfile";
import UserPage from "./components/UserPage/UserPage";
import Home from "./components/Home/Home";
import Todos from "./components/Todos/Todos";
import Albums from "./components/Albums/Albums";
import Photos from "./components/Photos/Photos";
import PostsPage from "./components/Posts/PostsPage";

// The app's routes only - no logic here.
export default function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* login / register pages: the design + the current form inside it */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/details" element={<CompleteProfile />} />
        </Route>

        {/* the user's page: Header + the inner page under it */}
        <Route path="/:username" element={<UserPage />}>
          {/* /:username itself - the welcome page */}
          <Route index element={<Home />} />
          <Route path="todos" element={<Todos />} />
          {/* posts page: /posts = my posts, /posts/all = all posts, /posts/new = add
              (one route - PostsPage reads the rest of the URL with useParams) */}
          <Route path="posts/*" element={<PostsPage />} />
          <Route path="albums" element={<Albums />} />
          <Route path="albums/:albumId/photos" element={<Photos />} />
        </Route>
      </Routes>
    </main>
  );
}
