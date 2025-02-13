import { useEffect, useState } from "react";
import { 
  Container, Paper, Typography, Grid, Card, CardContent, Avatar, IconButton, Link, Box, Chip, Accordion, AccordionSummary, AccordionDetails, Button 
} from "@mui/material";
import { Email, GitHub, LinkedIn, Square, ExpandMore, Print } from "@mui/icons-material";
import "./print.css";

// Define TypeScript interfaces
interface Education {
  institution: string;
  period: string;
  degree: string;
}

interface Contact {
  email: string;
  github: string;
  linkedin: string;
}

interface Skill {
  name: string;
  rating?: number;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  details: string[];
  techStack: string[];
}

interface PersonalExperience {
  title: string;
  role: string;
  period: string;
  details: string[];
  techStack: string[];
}

interface CVData {
  name: string;
  title: string;
  avatar: string;
  contact: Contact;
  summary: string;
  techSkills: Skill[];
  secondarySkills : string[];
  humanSkills: string[];
  languages: Skill[];
  experiences: Experience[];
  personalExperiences: PersonalExperience[];
  education: Education[];
  beliefs: string[];
  hobbies: string[];
}

const handlePrint = () => {
  // Add a special class to force visibility in print mode
  document.body.classList.add("print-mode");

  // Expand all accordion sections and force visibility
  const accordions = document.querySelectorAll(".MuiAccordion-root");
  accordions.forEach((accordion) => {
    const details = accordion.querySelector(".MuiCollapse-root");
    const content = accordion.querySelector(".MuiAccordionDetails-root");

    if (details) {
      (details as HTMLElement).style.height = "auto";
      (details as HTMLElement).style.overflow = "visible";
      (details as HTMLElement).style.display = "block"; // Ensure visibility
    }

    if (content) {
      (content as HTMLElement).style.display = "block"; // Force rendering
    }
  });

  // Wait a moment to allow UI to update, then trigger print
  setTimeout(() => {
    window.print();

    // Remove the special class and restore original state after printing
    setTimeout(() => {
      document.body.classList.remove("print-mode");
      accordions.forEach((accordion) => {
        const details = accordion.querySelector(".MuiCollapse-root");
        const content = accordion.querySelector(".MuiAccordionDetails-root");

        if (details) {
          (details as HTMLElement).style.height = "";
          (details as HTMLElement).style.overflow = "";
          (details as HTMLElement).style.display = "";
        }

        if (content) {
          (content as HTMLElement).style.display = "";
        }
      });
    }, 500);
  }, 500);
};

// Function to render skill rating as squares
const renderSkillRating = (rating: number) => {
  const totalSquares = 5;
  return (
    <Box display="flex" alignItems="center">
      {[...Array(totalSquares)].map((_, index) => (
        <Square key={index} sx={{ color: index < rating ? "#0D47A1" : "#B0BEC5", fontSize: 16, mr: 0.5 }} />
      ))}
    </Box>
  );
};

