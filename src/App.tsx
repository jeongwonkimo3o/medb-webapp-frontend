import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import MyPage from "./pages/Mypage/MyPage";
import MedicationPage from "./pages/Mypage/MedicationPage";
import MyReviewPage from "./pages/Mypage/MyReviewPage";
import OldMedicationPage from "./pages/Mypage/OldMedicationPage";
import PrivacyPage from "./pages/Privacy/PrivacyPage";
import NoticePage from "./pages/NoticePage";
import WriteNoticePage from "./pages/NoticePage/WriteNoticePage";
import UserManagementPage from "./pages/UserManagementPage";
import ViewNoticePage from "./pages/NoticePage/ViewNoticePage";
import EditNoticePage from "./pages/NoticePage/EditNoticePage";
import DataManagementPage from "./pages/DataManagementPage";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithHeader />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="detail/:item_seq" element={<DetailPage />} />
      </Route>

      <Route path="mypage/:id/*" element={<MyPageLayout />}>
        <Route index element={<MyPage />} />
        <Route path="medication" element={<MedicationPage />} />
        <Route path="myreview" element={<MyReviewPage />} />
        <Route path="oldmedication" element={<OldMedicationPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>

      <Route path="notice/*" element={<MyPageLayout />}>
        <Route index element={<NoticePage />} />
        <Route path="write" element={<WriteNoticePage />} />
        <Route path="edit/:notice_id" element={<EditNoticePage />} />
        <Route path="detail/:notice_id" element={<ViewNoticePage />} />
      </Route>

      <Route path="admin/*" element={<MyPageLayout />}>
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="data-management" element={<DataManagementPage />} />
      </Route>
    </Routes>
  );
}

function LayoutWithHeader(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function MyPageLayout(): JSX.Element {
  return <Outlet />;
}

export default App;
