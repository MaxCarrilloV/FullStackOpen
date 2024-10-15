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
import { NewEntry, sickLeave, Diagnosis } from "../../types";
import { useState, SyntheticEvent } from "react";

interface props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const OccupationForm = ({ onCancel, onSubmit, diagnoses }: props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (startDate !== "" && endDate !== "") {
      const sickLeave: sickLeave = {
        startDate,
        endDate,
      };
      onSubmit({
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        sickLeave: sickLeave,
        employerName,
        diagnosisCodes: codes,
      });
      cancel();
    }else {
      onSubmit({
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        employerName,
        diagnosisCodes: codes,
      });
      cancel();
    }
  };
  const cancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setCodes([]);
    setstartDate("");
    setendDate("");
    setEmployerName("");
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
          New Occupational Health care entry
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
        <TextField
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
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
        <Typography variant="h5">sickLeave data:</Typography>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <Typography variant="h6">start date:</Typography>
          <TextField
            fullWidth
            value={startDate}
            type="date"
            onChange={({ target }) => setstartDate(target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="h6">end date:</Typography>
          <TextField
            type="date"
            fullWidth
            value={endDate}
            onChange={({ target }) => setendDate(target.value)}
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
export default OccupationForm;
