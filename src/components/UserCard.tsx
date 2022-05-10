import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Paper,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionType } from "src/types/ActionTypes";
import { UserContentContext } from "src/context/UserContentContext";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const history = useHistory();
  const { dispatch } = useContext(UserContentContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUserClick = useCallback(
    (user: User) => {
      history.push(`users/${user.id}/posts`);
      dispatch({ type: ActionType.SET_CURRENT_USER, payload: user });
    },
    [history, dispatch]
  );

  const handleSettingsClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleSettingsClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const renderUserCard = useCallback(
    () => (
      <Paper
        elevation={4}
        sx={{
          padding: "1rem 2.5%",
          position: "relative",
        }}
      >
        <IconButton
          aria-label="settings"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleSettingsClick}
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "fit-content",
            cursor: "pointer",
            margin: "0 auto",
          }}
          onClick={() => handleUserClick(user)}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              fontWeight: "bold",
              width: "80px",
              height: "80px",
              fontSize: "2rem",
              marginBottom: "0.5rem",
            }}
            children={`${user.name.split(" ")[0][0]}${
              user.name.split(" ")[1][0]
            }`}
          />
          <Typography variant="body1">{user.name}</Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#A8A8A8",
            }}
          >
            {user.username}
          </Typography>
        </Box>
      </Paper>
    ),
    [open, user, handleSettingsClick, handleUserClick]
  );

  const renderMenu = useCallback(
    () => (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleSettingsClose}
        onClick={handleSettingsClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <div
            style={{
              fontSize: "1rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.05rem",
              width: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Edit Profile
          </div>
        </MenuItem>
      </Menu>
    ),
    [open, anchorEl, handleSettingsClose]
  );
  return (
    <>
      {renderUserCard()}
      {renderMenu()}
    </>
  );
};

export default UserCard;
