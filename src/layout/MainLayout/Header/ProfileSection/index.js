import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";
import { IconLogout, IconSettings, IconUser, IconShare } from "@tabler/icons";
import { useRecoilValue } from "recoil";
import { profile } from "../../../../atoms/authAtoms";
import { useLogout } from "../../../../hooks/useLogout";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const { mutate } = useLogout();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(profile)

  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "52px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          color: "black",
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: "#5559CE !important",
            background: "#5559CE !important",
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={`${user.avatar_url}`}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
              width: "38px",
              height: "38px",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <Box>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <List>
                <Typography style={{ fontSize: "15px", fontWeight: 600 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  style={{ fontSize: "12px", fontWeight: 400 }}
                  mt={0.1}
                >
                  {user.role}
                </Typography>
              </List>
            </div>
          </Box>
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <PerfectScrollbar
                    style={{
                      height: "100%",
                      maxHeight: "calc(100vh - 250px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box >
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 240,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                          {
                              user?.role === "Admin" && <ListItemButton
                                  sx={{
                                      borderRadius: `${customization.borderRadius}px`,
                                  }}
                                  selected={selectedIndex === 0}
                                  onClick={(event) =>
                                      handleListItemClick(event, 0, "/settings")
                                  }
                              >
                                  <ListItemIcon>
                                      <IconSettings stroke={1.5} size="1.3rem" />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={
                                          <Typography variant="body2">
                                              Account Settings
                                          </Typography>
                                      }
                                  />
                              </ListItemButton>
                          }

                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, "/my-profile")
                          }
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    My Profile
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                          {user?.role === "Admin" && <ListItemButton
                              sx={{
                                  borderRadius: `${customization.borderRadius}px`,
                              }}
                              selected={selectedIndex === 1}
                              onClick={(event) =>
                                  handleListItemClick(event, 0, "/invite")
                              }
                          >
                              <ListItemIcon>
                                  <IconShare stroke={1.5} size="1.3rem" />
                              </ListItemIcon>
                              <ListItemText
                                  primary={
                                      <Typography variant="body2">Invite</Typography>
                                  }
                              />
                          </ListItemButton>}
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          onClick={mutate}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
