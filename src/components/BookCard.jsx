import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  CardActionArea,
  Fade,
} from "@mui/material";
import { TrendingUp, MenuBook } from "@mui/icons-material";
import { getBookCoverUrl } from "../api/openLibrary";

export default function BookCard({ book, index, showTrendPosition, onClick }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const rating = book.rating || Math.random() * 3 + 2;

  const coverId = book.cover_i || book.cover_edition_key;
  const coverUrl = coverId ? getBookCoverUrl(coverId, "L") : null;

  const authorName = book.author_name
    ? Array.isArray(book.author_name)
      ? book.author_name[0]
      : book.author_name
    : "Unknown Author";

  const publishYear = book.first_publish_year || book.publish_year || "N/A";

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Fade in timeout={600}>
      <Card
        sx={{
          height: "100%",
          width: 225,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: (theme) => theme.shadows[12],
          },
        }}
      >
        <CardActionArea onClick={() => onClick(book)} sx={{ height: "100%" }}>
          {showTrendPosition && index !== undefined && (
            <Chip
              icon={<TrendingUp />}
              label={`#${index + 1}`}
              size="small"
              color="primary"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
                fontWeight: 600,
              }}
            />
          )}

          <Box
            sx={{
              position: "relative",
              paddingTop: "140%",
              bgcolor: "grey.100",
            }}
          >
            {!imageError && coverUrl ? (
              <CardMedia
                component="img"
                image={coverUrl}
                alt={book.title}
                onError={handleImageError}
                onLoad={handleImageLoad}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "action.selected",
                }}
              >
                <MenuBook sx={{ fontSize: 60, color: "text.secondary" }} />
              </Box>
            )}
          </Box>

          <CardContent
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="h3"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: "3.6em",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {book.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                mb: 1,
              }}
            >
              {authorName}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", mt: "auto", mb: 1 }}
            >
              <Rating value={rating} readOnly size="small" precision={0.5} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({rating.toFixed(1)})
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary">
              Published: {publishYear}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
}
