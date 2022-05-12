import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TabButton from "src/components/TabButton";

interface TabProps {
  userId: number;
  currentActive: "posts" | "todos";
}

const TabSwitch: React.FC<TabProps> = ({ userId, currentActive }) => {
  const history = useHistory();

  const createPost = useCallback(
    () => history.push(`/users/${userId}/new_post?edit=false`),
    [history, userId]
  );

  const renderTabSwitch = useCallback(
    () => (
      <Grid container spacing={1}>
        <Grid item xs={4} md={3} lg={2}>
          <TabButton
            active={currentActive === "posts"}
            text="Posts"
            url={`/users/${userId}/posts`}
          />
        </Grid>

        <Grid item xs={4} md={3} lg={2}>
          <TabButton
            active={currentActive === "todos"}
            text="Todos"
            url={`/users/${userId}/todos`}
          />
        </Grid>

        {currentActive === "posts" && (
          <IconButton
            sx={{
              marginLeft: "auto",
            }}
            onClick={createPost}
          >
            <AddIcon sx={{ fontSize: 50, color: "primary.main" }} />
          </IconButton>
        )}
      </Grid>
    ),
    [createPost, currentActive, userId]
  );

  return renderTabSwitch();
};

export default TabSwitch;
