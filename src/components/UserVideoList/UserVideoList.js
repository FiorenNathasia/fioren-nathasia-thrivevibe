import "./UserVideoList.scss";
import UserVideoCard from "../UserVideoCard/UserVideoCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

export default function UserVideoList({ videos }) {
  return (
    <>
      <div className="videolist">
        <Box
          sx={{
            border: "none",
            height: "500px",
            width: "100%",
            overflow: "auto",
            boxShadow: 3,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {videos.map((video) => (
              <ListItem>
                {" "}
                <UserVideoCard
                  key={video.id}
                  id={video.id}
                  url={video.url}
                  prompt={video.prompt}
                  sx={{ flexBasis: "calc(25% - 20px)", margin: "10px" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </>
  );
}
