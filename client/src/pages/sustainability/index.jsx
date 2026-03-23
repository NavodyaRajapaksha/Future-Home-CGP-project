import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Chip
} from '@mui/material';

import { useEffect, useState } from "react";
import API from "../../api/api";


export default function sustainability() {
  const [rows, setRows] = useState([]);

useEffect(() => {
  API.get("/sustainability")
    .then((res) => setRows(res.data))
    .catch((err) => console.log(err));
}, []);

const scoreChip = (score) => {
  let color = "default";

  if (score >= 80) color = "success";
  else if (score >= 60) color = "warning";
  else color = "error";

  return (
    <Chip
      size="small"
      label={score}
      color={color}
      variant="outlined"
    />
  );
};

  return (
    <>
      <Stack sx={{ mb: 2 }}>
        <Typography variant="h4">Sustainability</Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material ID</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Eco Score</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Carbon (kg/unit)</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.material_id} hover>
                <TableCell>{r.material_id}</TableCell>
                <TableCell>{r.material}</TableCell>
                <TableCell>{r.eco_score}</TableCell>
                <TableCell>{scoreChip(r.eco_score)}</TableCell>
                <TableCell>{r.carbon_kg_per_unit}</TableCell>
                <TableCell>{r.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
