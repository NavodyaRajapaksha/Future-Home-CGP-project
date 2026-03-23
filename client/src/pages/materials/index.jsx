import {
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack
} from '@mui/material';

import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Materials() {
  const [rows, setRows] = useState([]);

useEffect(() => {
  API.get("/materials")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const handleDelete = (id) => {
  setRows(rows.filter((r) => r.material_id !== id));
};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <div>
          <Typography variant="h4">Materials</Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </div>

        <Button variant="contained">Add Material</Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell>Unit Type</TableCell>
              <TableCell>Total Used</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
{rows.map((m) => (
  <TableRow key={m.material_id} hover>

    <TableCell>{m.material_id}</TableCell>
    <TableCell>{m.name}</TableCell>
    <TableCell>{m.category}</TableCell>

    <TableCell>
      Rs. {m.unit_cost.toLocaleString()}
    </TableCell>

    <TableCell>{m.unit_type}</TableCell>
    <TableCell>{m.total_used}</TableCell>
    <TableCell>
  <Button 
    color="error" 
    size="small"
    onClick={() => handleDelete(r.material_id)}
  >
    Delete
  </Button>
</TableCell>

  </TableRow>
))}
</TableBody>
        </Table>
      </Paper>
    </>
  );
}
