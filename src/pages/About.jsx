import { Container, Typography, Avatar, Box, Chip } from "@mui/material";
import {
  Code,
  Web,
  Storage,
  Brush,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const skills = [
  { name: "React", icon: <Code /> },
  { name: "JavaScript", icon: <Web /> },
  { name: "HTML", icon: <Brush /> },
  { name: "MySQL", icon: <Storage /> },
  { name: "Material-UI", icon: <Brush /> },
  { name: "Python", icon: <Code /> },
  { name: "Java", icon: <Web /> },
  { name: "PHP", icon: <Code /> },
  { name: "VueJS", icon: <Brush /> },
  { name: "PostgreSQL", icon: <Storage /> },
  { name: "Valorant Player", icon: <SportsEsportsIcon /> },
  { name: "Hardstuck Silver", icon: <EmojiEventsIcon /> },
];

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: { xs: "1", md: "0 0 350px" },
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="/profile.jpg"
            alt="Jett Esteban"
            sx={{
              width: 300,
              height: 300,
              mb: 3,
              boxShadow: 3,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            Jett R. Esteban
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 500 }}
          >
            Full Stack Developer
          </Typography>
        </Box>

        <Box
          sx={{
            flex: "1",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 2,
                borderBottom: 1,
                borderColor: "divider",
                pb: 1,
              }}
            >
              About Me
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ lineHeight: 1.8, color: "text.secondary" }}
            >
              Hello! Jett Esteban here, I am always eager to learn and my
              curiosity is endless. I love applying my learnings and curiosity
              in coding, even surprising myself. I give my all to creating
              meaningful and useful web applications. I have a foundation in
              both frontend and backend development.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ lineHeight: 1.8, color: "text.secondary" }}
            >
              I focus my skills in modern web technologies and always try to
              learn and implement best practices in my work. If I have free
              time, I usually play Valorant or watch anime. Sometimes I also do
              nothing and just relax.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  pb: 1,
                  mb: 2,
                }}
              >
                Contact Information
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  alignItems: { xs: "flex-start", sm: "center" },
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    +63 921 532 3232
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email color="primary" fontSize="small" />
                  <Typography
                    variant="body2"
                    color="primary"
                    component="a"
                    href="mailto:your.email@example.com"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    jett.r.esteban@gmail.com
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Plaridel, Bulacan, Philippines, 3004
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 2,
                borderBottom: 1,
                borderColor: "divider",
                pb: 1,
              }}
            >
              Skills
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  icon={skill.icon}
                  label={skill.name}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    px: 1,
                    "& .MuiChip-icon": {
                      color: "primary.main",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