export default function App() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  
  useEffect(() => {
    fetch("/cvData.json")
      .then((response) => response.json())
      .then((data: CVData) => setCvData(data))
      .catch((error) => console.error("Error loading CV data:", error));
  }, []);

  if (!cvData) {
    return (
      <Container maxWidth="md" sx={{ pt: 4, textAlign: "center" }}>
        <Typography variant="h5">Loading CV Data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4, fontFamily: "'Roboto', sans-serif" }}>
      {/* Profile & Contact Section */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "#FAFAFA", borderLeft: "5px solid #0D47A1" }}>
        <Box 
          className="print-header"
          sx={{ 
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, /* Stack on mobile, row on desktop */
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", md: "right" },
            width: "100%"
          }}
        >
          
          {/* Profile Picture - Left */}
          <Box className="profile-picture" sx={{ flex: "0 0 120px", textAlign: "center", mb: { xs: 2, md: 0 } }}>
            <Avatar 
              src={cvData.avatar} 
              alt={cvData.name}
              sx={{ width: 120, height: 120, boxShadow: 3 }}
            />
          </Box>

          {/* Name & Contact - Right on Desktop, Centered on Mobile */}
          <Box className="profile-info" sx={{ flexGrow: 1, paddingLeft: { md: 3 } }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
              {cvData.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontStyle: "italic", mb: 1 }}>
              {cvData.title}
            </Typography>

            {/* Contact Icons - Inline with Name on Desktop, Centered on Mobile */}
            <Box className="print-hide" sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-end" } }}>
              <IconButton component={Link} href={`mailto:${cvData.contact.email}`} target="_blank" rel="noopener">
                <Email sx={{ fontSize: 28, color: "#0D47A1" }} />
              </IconButton>
              <IconButton component={Link} href={cvData.contact.github} target="_blank" rel="noopener">
                <GitHub sx={{ fontSize: 28, color: "#0D47A1" }} />
              </IconButton>
              <IconButton component={Link} href={cvData.contact.linkedin} target="_blank" rel="noopener">
                <LinkedIn sx={{ fontSize: 28, color: "#0D47A1" }} />
              </IconButton>
            </Box>
          </Box>

        </Box>
      </Paper>


      {/* Summary Section (Fixed Card) */}
      <Card sx={{ mt: 3, borderRadius: 2, backgroundColor: "#FFFFFF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)" }}>
        <CardContent>
          <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.6 }}>
            {cvData.summary}
          </Typography>
        </CardContent>
      </Card>

      {/* Skills Section - Collapsible */}
      <Accordion sx={{ mt: 3, borderRadius: 2, backgroundColor: "#F9F9F9" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>💡 SKILLS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" className="print-section-title" sx={{ display: { xs: "none", print: "block" } }}>
            SKILLS
          </Typography>
          <Grid container spacing={3} className="skills-container">
            {/* Tech Skills */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>🛠 TECH</Typography>
              {cvData.techSkills.map((skill, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2">{skill.name}</Typography>
                  {renderSkillRating(skill.rating ?? 1)}
                </Box>
              ))}
            </Grid>

            {/* Human Skills */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>🤝 HUMAN</Typography>
              {cvData.humanSkills.map((skill, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2">{skill}</Typography>
                </Box>
              ))}
            </Grid>

            {/* Languages */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>🌍 LANGUAGES</Typography>
              {cvData.languages.map((language, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2">{language.name}</Typography>
                  {renderSkillRating(language.rating ?? 1)}
                </Box>
              ))}
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: "#F9F9F9", borderRadius: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
              {cvData.secondarySkills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" sx={{ fontWeight: "bold", color: "#0D47A1", borderColor: "#0D47A1" }} />
              ))}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Work Experience Section - Collapsible */}
      <Box className="print-mode page-break-work">
        <Accordion sx={{ mt: 3, borderRadius: 2, backgroundColor: "#F9F9F9" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>👨‍💻 WORK EXPERIENCE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" className="print-section-title" sx={{ display: { xs: "none", print: "block" } }}>
                WORK EXPERIENCE
            </Typography>
            {cvData.experiences.map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                  {exp.company}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#424242" }}>
                  {exp.role} • {exp.period}
                </Typography>

                {/* Modern List Style - No Bullets */}
                <Box sx={{ mt: 1 }}>
                  {exp.details.map((detail, i) => (
                    <Typography key={i} variant="body2" sx={{ color: "#555", pl: 1, mb: 0.5 }}>
                      — {detail}
                    </Typography>
                  ))}
                </Box>

                {/* Tech Stack */}
                <Box className="print-hide" sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {exp.techStack.map((tech, i) => (
                    <Chip key={i} label={tech} variant="outlined" sx={{ fontWeight: "bold", color: "#0D47A1", borderColor: "#0D47A1" }} />
                  ))}
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
      
      {/* Personal Experience Section - Collapsible */}
      <Box className="print-mode page-break-personal">
        <Accordion sx={{ mt: 3, borderRadius: 2, backgroundColor: "#F9F9F9" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>🌟 PERSONAL EXPERIENCE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" className="print-section-title" sx={{ display: { xs: "none", print: "block" } }}>
                  PERSONAL EXPERIENCE
            </Typography>
            {cvData.personalExperiences.map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                  {exp.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#424242" }}>
                  {exp.role} • {exp.period}
                </Typography>

                {/* Modern List Style - No Bullets */}
                {exp.details.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {exp.details.map((detail, i) => (
                      <Typography key={i} variant="body2" sx={{ color: "#555", pl: 1, mb: 0.5 }}>
                        — {detail}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Tech Stack */}
                <Box className="print-hide" sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {exp.techStack.map((tech, i) => (
                    <Chip key={i} label={tech} variant="outlined" sx={{ fontWeight: "bold", color: "#0D47A1", borderColor: "#0D47A1" }} />
                  ))}
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Education Section - Collapsible */}
      <Accordion sx={{ mt: 3, borderRadius: 2, backgroundColor: "#F9F9F9" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>🎓 EDUCATION</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" className="print-section-title" sx={{ display: { xs: "none", print: "block" } }}>
                EDUCATION
          </Typography>
          {cvData.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                {edu.institution}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#424242" }}>
                {edu.degree}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {edu.period}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Beliefs Section - Collapsible */}
      <Accordion sx={{ mt: 3, borderRadius: 2, backgroundColor: "#F9F9F9" }} className="print-hide">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>💡 BELIEFS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {cvData.beliefs.map((belief, index) => (
            <Typography key={index} variant="body2" sx={{ mb: 1, fontStyle: "italic", color: "#555" }}>
              “{belief}”
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Hobbies Section - Collapsible */}
      <Accordion sx={{ mt: 3, borderRadius: 2, backgroundColor: "#F9F9F9" }} className="print-hide">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>🎯 HOBBIES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {cvData.hobbies.map((hobby, index) => (
            <Typography key={index} variant="body2" sx={{ mb: 1, color: "#555" }}>
              — {hobby}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Print as PDF Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Print />}
          onClick={handlePrint}
          sx={{ backgroundColor: "#0D47A1", fontWeight: "bold", textTransform: "none" }}
        >
          Print as PDF
        </Button>
      </Box>
    </Container>
  );
}
