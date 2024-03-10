import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import MyPage from "./pages/Mypage/MyPage";

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
      <Route path="/mypage" element={<MyPage />} />
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

export default App;
