import express from "express";
import { Resolve, calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const query = req.query;
  if (!isNaN(Number(query.height)) && !isNaN(Number(query.weight))) {
    const result = calculateBmi(Number(query.height), Number(query.weight));
    const json: Resolve = {
      weight: Number(query.height),
      height: Number(query.weight),
      bmi: result,
    };
    res.send(JSON.stringify(json));
  } else {
    res.send(JSON.stringify({ error: "malformatted parameters" }));
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises) {
    res.send(JSON.stringify({ error: "parameters missing" }));
  } else {
    if (!isNaN(Number(target)) && Array.isArray(daily_exercises) && daily_exercises.every((e) => typeof e === "number") ) {
      const result = calculateExercises(daily_exercises, target);
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify({ error: "malformatted parameters" }));
    }
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
