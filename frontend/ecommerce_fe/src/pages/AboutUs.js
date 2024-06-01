import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Nav from "../components/Nav";

const AboutUsPage = () => {
  return (
    <div className="App">
      <Nav />
      <Container>
        <Typography variant="h3" gutterBottom marginTop={30}>
          About Us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Our Story
                </Typography>
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris eget tellus nec arcu mattis accumsan nec sit amet
                  ligula. Nulla vehicula libero eu nunc malesuada, sit amet
                  viverra est tristique.
                </Typography>
                <Typography variant="body1" paragraph>
                  Fusce id nibh nec orci consequat auctor. In hac habitasse
                  platea dictumst. Sed vestibulum sapien nec justo dictum, id
                  dignissim lorem ultrices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris eget tellus nec arcu mattis accumsan nec sit amet
                  ligula. Nulla vehicula libero eu nunc malesuada, sit amet
                  viverra est tristique.
                </Typography>
                <Typography variant="body1" paragraph>
                  Fusce id nibh nec orci consequat auctor. In hac habitasse
                  platea dictumst. Sed vestibulum sapien nec justo dictum, id
                  dignissim lorem ultrices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUsPage;
