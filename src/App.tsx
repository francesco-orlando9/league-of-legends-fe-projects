import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/Root";
import HomePage from "./pages/Home";
import ChampionsPage, { loader as fetchChampions } from "./pages/Champions";
import ChampionDetailPage from "./pages/ChampionDetail";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/reactQuery";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "champions",
        children: [
          {
            index: true,
            element: <ChampionsPage />,
            // loader: fetchChampions,  da capire perchè in pagina usando il loader non tiene lo stato tanstack query
          },
          {
            path: ":id",
            element: <ChampionDetailPage />,
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
