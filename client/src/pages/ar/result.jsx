import {
  Typography,
  Paper,
  Stack,
  Button
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

export default function ARResult() {
  const { state } = useLocation();
  const { form, estimate } = state || {};
  

  const [qrUrl, setQrUrl] = useState('');

  const getModel = () => {
  if (!form) return { path: '/free/models/R2F1.glb', id: 'R2F1' };

  const rooms = Number(form.rooms);
  const floors = Number(form.floors);
  const garage = form.garage;
  const landSize = Number(form.landSize);

  const models = [
    { name: "R2F1", rooms: 2, floors: 1, garage: false, size: 1950 },
    { name: "R2F2", rooms: 2, floors: 2, garage: false, size: 2450 },
    { name: "R3F1G", rooms: 3, floors: 1, garage: true, size: 2300 },
    { name: "R3F2", rooms: 3, floors: 2, garage: false, size: 2800 },
    { name: "R3F2G", rooms: 3, floors: 2, garage: true, size: 3000 },
    { name: "R4F1", rooms: 4, floors: 1, garage: false, size: 2600 },
    { name: "R4F2", rooms: 4, floors: 2, garage: false, size: 3200 },
    { name: "R4F2G", rooms: 4, floors: 2, garage: true, size: 3400 },
    { name: "R5F1", rooms: 5, floors: 1, garage: false, size: 3000 },
    { name: "R5F2G", rooms: 5, floors: 2, garage: true, size: 3800 }
  ];

  const filtered = models.filter(
    m => m.rooms === rooms &&
         m.floors === floors &&
         m.garage === garage
  );

  if (filtered.length === 0) {
    return { path: '/free/models/R2F1.glb', id: 'R2F1' };
  }

  let closest = filtered[0];
  let diff = Math.abs(landSize - closest.size);

  filtered.forEach(model => {
    const newDiff = Math.abs(landSize - model.size);
    if (newDiff < diff) {
      closest = model;
      diff = newDiff;
    }
  });

  return {
    path: `/free/models/${closest.name}.glb`,
    id: closest.name
  };
};

  useEffect(() => {
  if (!form || !estimate) return;

  const generateQR = async () => {
    try {
      const modelId = getModel().id;   // ONLY R3F2G etc

      const res = await axios.post('http://localhost:5000/api/ar', {
        model: modelId
      });

      console.log("QR Model ID:", modelId);

      setQrUrl(res.data.qrUrl);
    } catch (err) {
      console.error(err);
    }
  };

  generateQR();
}, [form, estimate]);

  if (!estimate) {
    return <Typography>No data available</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Cost & AR View
      </Typography>

      <Stack spacing={2}>

        {/* COST */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5">Estimated Cost</Typography>
          <Typography>Total: Rs. {estimate.total}</Typography>
          <Typography>Material Cost: Rs. {estimate.materialCost}</Typography>
          <Typography>Base Cost: Rs. {estimate.baseCost}</Typography>
        </Paper>

        {/* 3D MODEL */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">3D Model</Typography>

          <model-viewer
            src={getModel().path}
            alt="3D House"
            auto-rotate
            camera-controls
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#444348'
            }}
          />
        </Paper>

        {/* APK */}
        <Button
          variant="contained"
          href="https://drive.google.com/file/d/18eO6rmkQU_Uhg-EliL2_ILRzfAYXMU-u/view?usp=sharing"
        >
          Download AR App (APK)
        </Button>

        {/* QR */}
        {qrUrl && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography>Scan QR via AR App</Typography>
            <QRCodeCanvas value={qrUrl} size={200} />
          </Paper>
        )}

      </Stack>
    </>
  );
}