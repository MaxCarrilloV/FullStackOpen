interface BMIValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
export const calculateBmi = (hei: number, wei: number): string => {
  hei = hei / 100;
  const imc = wei / (hei * hei);
  if (imc < 18.5) {
    return "underweight";
  } else if (imc >= 18.5 && imc <= 24.9) {
    return "Normal (healthy weight)";
  } else if (imc > 24.9 && imc <= 30) {
    return "Overweight";
  } else if (imc > 30) {
    return "Obesity";
  }
  return '';
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
export interface Resolve {
    weight:number,
    height:number,
    bmi:string
}
export default calculateBmi; 