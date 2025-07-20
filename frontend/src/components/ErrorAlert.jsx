import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ErrorAlert({ message }) {
  return (
    <Stack sx={{ width: "80%", margin: "32px 0" }} spacing={2}>
      <Alert severity="error">{message}</Alert>
    </Stack>
  );
}
