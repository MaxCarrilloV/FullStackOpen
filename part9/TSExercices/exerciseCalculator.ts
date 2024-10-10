interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesValues {
  value1: number;
  value2: number[];
}

const ArgumentsParse = (args: string[]): ExercisesValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  let value2 = [];
  let value1;
  if (!isNaN(Number(args[2]))) {
    value1 = Number(args[2]);
  } else {
    throw new Error("Provided values were not numbers!");
  }
  const days = args.splice(3);
  if (days.length < 2) throw new Error("Not enough arguments");
  for (let i = 0; i < days.length; i++) {
    if (isNaN(Number(days[i]))) {
      days[i] = "false";
    }
  }
  if (days.includes("false")) {
    throw new Error("Provided values were not numbers!");
  } else {
    value2 = days.map(Number);
    return {
      value1,
      value2,
    };
  }
};

export const calculateExercises = (days: number[], obj: number): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((e) => e !== 0).length;
  let success;
  days.map((e) => {
    if (e < obj) {
      success = false;
    }
  });
  success = success === false ? success : true;
  const average = days.reduce((x, y) => x + y) / periodLength;
  const norm = days.reduce((x, y) => x + y);
  const normObj = 2 * periodLength;
  let rating = 0;
  let ratingDescription = '';
  if (norm < normObj) {
    rating = 1;
    ratingDescription = "not too bad but could be better";
  } else if (norm === normObj) {
    rating = 2;
    ratingDescription = "the objective was met";
  } else if (norm > normObj) {
    rating = 3;
    ratingDescription = "Very well you exceeded the objective";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: obj,
    average,
  };
};
try {
  const { value1, value2 } = ArgumentsParse(process.argv);
  console.log(calculateExercises(value2, value1));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}