import React from "react";
import "./CommentList.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

function CommentList({ comments }) {
  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  if (!comments.length) {
    return <div className="commentlist__error">No comments to display</div>;
  }
  return (
    <div className="commentlist">
      <h2 className="commentlist__title">Comments</h2>
      <Box
        sx={{
          border: "none",
          width: "23.5em",
          height: "300px",
          overflow: "scroll",
          marginLeft: "4rem",
          boxShadow: 3,
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={comment.comments}
                secondary={formatTimestamp(comment.created_at)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default CommentList;
