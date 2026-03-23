import {
  Typography,
  Button,
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

export default function Tasks() {
  const [rows, setRows] = useState([]);

useEffect(() => {
  API.get("/tasks")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const handleDelete = (id) => {
  setRows(rows.filter((r) => r.task_id !== id));
};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <div>
          <Typography variant="h4">Tasks</Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </div>

        <Button variant="contained">Add Task</Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
{rows.map((t) => (
  <TableRow key={t.task_id} hover>
    <TableCell>{t.task_id}</TableCell>
    <TableCell>{t.project_name}</TableCell>
    <TableCell>{t.assigned_user}</TableCell>
    <TableCell>{t.title}</TableCell>

    <TableCell>
      <Chip size="small" label={t.priority} />
    </TableCell>

    <TableCell>
      <Chip size="small" label={t.status} />
    </TableCell>

    <TableCell>
      {new Date(t.start_date).toLocaleDateString()}
    </TableCell>

    <TableCell>
      {new Date(t.due_date).toLocaleDateString()}
    </TableCell>
    <TableCell>
  <Button 
    color="error" 
    size="small"
    onClick={() => handleDelete(r.task_id)}
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
