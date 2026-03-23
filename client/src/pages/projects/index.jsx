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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';

import { useEffect, useState } from "react";
import API from "../../api/api";


export default function Projects() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
  project_name: "",
  property_id: "",
  contractor_id: "",
  start_date: "",
  target_end_date: "",
  status: "available"
});

useEffect(() => {
  API.get("/projects")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async () => {
  try {
    await API.post("/projects", formData);

    const res = await API.get("/projects");
    setRows(res.data);

    handleClose();

  } catch (err) {
    console.log(err);
  }
};

const handleDelete = (id) => {
  setRows(rows.filter((r) => r.project_id !== id));
};


  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <div>
          <Typography variant="h4">Projects</Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </div>

        <Button variant="contained" onClick={handleOpen}>
          Add Project
        </Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Property ID</TableCell>
              <TableCell>Contractor ID</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Target End</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.project_id} hover>
                <TableCell>{r.project_id}</TableCell>
                <TableCell>{r.project_name}</TableCell>
                <TableCell>{r.property_id}</TableCell>
                <TableCell>{r.contractor_id}</TableCell>
                <TableCell>{new Date(r.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(r.target_end_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip size="small" label={r.status} variant="outlined" />
                </TableCell>
                <TableCell>
                  {new Date(r.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
  <Button 
    color="error" 
    size="small"
    onClick={() => handleDelete(r.project_id)}
  >
    Delete
  </Button>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Add Project</DialogTitle>

  <DialogContent>

    <TextField
      label="Project Name"
      name="project_name"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Property ID"
      name="propert_id"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Contractor ID"
      name="contractor_id"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Start Date"
      name="start_date"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Target End"
      name="target_end_date"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSubmit} variant="contained">
      Save
    </Button>
  </DialogActions>
</Dialog>
      </Paper>
    </>
  );
}
