import { useReducer } from 'react';
import './App.scss';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

type Action =
  | { type: 'ADD_JOKE'; joke: string }
  | { type: 'UPDATE_RATE'; id: number; rate: number };

const initialState: Joke[] = [
  {
    id: 1,
    joke: 'What do you call a very small valentine? A valen-tiny!',
    rate: 3,
  },
  {
    id: 2,
    joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!',
    rate: 2,
  },
  {
    id: 3,
    joke: 'A termite walks into the bar and says, "Where is the bar tender?"',
    rate: 1,
  },
  {
    id: 4,
    joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
    rate: 0,
  },
  {
    id: 5,
    joke: 'Why was the math book sad? Because it had too many problems.',
    rate: 0,
  },
];

const jokeReducer = (state: Joke[], action: Action): Joke[] => {
  switch (action.type) {
    case 'ADD_JOKE':
      return [
        ...state,
        { id: state.length + 1, joke: action.joke, rate: 0 },
      ];
    case 'UPDATE_RATE':
      return state.map((joke) =>
        joke.id === action.id ? { ...joke, rate: action.rate } : joke
      );
    default:
      return state;
  }
};

function App() {
  const [jokes, dispatch] = useReducer(jokeReducer, initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'ADD_JOKE', joke: e.target[0].value });
    e.target[0].value = '';
  };

  return (
    <div className='container'>
      <h2>Jokes for you 💀</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' placeholder='Add a joke' />
        <button type='submit'>Add Joke</button>
      </form>
      <div className='jokes'>
        {jokes &&
          jokes
            .sort((a, b) => b.rate - a.rate)
            .map((joke) => (
              <div key={joke.id} className='joke'>
                <div className='joke-text'>{joke.joke}</div>
                <div className='text'>{joke.rate}</div>
                <div className='joke-buttons'>
                  <button
                    onClick={() =>
                      dispatch({ type: 'UPDATE_RATE', id: joke.id, rate: joke.rate + 1 })
                    }
                  >
                    👍
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: 'UPDATE_RATE', id: joke.id, rate: joke.rate - 1 })
                    }
                  >
                    👎
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
