import {
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ARForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    landSize: '',
    rooms: '',
    floors: '',
    garage: false,
    materials: {
      doors: '',
      floor: '',
      roof: ''
    }
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleMaterialChange = (field, value) => {
    setForm({
      ...form,
      materials: {
        ...form.materials,
        [field]: value
      }
    });
  };

  const handleEstimate = async () => {
    try {
      console.log("FORM:", form); // debug

      // FIXED validation
      if (
        form.landSize === '' ||
        form.rooms === '' ||
        form.floors === ''
      ) {
        alert("Please fill all fields");
        return;
      }

      const response = await fetch('http://localhost:5000/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landSize: Number(form.landSize),
          rooms: Number(form.rooms),
          floors: Number(form.floors),
          hasGarage: form.garage,
          materials: form.materials
        })
      });

      const data = await response.json();

      console.log("ESTIMATE:", data);

      // ✅ navigate correctly
      navigate('/ar/result', {
        state: {
          form,
          estimate: data
        }
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        AR House Customizer
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6">Customize Your House</Typography>

        <Stack spacing={2} mt={2}>

          <TextField
            label="Land Size (sqft)"
            type="number"
            value={form.landSize} 
            onChange={(e) => handleChange('landSize', e.target.value)}
          />

          <TextField
            label="Number of Rooms"
            type="number"
            value={form.rooms} 
            onChange={(e) => handleChange('rooms', e.target.value)}
          />

          <TextField
            label="Number of Floors"
            type="number"
            value={form.floors} 
            onChange={(e) => handleChange('floors', e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={form.garage}
                onChange={(e) => handleChange('garage', e.target.checked)}
              />
            }
            label="Include Garage"
          />

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Materials
          </Typography>

          {/* DOORS */}
          <Typography>Doors & Windows</Typography>
          <ToggleButtonGroup
            value={form.materials.doors}
            exclusive
            onChange={(e, value) => handleMaterialChange('doors', value)}
            fullWidth
          >
            <ToggleButton value="wood">Wood</ToggleButton>
            <ToggleButton value="steel">Steel</ToggleButton>
          </ToggleButtonGroup>

          {/* FLOOR */}
          <Typography>Floor</Typography>
          <ToggleButtonGroup
            value={form.materials.floor}
            exclusive
            onChange={(e, value) => handleMaterialChange('floor', value)}
            fullWidth
          >
            <ToggleButton value="wood">Wood</ToggleButton>
            <ToggleButton value="carpet">Carpet</ToggleButton>
            <ToggleButton value="tiles">Tiles</ToggleButton>
          </ToggleButtonGroup>

          {/* ROOF */}
          <Typography>Roof</Typography>
          <ToggleButtonGroup
            value={form.materials.roof}
            exclusive
            onChange={(e, value) => handleMaterialChange('roof', value)}
            fullWidth
          >
            <ToggleButton value="metal">Metal</ToggleButton>
            <ToggleButton value="clay">Clay Tile</ToggleButton>
          </ToggleButtonGroup>

          <Button variant="contained" onClick={handleEstimate}>
            Calculate Cost & View AR
          </Button>

        </Stack>
      </Paper>
    </>
  );
}