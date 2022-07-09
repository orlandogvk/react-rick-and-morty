import { useEffect, useState } from 'react'
import Character from './Character'

function Navpage({ page, setPage }) {
  if (page > 1) {
    return (
      <header className='d-flex justify-content-between align-items-center'>
        <button className='btn btn-primary btn-sm' onClick={() => setPage(page - 1)}>
          Before Page {page - 1}
        </button>
        <div>
          <p>Current Page {page}</p>
        </div>
        <button className='btn btn-primary btn-sm' onClick={() => setPage(page + 1)}>
          Next Page {page + 1}
        </button>
      </header>
    )
  } else {
    return (
      <header className='d-flex justify-content-between align-items-center'>
        <p>Current Page {page}</p>
        <button className='btn btn-primary btn-sm' onClick={() => setPage(page + 1)}>
          Next Page {page + 1}
        </button>
      </header>
    )
  }
}

function CharacterList() {

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    }
    fetchData();
  }, [page]);


  return (
    <div className='container'>
      <Navpage page={page} setPage={setPage} />
      {
        loading ? <div className='text-center'><h1>Loading...</h1></div> : <div className='row'>
          {
            characters.map(char => {
              return (
                <div className='col-md-4' key={char.id}>
                  <Character character={char} />
                </div>
              );
            })}
        </div>
      }
      <Navpage page={page} setPage={setPage} />
    </div>

  );
}

export default CharacterList