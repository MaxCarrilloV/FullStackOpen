import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => {
  if (text === "Positivos:") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = bad + neutral + good;
  const promedio = (-bad + good) / total;
  const positivos = (good * 100) / total;
  if (good === 0 && neutral === 0 && bad === 0) {
    return <h1>Aun no hay comentarios</h1>;
  }
  return (
    <div>
      <h2> Estadísticas </h2>
      <table>
        <StatisticLine text="Buena:" value={good}></StatisticLine>
        <StatisticLine text="Neutral:" value={neutral}></StatisticLine>
        <StatisticLine text="Mala:" value={bad}></StatisticLine>
        <StatisticLine text="Todas:" value={total}></StatisticLine>
        <StatisticLine text="Promedio:" value={promedio}></StatisticLine>
        <StatisticLine text="Positivos:" value={positivos}></StatisticLine>
      </table>
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const OnGood = () => setGood(good + 1);
  const OnNeutral = () => setNeutral(neutral + 1);
  const OnBad = () => setBad(bad + 1);
  return (
    <div>
      <h2>Dejar Comentario</h2>
      <Button text="Buena" onClick={OnGood}></Button>
      <Button text="neutral" onClick={OnNeutral}></Button>
      <Button text="Mala" onClick={OnBad}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
