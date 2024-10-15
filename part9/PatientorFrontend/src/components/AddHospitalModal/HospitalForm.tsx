import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  Chip,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { NewEntry, discharge, Diagnosis } from "../../types";
import { useState, SyntheticEvent } from "react";

interface props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const HospitalForm = ({ onCancel, onSubmit, diagnoses }: props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState<string[]>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const discharge: discharge = {
      date: dischargeDate,
      criteria,
    };
    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      discharge: discharge,
      diagnosisCodes: codes,
    });
    cancel();
  };
  const cancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setCodes([]);
    setCriteria("");
    setDischargeDate("");
  };
  const handleChange = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;
    setCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        border: "1px dashed grey",
        marginBottom: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
          New Hospital entry
        </Typography>
      </Stack>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-multiple-chip-label">diagnosis codes</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            fullWidth
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="diagnosis codes"
              />
            }
            value={codes}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((dia) => (
              <MenuItem key={dia.name} value={dia.code}>
                {dia.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <Typography variant="h6" >Discharge data:</Typography>
          <TextField
            fullWidth
            value={dischargeDate}
            type="date"
            onChange={({ target }) => setDischargeDate(target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
          label="Criteria"
          fullWidth
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
          sx={{ mb: 2 }}
        />
        </FormControl>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button sx={{ px: 10 }} onClick={onCancel} variant="contained">
            Cancel
          </Button>
          <Button sx={{ px: 10 }} type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
export default HospitalForm;
