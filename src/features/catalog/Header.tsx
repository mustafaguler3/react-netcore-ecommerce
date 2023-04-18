import { AppBar, Toolbar, Typography, Link, Switch } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange:() => void;
}

export default function Header({darkMode,handleThemeChange}:Props) {
  return (
    <>
      <AppBar position="static" sx={{mb:5}}>
        <Toolbar>
          <Typography variant="h6">
            RE_STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Toolbar>
      </AppBar>
    </>
  );
}
