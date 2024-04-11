import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

// material-ui
import {useTheme} from "@mui/material/styles";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Switch,
    Typography,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";
import { IconLogout, IconSettings, IconUser,IconShare } from "@tabler/icons";
import { useRecoilValue } from "recoil";
import { profile } from "../../../../atoms/authAtoms";
import { useLogout } from "../../../../hooks/useLogout";

// import User1 from 'assets/images/users/user-round.svg';

// assets
import {IconLogout, IconSettings, IconUser} from "@tabler/icons";
// import axios from 'axios';
import {useRecoilValue} from "recoil";
import {profile} from "../../../../atoms/authAtoms";
import {useLogout} from "../../../../hooks/useLogout";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const {mutate} = useLogout();

    const [sdm, setSdm] = useState(true);
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
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

    // const getGreeting = () => {
    //   const currentHour = new Date().getHours();
    //
    //   if (currentHour >= 5 && currentHour < 12) {
    //     return 'Good Morning,';
    //   } else if (currentHour >= 12 && currentHour < 17) {
    //     return 'Good Afternoon,';
    //   } else if (currentHour >= 17 && currentHour < 21) {
    //     return 'Good Evening,';
    //   } else {
    //     return 'Good Night,';
    //   }
    // };
    // const greeting = getGreeting();
    const user = useRecoilValue(profile);


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
                            width: "38px", height: "38px"
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
                        <ListItemButton>
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                              >
                                Account Settings
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
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
                              <Typography
                                variant="body2"
                              >
                                Invite
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 2}
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
                            <Typography
                                style={{fontSize: "15px", fontWeight: 600}}>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography
                                style={{fontSize: "12px", fontWeight: 400}}
                                mt={0.1}>
                                {user.role}
                            </Typography>
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
                {({TransitionProps}) => (
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
                                        <Box sx={{p: 2}}>
                                            <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    my: 2,
                                                }}
                                            >
                                                <CardContent>
                                                    <Grid container spacing={3}
                                                          direction="column">
                                                        <Grid item>
                                                            <Grid
                                                                item
                                                                container
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                            >
                                                                <Grid item>
                                                                    <Typography
                                                                        variant="subtitle1">
                                                                        Start
                                                                        DND Mode
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        color="primary"
                                                                        checked={sdm}
                                                                        onChange={(e) => setSdm(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid
                                                                item
                                                                container
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                            >
                                                                <Grid item>
                                                                    <Typography
                                                                        variant="subtitle1">
                                                                        Allow
                                                                        Notifications
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        onChange={(e) =>
                                                                            setNotification(e.target.checked)
                                                                        }
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <Divider/>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 350,
                                                    minWidth: 300,
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
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={selectedIndex === 0}
                                                    onClick={(event) =>
                                                        handleListItemClick(event, 0, "/settings")
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings
                                                            stroke={1.5}
                                                            size="1.3rem"/>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="body2"
                                                            >
                                                                Account Settings
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>

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
                                                        <IconUser stroke={1.5}
                                                                  size="1.3rem"/>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid
                                                                container
                                                                spacing={1}
                                                                justifyContent="space-between"
                                                            >
                                                                <Grid item>
                                                                    <Typography
                                                                        variant="body2">
                                                                        My
                                                                        Profile
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={selectedIndex === 4}
                                                    onClick={mutate}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5}
                                                                    size="1.3rem"/>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="body2">Logout</Typography>
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
