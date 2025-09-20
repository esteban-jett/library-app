import { useState } from "react";
import {
  Container,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Fade,
  Chip,
  Zoom,
} from "@mui/material";
import {
  Casino,
  AutoStories,
  Refresh,
  LocalLibrary,
} from "@mui/icons-material";
import BookCard from "../components/BookCard";
import BookDialog from "../components/BookDialog";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { searchBooksBySubject } from "../api/openLibrary";

const SUBJECTS = [
  "fiction",
  "science",
  "history",
  "mystery",
  "romance",
  "fantasy",
  "biography",
  "adventure",
  "thriller",
  "comedy",
  "drama",
  "poetry",
];

export default function RandomBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSurpriseMe = async () => {
    setLoading(true);
    setHasSearched(true);

    const nextIndex =
      currentSubjectIndex === SUBJECTS.length - 1 ? 0 : currentSubjectIndex + 1;
    const nextSubject = SUBJECTS[nextIndex];

    try {
      const data = await searchBooksBySubject(nextSubject, 12);

      if (data.docs && data.docs.length > 0) {
        const booksWithRatings = data.docs.map((book) => ({
          ...book,
          rating: Math.random() * 3 + 2,
          subject: nextSubject,
        }));

        setBooks(booksWithRatings);
        setCurrentSubjectIndex(nextIndex);
      } else {
        setBooks([]);
        setCurrentSubjectIndex(nextIndex);
      }
    } catch (err) {
      console.error("Failed to fetch random books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
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

  const getCurrentSubject = () =>
    currentSubjectIndex === -1 ? "NONE" : SUBJECTS[currentSubjectIndex];
  const getNextSubject = () =>
    currentSubjectIndex === -1
      ? "FICTION"
      : SUBJECTS[
          currentSubjectIndex === SUBJECTS.length - 1
            ? 0
            : currentSubjectIndex + 1
        ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Random Book Discovery
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 500,
            mx: "auto",
            borderRadius: 3,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Casino sx={{ fontSize: 60, color: "white" }} />

            <Button
              variant="contained"
              size="large"
              onClick={handleSurpriseMe}
              disabled={loading}
              startIcon={hasSearched ? <Refresh /> : <AutoStories />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "grey.100",
                },
                "&:disabled": {
                  bgcolor: "grey.300",
                },
              }}
            >
              {hasSearched ? "Surprise Me Again!" : "Surprise Me!"}
            </Button>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Chip
                label={`Current: ${getCurrentSubject().toUpperCase()}`}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  fontWeight: 600,
                }}
                icon={<LocalLibrary />}
              />
              <Chip
                label={`Next: ${getNextSubject().toUpperCase()}`}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      {loading ? (
        <LoadingSkeleton count={12} />
      ) : books.length > 0 ? (
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Zoom
              in
              key={book.key || index}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <BookCard book={book} onClick={handleBookClick} />
              </Grid>
            </Zoom>
          ))}
        </Grid>
      ) : (
        hasSearched &&
        !loading && (
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
                No books found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try clicking "Surprise Me Again!" to explore a different genre.
              </Typography>
            </Paper>
          </Fade>
        )
      )}

      {!hasSearched && (
        <Fade in>
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <AutoStories
              sx={{ fontSize: 100, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Find new books with just a click!
            </Typography>
          </Box>
        </Fade>
      )}

      <BookDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        book={selectedBook}
      />
    </Container>
  );
}
