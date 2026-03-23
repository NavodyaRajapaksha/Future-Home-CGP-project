import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Chip,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Inquiries() {
 const [rows, setRows] = useState([]);
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState("");
 const [propertyId, setPropertyId] = useState("");

useEffect(() => {
  API.get("/inquiries")
    .then((res) => {
      setRows(res.data);
    })
    .catch((err) => console.log(err));
}, []);

  const statusChip = (status) => {
  if (!status) return <Chip label="N/A" size="small" variant="outlined" />;

  let color = "default";

  if (status === "new") ;
  else if (status === "in_progress") ;
  else if (status === "resolved") ;

  return <Chip size="small" label={status}  />;
};

const handleDelete = (id) => {
  API.delete(`/inquiries/${id}`)
    .then(() => {
      setRows(rows.filter(r => r.inquiry_id !== id));
    })
    .catch(err => console.log(err));
};

const updateStatus = (id, status) => {
  API.put(`/inquiries/${id}/status`, { status })
    .then(() => {
      setRows(rows.map(r =>
        r.inquiry_id === id ? { ...r, status } : r
      ));
    });
};

const handleSubmitInquiry = () => {
  API.post("/inquiries", {
    property_id: propertyId,
    client_id: 1, // change later from logged user
    message: message
  })
  .then(() => {
    setOpen(false);
    setMessage("");
    setPropertyId("");
    window.location.reload();
  })
  .catch(err => console.log(err));
};

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
  <Typography variant="h4">Inquiries</Typography>
  <Button variant="contained" onClick={() => setOpen(true)}>
  Submit Inquiry
</Button>
</Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.inquiry_id} hover>
                <TableCell>{r.inquiry_id}</TableCell>
                <TableCell>{r.property}</TableCell>
                <TableCell>{r.client}</TableCell>
                <TableCell>{r.message}</TableCell>
                <Select
  size="small"
  value={r.status}
  onChange={(e) => updateStatus(r.inquiry_id, e.target.value)}
>
  <MenuItem value="new">New</MenuItem>
  <MenuItem value="in_progress">In Progress</MenuItem>
  <MenuItem value="resolved">Resolved</MenuItem>
</Select>
                <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
  <Button
    color="error"
    size="small"
    onClick={() => handleDelete(r.inquiry_id)}
  >
    Delete
  </Button>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Submit Inquiry</DialogTitle>

  <DialogContent>
    <TextField
      label="Property ID"
      fullWidth
      margin="normal"
      value={propertyId}
      onChange={(e) => setPropertyId(e.target.value)}
    />

    <TextField
      label="Message"
      fullWidth
      margin="normal"
      multiline
      rows={3}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleSubmitInquiry}>
      Submit
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}
