import { Card, CardContent, Skeleton, Box, Grid } from "@mui/material";

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                height: 300,
                animation: "wave",
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1.5rem",
                  mb: 1,
                  animation: "wave",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  width: "60%",
                  mb: 1,
                  animation: "wave",
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width={180}
                  height={20}
                  sx={{ animation: "wave" }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "0.875rem",
                    width: "40%",
                    animation: "wave",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
