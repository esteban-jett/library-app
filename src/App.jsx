import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext";
import NavBar from "./components/NavBar";
import BrowseBooks from "./pages/BrowseBooks";
import RandomBooks from "./pages/RandomBooks";
import TrendingBooks from "./pages/TrendingBooks";
import About from "./pages/About";

export default function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <NavBar />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<TrendingBooks />} />
              <Route path="/random" element={<RandomBooks />} />
              <Route path="/browse" element={<BrowseBooks />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeContextProvider>
  );
}
