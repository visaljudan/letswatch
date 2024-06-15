import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/reset_password/ResetPassword";
import NewPassword from "./pages/reset_password/NewPassword";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpAdmin from "./admin/pages/SignUpAdmin";
import SignInAdmin from "./admin/pages/SignInAdmin";
import AdminRequest from "./admin/pages/AdminRequest";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminMovies from "./admin/pages/AdminMovies";
import UploadMovies from "./admin/pages/adminMovies/UploadMovies";
import Explore from "./pages/Explore";
import MovieDetail from "./pages/movies/inside_movie/MovieDetail";
import MoviePlay from "./pages/movies/inside_movie/MoviePlay";
import Profile from "./user/Profile";
import Setting from "./user/Setting";
import Subscription from "./user/subscription/Subscription";
import PaymentForm from "./user/subscription/Payment";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/movies/MoviesPage";
import MoviesGenrePage from "./pages/movies/MoviesGenrePage";
import PrivateRouteUser from "./components/private_route/PrivateRouteUser";
import PrivateRouteGuest from "./components/private_route/PrivateRouteGuest";
import Save from "./user/Save";
import History from "./user/History";
import MySubscription from "./user/subscription/MySubscription";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Authenication */}
        <Route element={<PrivateRouteUser />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/new-password/:token"
            element={<NewPassword />}
          />
        </Route>

        {/* Guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/:page" element={<MoviesPage />} />
        <Route path="/:page/:id" element={<MoviesGenrePage />} />
        <Route path="/explore" element={<Explore />} />

        {/* Movie */}
        <Route path="/movies/:id/detail" element={<MovieDetail />} />

        {/* User */}
        <Route element={<PrivateRouteGuest />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/setting" element={<Setting />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription/:id/payment" element={<PaymentForm />} />
          <Route path="/save-movies" element={<Save />} />
          <Route path="/history-movies" element={<History />} />
          <Route path="/movies/:id/play" element={<MoviePlay />} />
        </Route>

        <Route path="/my-subscription" element={<MySubscription />} />

        {/* Routes for Admin */}
        {/* <Route path="/admin/signup" element={<SignUpAdmin />} />
        <Route path="/admin/signin" element={<SignInAdmin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/admin-request" element={<AdminRequest />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/upload" element={<UploadMovies />} /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
