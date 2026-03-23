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



export default function Properties() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

const [formData, setFormData] = useState({
  title: "",
  location: "",
  price_range: "",
  size_sqft: "",
  bedrooms: "",
  bathrooms: "",
  status: "available"
});

useEffect(() => {
  API.get("/properties")
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
    await API.post("/properties", formData);

    const res = await API.get("/properties");
    setRows(res.data);

    handleClose();

  } catch (err) {
    console.log(err);
  }
};

const handleDelete = (id) => {
  setRows(rows.filter((r) => r.property_id !== id));
};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <div>
          <Typography variant="h4">Properties</Typography>
          <Typography variant="body2" color="text.secondary"> </Typography>
        </div>

        <Button variant="contained" onClick={handleOpen}>
          Add Property
        </Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price Range</TableCell>
              <TableCell>Size (sqft)</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.property_id} hover>
                <TableCell>{r.property_id}</TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.location}</TableCell>
                <TableCell>{r.price_range}</TableCell>
                <TableCell>{r.size_sqft}</TableCell>
                <TableCell>{r.bedrooms}</TableCell>
                <TableCell>{r.bathrooms}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={r.status}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {new Date(r.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
  <Button 
    color="error" 
    size="small"
    onClick={() => handleDelete(r.property_id)}
  >
    Delete
  </Button>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Add Property</DialogTitle>

  <DialogContent>

    <TextField
      label="Title"
      name="title"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Location"
      name="location"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Price Range"
      name="price_range"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Size (sqft)"
      name="size_sqft"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Bedrooms"
      name="bedrooms"
      fullWidth
      margin="dense"
      onChange={handleChange}
    />

    <TextField
      label="Bathrooms"
      name="bathrooms"
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
