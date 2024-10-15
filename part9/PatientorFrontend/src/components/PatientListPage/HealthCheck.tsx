import { Diagnosis, HealthCheckEntry } from "../../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { yellow, pink } from "@mui/material/colors";
interface props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}
const HealthCheck = ({ entry, diagnoses }: props) => {
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
        <span> {entry.date} </span>
        <HealthAndSafetyIcon />
      </p>
      <p>{entry.description}</p>
      {entry.healthCheckRating === 0 && <FavoriteIcon color="success" />}
      {entry.healthCheckRating === 1 && (
        <FavoriteIcon sx={{ color: yellow[500] }} />
      )}
      {entry.healthCheckRating === 2 && (
        <FavoriteIcon sx={{ color: yellow[800] }} />
      )}
      {entry.healthCheckRating === 3 && (
        <FavoriteIcon sx={{ color: pink[500] }} />
      )}
      <p>Diagnoses by {entry.specialist}</p>
      {entry.diagnosisCodes && <h3>Diagnoses</h3>}
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => (
            <div key={code}>
              <li >
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
export default HealthCheck;
