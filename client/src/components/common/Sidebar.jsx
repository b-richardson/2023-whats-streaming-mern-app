import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { themeMode } = useSelector((state) => state.themeMode);
  const { user } = useSelector((state) => state.user);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">MENU</Typography>
        {menuConfigs.main.map((menuOption, index) => (
          <ListItemButton
            component={Link}
            key={index}
            onClick={() => toggleSidebar(false)}
//             Bug with item not being defined. Commenting out until able to trouble shoot
//             selected={location.pathname === item.path}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: "unset",
              "&.Mui-selected": {
                backgroundColor: "primary.main"
              }
            }}
            to={menuOption.path}
          >
            <ListItemIcon>{menuOption.icon}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography textTransform="uppercase">
              {menuOption.display}
            </Typography>} />
          </ListItemButton>
        ))}

        {user && (<>
          <Typography variant="h6" marginBottom="20px">PERSONAL</Typography>
          {menuConfigs.user.map((menuOption, index) => (
            <ListItemButton
              component={Link}
              key={index}
              onClick={() => toggleSidebar(false)}
//               Bug with item not being defined. Commenting out until able to trouble shoot
//               selected={location.pathname === item.path}
              sx={{
                borderRadius: "10px",
                marginY: 1,
                backgroundColor: "unset",
                "&.Mui-selected": {
                  backgroundColor: "primary.main"
                }
              }}
              to={menuOption.path}
            >
              <ListItemIcon>{menuOption.icon}</ListItemIcon>
              <ListItemText disableTypography primary={<Typography textTransform="uppercase">
                {menuOption.display}
              </Typography>} />
            </ListItemButton>
          ))}
        </>)}

        <Typography variant="h6" marginBottom="20px">THEME</Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText disableTypography primary={
            <Typography textTransform="uppercase">
              {themeMode === themeModes.dark ? "dark mode" : "light mode"}
            </Typography>
          } />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          widh: sidebarWidth,
          borderRight: "0px"
        }
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
