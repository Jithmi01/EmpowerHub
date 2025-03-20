import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/common/header";
import PublishAd from "./components/DonationAdmin/PublishAd";
import Ads from "./components/DonationAdmin/ShowAllAds";
import AddEvent from "./components/Event/Admin/AddEvent";
import AllEvent from "./components/Event/Admin/AllEvent";
import UpdateEvent from "./components/Event/Admin/UpdateEvent";
import DetailsPrint from "./components/Event/Admin/DetailsPrint";
import Showvacancies from "./components/JobFind/Show_Vacancies";
import JobApply from "./components/JobFind/JobApply";
import AppliedJobs from "./components/JobFind/AppliedJobs";
import Home from "./pages/Home/Home";
import MakeDonations from "./components/DoDonations/MakeDonations";
import Register from "./components/Register/Register";
import ShowDonations from "./components/DoDonations/ShowDonations";
import UpdateAd from "./components/DonationAdmin/UpdateAd";
import DisplayEvent from "./components/Event/User/DisplayEvent";
import EditDonations from "./components/DoDonations/EditDonations";
import JobPost from "./components/JobPortal/JobPost";
import JobList from "./components/JobPortal/JobList";
import AppliedUsers from "./components/JobPortal/AppliedUsers";
import AllParticipants from "./components/Event/Admin/AllParticipants ";
import CardDetails from "./components/DoDonations/CardDetails";
import Login from "./components/User/Login";
import PaymentPortal from "./components/DoDonations/PaymentPortal";
import UserLayout from "./layouts/UserLayout";
import AdsUserView from "./components/DonationAdmin/AdsUserView";
import axios from "axios";
import Admin from "./pages/AdminDashboard/Admin_dashboard";
import Financial from "./components/Financial/Financial";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  // const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  axios.interceptors.request.use(
    function (config) {
      if (localStorage.getItem("token"))
        config.headers.Authorization = localStorage.getItem("token");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Admin />
          </AdminLayout>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/userDash"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />
      {/* Sakuni's Routes Begn here */}
      <Route path="/add" element={<JobPost />} />
      <Route
        path="/joblist"
        element={
          <AdminLayout>
            <JobList />
          </AdminLayout>
        }
      />
      <Route
        path="/appliedUsers/:id"
        element={
          <AdminLayout>
            <AppliedUsers />
          </AdminLayout>
        }
      />
      <Route
        path="/showVacancies"
        element={
          <UserLayout>
            <Showvacancies />
          </UserLayout>
        }
      />
      <Route
        path="/jobApply/:id"
        element={
          <UserLayout>
            <JobApply />
          </UserLayout>
        }
      />
      <Route
        path="/appliedjobs"
        element={
          <UserLayout>
            <AppliedJobs />
          </UserLayout>
        }
      />
      {/*SakuniF's Routes Ends here*/}
      {/* Leo's Routes Begin here */}
      <Route path="/pdonation" element={<PublishAd />} />{" "}
      {/*Ad creation form(not being used)*/}
      <Route
        path="/showAds"
        element={
          <AdminLayout>
            <Ads />
          </AdminLayout>
        }
      />{" "}
      {/*Ad display*/}

      <Route path="/update-ad/:_id" element={<UpdateAd />} />


      <Route
        path="/donate"
        element={
          <UserLayout>
            <MakeDonations />
          </UserLayout>
        }
      />{" "}
      {/*Donating form*/}
      <Route
        path="/showDonation"
        element={
          <UserLayout>
            <ShowDonations />
          </UserLayout>
        }
      />
      {/*Donation display*/}
      <Route path="/editDonation/:id" element={<EditDonations />} />{" "}
      {/*Donation editing*/}
      <Route path="/cardDetails/" element={<CardDetails />} />{" "}
      {/*Card Detail Page*/}
      
      <Route path="/paymentDetails/" element={<PaymentPortal />} />{" "}
      {/*Card Detail Page*/}
      <Route
        path="/adsUserView/"
        element={
          <UserLayout>
            <AdsUserView />
          </UserLayout>
        }
      />
      {/*Leo's Routes Ends here*/}
      <Route path="/addevent" element={<AddEvent />} />
      <Route
        path="/financial"
        element={
          <AdminLayout>
            <Financial />
          </AdminLayout>
        }
      />
      <Route
        path="/allEvent"
        element={
          <AdminLayout>
            <AllEvent />
          </AdminLayout>
        }
      />
      <Route path="/updateEvent/:id" element={<UpdateEvent />} />
      <Route path="/printDetails/:id" element={<DetailsPrint />} />
      <Route
        path="/userEvent"
        element={
          <UserLayout>
            <DisplayEvent />
          </UserLayout>
        }
      />
      <Route path="/AllParticipants/:id" element={<AllParticipants />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to={"/userDash"} />} />
    </Routes>
  );
}

export default App;
