import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";
const router = express.Router();
router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.json(patient);
  } else {
    const errorMessage = "Something went wrong!";
    res.status(400).send(errorMessage);
  }
});
router.post("/", (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(NewPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
router.post("/:id/entries", (req, res) => {
  try {
    const NewEntry = toNewEntry(req.body);
    const patientID = req.params.id;
    const addedEntry = patientService.addEntry(NewEntry, patientID);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
