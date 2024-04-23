import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    Grid,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import {useDispatch, useSelector} from "react-redux";
import {EditNoteTwoTone, RestoreFromTrashTwoTone} from "@mui/icons-material";
import axios from "axios";
import {getConfigs} from "./SettingSlice";
import PageTitle from "../../contants/PageTitle";
import {useRecoilValue} from "recoil";
import {profile} from "../../atoms/authAtoms";

function Roles() {
    const user = useRecoilValue(profile)
    const {configs} = useSelector((state) => state.configs)
    const [inputVal, setInputVal] = useState('')
    const dispatch = useDispatch()

    function handleClick(){
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/configs/${configs._id}`;
        const payload = {...configs, roles: [...configs.roles, inputVal]}
        axios.put(apiEndpoint, payload).then((res) => {
            dispatch(getConfigs(user.company_id))
            setInputVal("")
        }).catch((err) => console.log(err))
    }

    function handleDelete(item){
        const filteredRoles = configs.roles.filter((e) => e !== item)
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/configs/${configs._id}`;
        const payload = {...configs, roles: filteredRoles}
        axios.put(apiEndpoint, payload).then((res) => {
            dispatch(getConfigs(user.company_id))
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <PageTitle title={"Settings"} subtitle={"User Roles"}/>

            <MainCard sx={{width: "100%", maxWidth: "600px", marginBottom: "10px", padding: "10px"}}>
                <Typography sx={{fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px"}}>
                    Add Roles
                </Typography>
                <Grid style={{display:"flex", gap:"12px"}} direction={"row"}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={(e) => setInputVal(e.target.value)}
                        label="Roles"
                        value={inputVal}
                        sx={{
                            fontSize: "16px"
                        }}
                        In={{
                            style: { color: "#5559CE" },
                        }}
                    />
                    <Button
                        size="small"
                        sx={{
                            fontSize: "16px"
                        }}
                        variant="outlined"
                        color="primary"
                        onClick={handleClick}
                    >
                        Add
                    </Button>
                </Grid>
            </MainCard>
            <MainCard sx={{width: "100%", maxWidth: "600px", padding: "10px"}}>
                <Typography sx={{fontSize: "1.3rem", fontWeight: "600"}}>
                    Roles
                </Typography>
                <List >
                    {
                        configs?.roles && configs?.roles.length !== 0 && configs?.roles.map((e) => {
                            return(
                                <ListItem disablePadding>
                                    <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <Typography sx={{fontSize: "1.1rem"}}>{e}</Typography>
                                        <div>
                                            {/*<EditNoteTwoTone*/}
                                            {/*    sx={{*/}
                                            {/*      color: "#b0b2e8",*/}
                                            {/*      height: "35px",*/}
                                            {/*      lineHeight: "35px",*/}
                                            {/*      margin: "0 20px",*/}
                                            {/*      cursor: "pointer",*/}
                                            {/*      fontSize: "30px",*/}
                                            {/*    }}*/}
                                            {/*    onClick={() => {*/}
                                            {/*      handleEdit(e);*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                            <RestoreFromTrashTwoTone
                                                sx={{
                                                    color: "#5559CE",
                                                    height: "35px",
                                                    lineHeight: "35px",
                                                    margin: "0 20px",
                                                    cursor: "pointer",
                                                    fontSize: "30px",
                                                }}
                                                onClick={() => {
                                                    handleDelete(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </ListItem>
                            )
                        })
                    }

                </List>


            </MainCard>
        </>
    );
}

export default Roles;
