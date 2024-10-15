import { Diagnosis, OccupationalHealthCareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
interface props {
  entry: OccupationalHealthCareEntry;
  diagnoses: Diagnosis[];
}
const OccupationalHealthcare = ({ entry, diagnoses }: props) => {
  return (
    <div style={{ border: "2px solid", borderRadius: "8px", padding: "5px", marginBottom:'10px'}}>
      <div>
        <p>
          <span> {entry.date} </span>
          <WorkIcon />
          <span> {entry.employerName} </span>
        </p>
        <p>{entry.description}</p>
        <p>Diagnoses by {entry.specialist}</p>
        {entry.sickLeave && (
          <div>
            <h3>sickLeave</h3>
            <p>startDate: {entry.sickLeave.startDate}</p>
            <p>endDate: {entry.sickLeave.endDate}</p>
          </div>
        )}
        {entry.diagnosisCodes && <h3>Diagnoses</h3>}
        <ul>
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((code) => (
              <div key={code}>
                <li>
                  {code}{" "}
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
    </div>
  );
};
export default OccupationalHealthcare;
