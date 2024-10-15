import {
  NewPatientEntry,
  Gender,
  NewEntry,
  Diagnose,
  discharge,
  HealthCheckRating,
  sickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing param");
  }
  return text;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};
const parseDischarge = (discharge: unknown): discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria),
    };
  }
  throw new Error("Incorrect data: a field missing");
};

const parsesickLeave = (object: unknown): sickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("startDate" in object && "endDate" in object) {
    const sickLeave: sickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickLeave;
  }
  throw new Error("Incorrect data: a field missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnose["code"]>;
};
const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};
const ischeckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !ischeckRating(rating)) {
    throw new Error("Incorrect HealthCheckRating: " + rating);
  }
  return rating;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return newEntry;
  }
  throw new Error("Incorrect data: a field missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    if (object.type === "Hospital" && "discharge" in object) {
      const newEntry: NewEntry =
        "diagnosisCodes" in object
          ? {
              description: parseString(object.description),
              date: parseDate(object.date),
              specialist: parseString(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object),
              type: "Hospital",
              discharge: parseDischarge(object.discharge),
            }
          : {
              description: parseString(object.description),
              date: parseDate(object.date),
              specialist: parseString(object.specialist),
              type: "Hospital",
              discharge: parseDischarge(object.discharge),
            };
      return newEntry;
    }
    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      const newEntry: NewEntry =
        "diagnosisCodes" in object
          ? {
              description: parseString(object.description),
              date: parseDate(object.date),
              specialist: parseString(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object),
              type: "HealthCheck",
              healthCheckRating: parseRating(object.healthCheckRating),
            }
          : {
              description: parseString(object.description),
              date: parseDate(object.date),
              specialist: parseString(object.specialist),
              type: "HealthCheck",
              healthCheckRating: parseRating(object.healthCheckRating),
            };
      return newEntry;
    }
    if (object.type === "OccupationalHealthcare" && "employerName" in object) {
      if ("sickLeave" in object) {
        const newEntry: NewEntry =
          "diagnosisCodes" in object
            ? {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object),
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
                sickLeave: parsesickLeave(object.sickLeave),
              }
            : {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
                sickLeave: parsesickLeave(object.sickLeave),
              };
        return newEntry;
      } else {
        const newEntry: NewEntry =
          "diagnosisCodes" in object
            ? {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object),
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
              }
            : {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
              };
        return newEntry;
      }
    }
  }
  throw new Error("Incorrect data: a field missing");
};

