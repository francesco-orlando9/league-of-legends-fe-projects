import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main style={{ margin: "0 2rem", paddingTop: "30px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
