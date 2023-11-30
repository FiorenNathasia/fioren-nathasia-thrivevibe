import "./UserVideoList.scss";
import UserVideoCard from "../UserVideoCard/UserVideoCard";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

export default function UserVideoList({ videos }) {
  return (
    <>
      <div className="videolist">
        <div className="videolist__container">
          <Grid
            container
            spacing={4}
            sx={{
              border: "none",
              height: "600px",
              width: "1000",
              overflow: "auto",
              boxShadow: 3,
              borderRadius: "10px",
              marginTop: "0.5rem",
            }}
          >
            {videos.map((video) => (
              <Grid
                item
                key={video.id}
                xs={1}
                sm={2}
                md={3}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  typography: "none",
                }}
              >
                <UserVideoCard
                  id={video.id}
                  url={video.url}
                  prompt={video.prompt}
                  sx={{ flexBasis: "100%", margin: "10px" }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
