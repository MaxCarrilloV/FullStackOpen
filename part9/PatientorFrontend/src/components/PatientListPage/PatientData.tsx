import { Patient, Diagnosis, NewEntry } from "../../types";
import { useEffect, useState } from "react";
import { getDiagnoses } from "../../services/diagnoses";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import HospitalEntryData from "./HospitalEntryData";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import AddHealthCheckFormModal from "../AddHealthCheckModal";
import AddHospitalModal from "../AddHospitalModal";
import AddOccupationModal from "../AddOcupationModal";
import { Alert, Button } from "@mui/material";
import axios from "axios";
const PatientData = ({ patient }: { patient: Patient | undefined }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [sucess, setSucess] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalHosOpen, setModalHosOpen] = useState<boolean>(false);
  const [modalOccOpen, setModalOccOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const openHosModal = (): void => setModalHosOpen(true);
  const openOccModal = ():void => setModalOccOpen(true);
  const closeOccModal = (): void => {
    setModalOccOpen(false);
    setError(undefined);
  };

  const closeHosModal = (): void => {
    setModalHosOpen(false);
    setError(undefined);
  };
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    getDiagnoses().then((data) => {
      setDiagnoses(data);
    });
  }, []);
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const onSubmit = async (values: NewEntry) => {
    if (patient) {
      try {
        const id = patient.id;
        const entry = await patientService.addEntry(values, id);
        patient.entries.push(entry);
        closeModal();
        closeHosModal();
        closeOccModal();
        setSucess("added entry");
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };
  return (
    <div>
      {patient ? (
        <div>
          {sucess && <Alert severity="success">{sucess}</Alert>}
          <h1>
            {patient.name}
            {patient.gender === "male" ? (
              <MaleIcon fontSize="large" />
            ) : (
              <FemaleIcon fontSize="large" />
            )}
          </h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => openModal()}
          >
            Add New Health Check Entry
          </Button>
          <AddHealthCheckFormModal
            diagnoses={diagnoses}
            modalOpen={modalOpen}
            onClose={closeModal}
            onSubmit={onSubmit}
            error={error}
          />
          <Button
            variant="contained"
            sx={{ mb: 2, ml: 2 }}
            onClick={() => openHosModal()}
          >
            Add New Hospital Entry
          </Button>
          <AddHospitalModal
            diagnoses={diagnoses}
            modalOpen={modalHosOpen}
            onClose={closeHosModal}
            onSubmit={onSubmit}
            error={error}
          />
          <Button
            variant="contained"
            sx={{ mb: 2, ml: 2 }}
            onClick={() => openOccModal()}
          >
            Add New Occupational Health care Entry
          </Button>
          <AddOccupationModal
            diagnoses={diagnoses}
            modalOpen={modalOccOpen}
            onClose={closeOccModal}
            onSubmit={onSubmit}
            error={error}
          />
          {patient.entries.map((e) => {
            const type = e.type;
            switch (type) {
              case "Hospital":
                return (
                  <HospitalEntryData
                    key={e.id}
                    entry={e}
                    diagnoses={diagnoses}
                  />
                );
              case "OccupationalHealthcare":
                return (
                  <OccupationalHealthcare
                    key={e.id}
                    entry={e}
                    diagnoses={diagnoses}
                  />
                );
              case "HealthCheck":
                return (
                  <HealthCheck key={e.id} entry={e} diagnoses={diagnoses} />
                );
              default:
                return assertNever(type);
            }
          })}
        </div>
      ) : (
        <h1 style={{ color: "red" }}>Undefined patient</h1>
      )}
    </div>
  );
};
export default PatientData;
