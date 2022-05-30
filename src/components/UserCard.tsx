import React, { useState, useCallback, useContext, useMemo } from "react";
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
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleUserClick = useCallback(
    (user: User) => {
      dispatch({ type: ActionType.SET_CURRENT_USER, payload: user });
      history.push(`users/${user.id}/posts`);
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

  const editUser = useCallback(() => {
    setAnchorEl(null);
    dispatch({ type: ActionType.SET_CURRENT_USER, payload: user });
    history.push(`users/${user.id}`);
  }, [history, dispatch, user]);

  const renderUserInfo = useCallback(
    () => (
      <Box
        mx={"auto"}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "fit-content",
          cursor: "pointer",
        }}
        onClick={() => handleUserClick(user)}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            fontWeight: "bold",
            width: 80,
            height: 80,
            fontSize: "2rem",
            mb: 1,
          }}
          children={`${user.name.split(" ")[0][0].toUpperCase()}${user.name
            .split(" ")[1][0]
            .toUpperCase()}`}
        />
        <Typography variant="body1">{user.name}</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "fontLightGray",
          }}
        >
          {user.username}
        </Typography>
      </Box>
    ),
    [user, handleUserClick]
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
            filter: "drop-shadow(0px 2px 8px #00000051)",
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
          <Box
            sx={{
              fontSize: "1rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.05rem",
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={editUser}
          >
            Edit Profile
          </Box>
        </MenuItem>
      </Menu>
    ),
    [open, anchorEl, editUser, handleSettingsClose]
  );

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          px: "2.5%",
          py: 2,
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
            right: 10,
            top: 10,
          }}
        >
          <MoreVertIcon />
        </IconButton>
        {renderUserInfo()}
      </Paper>

      {renderMenu()}
    </>
  );
};

export default UserCard;
