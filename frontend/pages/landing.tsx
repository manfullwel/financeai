import { Box, Button, Container, Typography, Paper, Grid } from '@mui/material';
import { Timeline, ShowChart, Psychology, Security } from '@mui/icons-material';
import Link from 'next/link';

export default function Landing() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            🚀 Welcome to FinanceAI
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Hey there! Ready to supercharge your financial analysis with AI? 
            We've got your back with some seriously cool machine learning magic! 
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/dashboard"
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              icon: <Timeline sx={{ fontSize: 40 }} />,
              title: "Smart Time Series Analysis",
              description: "Predict market trends like a pro! Our AI crunches the numbers while you focus on making smart decisions."
            },
            {
              icon: <ShowChart sx={{ fontSize: 40 }} />,
              title: "Real-time Predictions",
              description: "Stay ahead of the game with live market predictions and risk analysis. No more guesswork!"
            },
            {
              icon: <Psychology sx={{ fontSize: 40 }} />,
              title: "AI-Powered Insights",
              description: "Let our ML models do the heavy lifting. Get actionable insights without breaking a sweat."
            },
            {
              icon: <Security sx={{ fontSize: 40 }} />,
              title: "Secure & Reliable",
              description: "Your data's safety is our top priority. Bank-grade security meets cutting-edge AI."
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Level Up Your Financial Game? 🎯
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Join the future of financial analysis. It's like having a team of data scientists in your pocket!
          </Typography>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/dashboard"
            sx={{ mt: 2 }}
          >
            Explore Features
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
