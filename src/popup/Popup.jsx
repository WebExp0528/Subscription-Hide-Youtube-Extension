import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Typography, Grid, Container } from "@material-ui/core";
import { spacing, borders } from "@material-ui/system";
import { styled } from "@material-ui/core/styles";

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
                console.log("~~~~ get status", result);
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
                console.log("~~~~ chagned status", newStatus);
                setStatus(newStatus);
                setLoading(false);
            });
        }
    };

    return (
        <Container style={{ minWidth: "360px" }}>
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
