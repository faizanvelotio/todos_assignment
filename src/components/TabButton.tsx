import { Button, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

interface TabButtonProps {
  active: boolean;
  text: string;
  url: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, text, url }) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    if (!active) {
      history.push(url);
    }
  }, [active, history, url]);

  const styles = useMemo(
    () =>
      active
        ? {
            bgcolor: "primary.main",
            color: "background.paper",
            "&:hover": {
              bgcolor: "primary.main",
              cursor: "not-allowed",
            },
          }
        : {
            color: "primary.main",
          },
    [active]
  );

  return (
    <Button
      variant="outlined"
      sx={{
        ...styles,
        fontWeight: "bold",
        borderRadius: 0,
        width: 1,
        height: 50,
      }}
      onClick={handleClick}
    >
      <Typography variant="buttonText">{text}</Typography>
    </Button>
  );
};

export default TabButton;
