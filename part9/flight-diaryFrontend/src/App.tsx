import { useEffect, useState } from "react";
import { getAll, createDiary } from "./services/diaries";
import { DiaryEntry, Visibility, Weather } from "./types";
function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState('');
  useEffect(() => {
    getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async(event: React.SyntheticEvent) => {
    event.preventDefault();
    const entry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
    createDiary(entry).then((data) => {
      setDiaries(diaries.concat(data));
    }).catch(error => {
      const errorMessage = error.response.data.message;
      setError(errorMessage);
    })
    setDate("");
    setComment("");
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} 
      <form onSubmit={diaryCreation}>
        <h2>add new entry</h2>
        <div>
          date:
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:
          <input
            type="radio"
            name="visibility"
            id="good"
            value={Visibility.Good}
            onChange={() => setVisibility(Visibility.Good)}
          />
          <label htmlFor="good">Good</label>
          <input
            type="radio"
            name="visibility"
            id="great"
            value={Visibility.Great}
            onChange={() => setVisibility(Visibility.Great)}
          />
          <label htmlFor="great">Great</label>
          <input
            type="radio"
            name="visibility"
            id="ok"
            value={Visibility.Ok}
            onChange={() => setVisibility(Visibility.Ok)}
          />
          <label htmlFor="ok">Ok</label>
          <input
            type="radio"
            name="visibility"
            id="poor"
            value={Visibility.Poor}
            onChange={() => setVisibility(Visibility.Poor)}
          />
          <label htmlFor="poor">Poor</label>
        </div>
        <div>
          weather:
          <input
            type="radio"
            name="weather"
            id="sunny"
            value={Weather.Sunny}
            onChange={() => setWeather(Weather.Sunny)}
          />
          <label htmlFor="sunny">Sunny</label>
          <input
            type="radio"
            name="weather"
            id="rainy"
            value={Weather.Rainy}
            onChange={() => setWeather(Weather.Rainy)}
          />
          <label htmlFor="rainy">Rainy</label>
          <input
            type="radio"
            name="weather"
            id="cloudy"
            value={Weather.Cloudy}
            onChange={() => setWeather(Weather.Cloudy)}
          />
          <label htmlFor="cloudy">Cloudy</label>
          <input
            type="radio"
            name="weather"
            id="stormy"
            value={Weather.Stormy}
            onChange={() => setWeather(Weather.Stormy)}
          />
          <label htmlFor="stormy">Stormy</label>
          <input
            type="radio"
            name="weather"
            id="windy"
            value={Weather.Windy}
            onChange={() => setWeather(Weather.Windy)}
          />
          <label htmlFor="windy">Windy</label>
        </div>
        <div>
          comment:
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <div>
        <h2>Diary entries</h2>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
