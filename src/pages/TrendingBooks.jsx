import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import {
  TrendingUp,
  LocalLibrary,
  Science,
  History,
} from "@mui/icons-material";
import BookCard from "../components/BookCard";
import BookDialog from "../components/BookDialog";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getTrendingBooks, searchBooksBySubject } from "../api/openLibrary";

export default function TrendingBooks() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [scienceBooks, setScienceBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [loading, setLoading] = useState({
    trending: true,
    fiction: true,
    science: true,
    history: true,
  });
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    fetchTrending();
    fetchFiction();
    fetchScience();
    fetchHistory();
  };

  const fetchTrending = async () => {
    try {
      setLoading((prev) => ({ ...prev, trending: true }));
      const data = await getTrendingBooks();

      const booksWithRatings =
        data.works?.slice(0, 12).map((book) => ({
          ...book,
          rating: Math.random() * 3 + 2,
        })) || [];
      setTrendingBooks(booksWithRatings);
    } catch (err) {
      setError("Failed to fetch trending books");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, trending: false }));
    }
  };

  const fetchFiction = async () => {
    try {
      setLoading((prev) => ({ ...prev, fiction: true }));
      const data = await searchBooksBySubject("fiction", 6);
      const booksWithRatings =
        data.docs?.slice(0, 6).map((book) => ({
          ...book,
          rating: Math.random() * 3 + 2,
        })) || [];
      setFictionBooks(booksWithRatings);
    } catch (err) {
      console.error("Failed to fetch fiction books:", err);
    } finally {
      setLoading((prev) => ({ ...prev, fiction: false }));
    }
  };

  const fetchScience = async () => {
    try {
      setLoading((prev) => ({ ...prev, science: true }));
      const data = await searchBooksBySubject("science", 6);
      const booksWithRatings =
        data.docs?.slice(0, 6).map((book) => ({
          ...book,
          rating: Math.random() * 3 + 2,
        })) || [];
      setScienceBooks(booksWithRatings);
    } catch (err) {
      console.error("Failed to fetch science books:", err);
    } finally {
      setLoading((prev) => ({ ...prev, science: false }));
    }
  };

  const fetchHistory = async () => {
    try {
      setLoading((prev) => ({ ...prev, history: true }));
      const data = await searchBooksBySubject("history", 6);
      const booksWithRatings =
        data.docs?.slice(0, 6).map((book) => ({
          ...book,
          rating: Math.random() * 3 + 2,
        })) || [];
      setHistoryBooks(booksWithRatings);
    } catch (err) {
      console.error("Failed to fetch history books:", err);
    } finally {
      setLoading((prev) => ({ ...prev, history: false }));
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  };

  const renderSection = (title, books, isLoading, icon, showTrend = false) => (
    <Box sx={{ mb: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "background.default",
          borderLeft: 4,
          borderColor: "primary.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon}
          <Typography variant="h4" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      </Paper>

      {isLoading ? (
        <LoadingSkeleton count={title === "Trending Books" ? 12 : 6} />
      ) : (
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={title === "Trending Books" ? 3 : 4}
              key={book.key || index}
            >
              <BookCard
                book={book}
                index={index}
                showTrendPosition={showTrend}
                onClick={handleBookClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {renderSection(
        "Trending Books",
        trendingBooks,
        loading.trending,
        <TrendingUp color="primary" fontSize="large" />,
        true
      )}

      <Divider sx={{ my: 4 }} />

      {renderSection(
        "Popular Fiction",
        fictionBooks,
        loading.fiction,
        <LocalLibrary color="secondary" fontSize="large" />
      )}

      <Divider sx={{ my: 4 }} />

      {renderSection(
        "Science & Technology",
        scienceBooks,
        loading.science,
        <Science color="success" fontSize="large" />
      )}

      <Divider sx={{ my: 4 }} />

      {renderSection(
        "History & Biography",
        historyBooks,
        loading.history,
        <History color="warning" fontSize="large" />
      )}

      <BookDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        book={selectedBook}
      />
    </Container>
  );
}
