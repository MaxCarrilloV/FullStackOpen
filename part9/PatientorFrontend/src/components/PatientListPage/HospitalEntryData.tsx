import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
interface props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}
const HospitalEntryData = ({ entry, diagnoses }: props) => {
  return (
    <div
      style={{
        border: "2px solid",
        borderRadius: "8px",
        padding: "5px",
        marginBottom: "10px",
      }}
    >
      <p>
        {entry.date}
        <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>Diagnoses by {entry.specialist}</p>
      <h3>Discharge</h3>
      <p>date: {entry.discharge.date}</p>
      <p>criteria: {entry.discharge.criteria}</p>
      {entry.diagnosisCodes && <h3>Diagnoses</h3>}
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => (
            <div key={code}>
              <li>
                {code}
                {diagnoses.map((dia) => {
                  if (dia.code === code) {
                    return <span key={dia.code}>{dia.name}</span>;
                  }
                })}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};
export default HospitalEntryData;
