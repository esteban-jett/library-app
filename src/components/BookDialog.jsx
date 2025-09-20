import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Rating,
  Chip,
  CircularProgress,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  Close,
  CalendarMonth,
  Person,
  MenuBook,
  Category,
  Language,
} from "@mui/icons-material";
import { getBookCoverUrl, getBookDetails } from "../api/openLibrary";

export default function BookDialog({ open, onClose, book }) {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!open || !book?.key) return;

      setLoading(true);
      try {
        const details = await getBookDetails(book.key);
        setBookDetails(details);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [open, book]);

  if (!book) return null;

  const rating = book.rating || Math.random() * 3 + 2;
  const coverId = book.cover_i || book.cover_edition_key;
  const coverUrl = coverId ? getBookCoverUrl(coverId, "L") : null;

  const authorName = book.author_name
    ? Array.isArray(book.author_name)
      ? book.author_name.join(", ")
      : book.author_name
    : "Unknown Author";

  const publishYear = book.first_publish_year || book.publish_year || "N/A";
  const subjects = book.subject
    ? Array.isArray(book.subject)
      ? book.subject
      : [book.subject]
    : bookDetails?.subjects
    ? Array.isArray(bookDetails.subjects)
      ? bookDetails.subjects
      : [bookDetails.subjects]
    : [];
  const languages = book.language || bookDetails?.languages;
  const pageCount = book.number_of_pages_median || bookDetails?.number_of_pages;

  const description =
    bookDetails?.description?.value ||
    bookDetails?.description ||
    book.description ||
    "No description available for this book.";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h5" component="div" fontWeight={600}>
          {book.title}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ position: "relative", width: "100%" }}>
                {!imageError && coverUrl ? (
                  <Box
                    component="img"
                    src={coverUrl}
                    alt={book.title}
                    onError={() => setImageError(true)}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      paddingTop: "140%",
                      position: "relative",
                      bgcolor: "action.selected",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBook
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 80,
                        color: "text.secondary",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Person fontSize="small" color="action" />
                  <Typography variant="body1">
                    <strong>Author:</strong> {authorName}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarMonth fontSize="small" color="action" />
                  <Typography variant="body1">
                    <strong>First Published:</strong> {publishYear}
                  </Typography>
                </Box>

                {pageCount && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MenuBook fontSize="small" color="action" />
                    <Typography variant="body1">
                      <strong>Pages:</strong> {pageCount}
                    </Typography>
                  </Box>
                )}

                {languages && languages.length > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Language fontSize="small" color="action" />
                    <Typography variant="body1">
                      <strong>Language:</strong>{" "}
                      {Array.isArray(languages)
                        ? languages.join(", ")
                        : languages}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Rating:
                  </Typography>
                  <Rating value={rating} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary">
                    ({rating.toFixed(1)})
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" gutterBottom fontWeight={500}>
                    Description
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {typeof description === "object"
                      ? description.value
                      : description}
                  </Typography>
                </Box>

                {subjects && subjects.length > 0 && (
                  <>
                    <Divider />
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Category fontSize="small" color="action" />
                        <Typography variant="h6" fontWeight={500}>
                          Subjects
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {subjects.slice(0, 10).map((subject, index) => (
                          <Chip
                            key={index}
                            label={subject}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
