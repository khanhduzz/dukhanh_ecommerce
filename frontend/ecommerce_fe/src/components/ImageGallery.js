import React, { useEffect, useState } from "react";
import { Grid, Box, Card, CardMedia, Typography } from "@mui/material";

const images = [
  `http://localhost:8080/api/images/0a20e6a0-cde2-4310-8de0-31eeed586163-starynight2.jpeg`,
  `http://localhost:8080/api/images/b7e98b4a-d947-40a3-8bfc-b4df3fff270c-cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMjA4YmF0Y2gxNS1leWUtMDEuanBn.webp`,
  `http://localhost:8080/api/images/32d35f9c-4505-4f82-aedf-d8e3910e4165-starynight.jpeg`,
];

const ImageGallery = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {}, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              objectPosition: "center",
              width: "40vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectedImage ? (
              <CardMedia
                component="img"
                height="500"
                // image={selectedImage}
                src={`http://localhost:8080/api/images/${selectedImage}`}
                alt="Selected Image"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Grid container spacing={2}>
                {image && image.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="500"
                    // image={selectedImage}
                    src={`http://localhost:8080/api/images/${image[0]}`}
                    alt="Selected Image"
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    No images available
                  </Typography>
                )}
              </Grid>
            )}
          </Card>
        </Grid>
        {/* {images.map((img, index) => (
          <Grid item xs={3} key={index}>
            <Card onClick={() => setSelectedImage(img)}>
              <CardMedia
                component="img"
                height="100"
                width="100"
                image={img}
                alt={`Image ${index}`}
                sx={{
                  cursor: "pointer",
                  border: selectedImage === img ? "2px solid blue" : "none",
                }}
              />
            </Card>
          </Grid>
        ))} */}
        {image && image.length > 0 ? (
          image.map((img, index) => (
            <Grid item xs={3} key={index}>
              <Card onClick={() => setSelectedImage(img)}>
                <CardMedia
                  component="img"
                  height="100"
                  width="100"
                  src={`http://localhost:8080/api/images/${img}`}
                  alt={`Image ${index}`}
                  sx={{
                    cursor: "pointer",
                    border: selectedImage === img ? "2px solid blue" : "none",
                  }}
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            No images available
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
