import { Container, Paper, Typography, Grid, Card, CardContent, List, ListItem, ListItemText, Avatar } from "@mui/material";

const skills = ["Go", "C#/.NET", "AWS", "Azure", "SQL", "Docker", "PostgreSQL", "Redis", "Terraform"];
const experiences = [
  { 
    company: "Binagora - Edgio", 
    role: ".NET & Go Developer", 
    period: "June 2022 - Present", 
    details: [
      "Developed and maintained APIs and background jobs in Go",
      "Maintained microservices and a legacy monolithic application",
      "Worked with Docker, Redis, SQL, and cloud-based services"
    ]
  },
  { 
    company: "Binagora - Edgecast", 
    role: ".NET Developer", 
    period: "Sep 2021 - June 2022", 
    details: [
      "Maintained web APIs and developed microservices",
      "Extracted and modernized monolithic features",
      "Built IaaS infrastructure using Terraform on AWS"
    ]
  },
  { 
    company: "Binagora - Verizon Media", 
    role: ".NET Developer", 
    period: "Jan 2019 - Sep 2021", 
    details: [
      "Developed and maintained web APIs",
      "Designed and developed microservices",
      "Implemented automation and performance testing",
      "Worked with Terraform, AWS, and load testing"
    ]
  },
  { 
    company: "Binagora - VDMS", 
    role: ".NET Developer", 
    period: "Jan 2017 - Jan 2019", 
    details: [
      "Developed and maintained web APIs and background jobs",
      "Worked on multiple features in web APIs and legacy applications",
      "Designed and developed an automation project for E2E workflow testing"
    ]
  },
  { 
    company: "Hexacta - Globus", 
    role: ".NET Developer", 
    period: "Nov 2015 - Jan 2017", 
    details: [
      "Developed and maintained core services and public website",
      "Worked on back-office web and desktop applications",
      "Integrated services with Redis and Oracle DB"
    ]
  },
  { 
    company: "Assertia Solutions - Crackle", 
    role: ".NET Developer", 
    period: "Jan 2015 - Nov 2015", 
    details: [
      "Developed and maintained a Web API",
      "Built automation infrastructure for API testing",
      "Analyzed API performance and developed load testing",
      "Developed Azure Worker Role for background job processing"
    ]
  },
  { 
    company: "Globant - Wonga", 
    role: ".NET Developer", 
    period: "Feb 2014 - Jan 2015", 
    details: [
      "Developed web application for accounting and data management",
      "Integrated the application with private APIs",
      "Developed an end-to-end (E2E) test automation project"
    ]
  },
  { 
    company: "Huddle Group - Internal Tasks", 
    role: ".NET Developer", 
    period: "Dec 2013 - Feb 2014", 
    details: [
      "Created a Silverlight training course for developers",
      "Developed SharePoint web parts"
    ]
  },
  { 
    company: "Huddle Group - PoC WAMS & Transcoding", 
    role: ".NET Developer", 
    period: "Oct 2013 - Dec 2013", 
    details: [
      "Developed proof of concept for Windows Azure Media Services",
      "Built a video transcoding and streaming system",
      "Automated video transcoding analysis"
    ]
  },
  { 
    company: "Huddle Group - Profertil ProBal", 
    role: ".NET Developer", 
    period: "Jan 2013 - Oct 2013", 
    details: [
      "Developed a truck and train weighing system",
      "Built a desktop application for weighing station control",
      "Developed drivers in C# for weighing scale communication",
      "Created a web-based management system"
    ]
  },
  { 
    company: "Huddle Group - CAA Tours Management", 
    role: ".NET Developer", 
    period: "Jul 2012 - Jan 2013", 
    details: [
      "Developed a system for managing tours and shows",
      "Integrated maps using Bing Maps"
    ]
  },
  { 
    company: "Comper Argentina", 
    role: "Java Developer", 
    period: "Sep 2009 - Jul 2012", 
    details: [
      "Developed and maintained a web application for virtual sales",
      "Integrated web services with telecom providers",
      "Developed mobile applications for wholesalers and salesmen"
    ]
  }
];

export default function App() {
  return (
    <Container maxWidth="md" style={{ paddingTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Avatar 
          src="/profile.png" 
          alt="Emanuel Miranda"
          sx={{ width: 150, height: 150, margin: "auto", boxShadow: 3 }}
        />
        <Typography variant="h5" style={{ marginTop: "10px" }}>
          Emanuel Miranda
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Software Architect
        </Typography>
      </Paper>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📞 Contact</Typography>
              <Typography variant="body2">Email: emanuelmiranda83@gmail.com</Typography>
              <Typography variant="body2">GitHub: github.com/emanuelmiranda83</Typography>
              <Typography variant="body2">LinkedIn: linkedin.com/in/emiranda</Typography>
            </CardContent>
          </Card>

          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h6">🔧 Skills</Typography>
              <List>
                {skills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">👨‍💻 Work Experience</Typography>
              {experiences.map((exp, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <Typography variant="subtitle1"><strong>{exp.company}</strong> ({exp.period})</Typography>
                  <Typography variant="body2" color="textSecondary">{exp.role}</Typography>
                  <List dense>
                    {exp.details.map((detail, i) => (
                      <ListItem key={i}>
                        <ListItemText primary={detail} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
