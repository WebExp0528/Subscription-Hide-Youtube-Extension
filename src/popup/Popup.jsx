import React from "react";
import { Switch, Grid, Container } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { styled } from "@material-ui/core/styles";
import ext from "utils/ext";
import { MSG_TYPE } from "utils/sendMessages";

import storage from "utils/storage";

const SpacedGrid = styled(Grid)(spacing);

const defaultStatus = false;
const statusKey = "simpletube_status";

export const Popup = () => {
    const [status, setStatus] = React.useState(defaultStatus);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!isLoading) {
            setLoading(true);
            storage.get([statusKey], (result) => {
                setLoading(false);
                if (result === undefined) {
                    return;
                }
                setStatus(result[statusKey]);
            });
        }
    }, []);

    const handleChange = (event) => {
        if (!isLoading) {
            setLoading(true);
            const newStatus = event.target.checked;
            storage.set({ [statusKey]: newStatus }, () => {
                setStatus(newStatus);
                setLoading(false);
            });

            ext.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    let tabId = tabs[0].id;
                    ext.tabs.sendMessage(
                        tabId,
                        { type: MSG_TYPE.FORCE_RELOAD, data: undefined },
                        (response) => {
                            console.log("~~~~ reloaded");
                        }
                    );
                }
            );
        }
    };

    return (
        <Container style={{ minWidth: "300px" }}>
            <SpacedGrid p={3}>
                <Grid
                    component="label"
                    container
                    alignItems="center"
                    justify="center"
                    spacing={1}
                    direction="row"
                >
                    <Grid item>Off</Grid>
                    <Grid item>
                        <Switch
                            checked={status}
                            onChange={handleChange}
                            inputProps={{
                                "aria-label": "secondary checkbox",
                            }}
                        />
                    </Grid>
                    <Grid item>On</Grid>
                </Grid>
            </SpacedGrid>
        </Container>
    );
};

export default Popup;
