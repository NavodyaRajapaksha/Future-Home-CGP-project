import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const inquiries = [
  { id: 1, name: 'David Architect', subject: 'Technical details Request', status: 'New', date: '3/20/2026' },
  { id: 2, name: 'Client Silva', subject: 'Schedule visit', status: 'New', date: '3/20/2026' },
  { id: 3, name: 'Client Silva', subject: 'Interested in villa', status: 'Replied', date: '3/20/2026' },
  { id: 4, name: 'System Admin', subject: 'Price Adjusment', status: 'New', date: '3/22/2026' }
];

function statusChip(status) {
  switch (status) {
    case 'New':
      return <Chip label="New" size="small" color="primary" />;
    case 'In Progress':
      return <Chip label="In Progress" size="small" color="warning" />;
    case 'Replied':
      return <Chip label="Replied" size="small" color="success" />;
    default:
      return <Chip label={status} size="small" />;
  }
}

export default function InquiriesTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="inquiries table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>NAME</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>SUBJECT</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              DATE
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {inquiries.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>
                <Typography variant="subtitle2">{row.name}</Typography>
              </TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{statusChip(row.status)}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
