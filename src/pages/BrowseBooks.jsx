import { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  LinearProgress,
  Paper,
  Fade,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import BookCard from "../components/BookCard";
import BookDialog from "../components/BookDialog";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { searchBooks } from "../api/openLibrary";

export default function BrowseBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await searchBooks(searchQuery, 24);

      if (data.docs && data.docs.length > 0) {
        const booksWithRatings = data.docs.map((book) => ({
          ...book,
          rating: Math.random() * 3 + 2,
        }));
        setSearchResults(booksWithRatings);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError("Failed to search books. Please try again.");
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearched(false);
    setError(null);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Browse Books
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSearch}
          elevation={3}
          sx={{
            p: 2,
            maxWidth: 600,
            mx: "auto",
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for books by title, author, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} edge="end" size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Paper>

        {loading && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress />
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 1 }}
              color="text.secondary"
            >
              Searching for books...
            </Typography>
          </Box>
        )}
      </Box>

      {error && (
        <Fade in>
          <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
            {error}
          </Alert>
        </Fade>
      )}

      {searched && !loading && searchResults.length === 0 && !error && (
        <Fade in>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              bgcolor: "background.default",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom color="text.secondary">
              No results found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We couldn't find any books matching "{searchQuery}". Try searching
              with different keywords.
            </Typography>
          </Paper>
        </Fade>
      )}

      {loading ? (
        <LoadingSkeleton count={24} />
      ) : searchResults.length > 0 ? (
        <Fade in>
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }} color="text.secondary">
              Found {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </Typography>
            <Grid container spacing={3}>
              {searchResults.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.key || index}>
                  <BookCard book={book} onClick={handleBookClick} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      ) : (
        !searched && (
          <Fade in>
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: "center",
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            >
              <Search sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
              <Typography variant="h5" gutterBottom color="text.secondary">
                Start Your Search
              </Typography>
            </Paper>
          </Fade>
        )
      )}

      <BookDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        book={selectedBook}
      />
    </Container>
  );
}
