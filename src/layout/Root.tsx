import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main style={{ margin: "0 1rem", padding: "30px 0", flexGrow: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
