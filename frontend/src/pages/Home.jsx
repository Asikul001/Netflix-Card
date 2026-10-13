import { useEffect, useState } from "react";
import api from "../api.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load the user's list once
  useEffect(() => {
    api
      .get("/movies/mylist")
      .then((res) => setMyList(res.data.map((m) => m._id)));
  }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      api
        .get("/movies", { params: { search } })
        .then((res) => setMovies(res.data))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const toggleList = async (id) => {
    const res = await api.post(`/movies/${id}/list`);
    setMyList(res.data.myList);
  };

  const genres = [...new Set(movies.map((m) => m.genre))];
  const featured = movies[0];

  return (
    <main>
      {featured && !search && (
        <section
          className="hero"
          style={{ backgroundImage: `url(${featured.thumbnail})` }}
        >
          <div className="hero-content">
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <div className="hero-btns">
              <button className="btn-play">▶ Play</button>
              <button
                className="btn-info"
                onClick={() => toggleList(featured._id)}
              >
                {myList.includes(featured._id) ? "✓ In my list" : "+ My list"}
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="search-wrap">
        <input
          className="search"
          placeholder="Search titles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="empty">Loading…</p>}
      {!loading && movies.length === 0 && (
        <p className="empty">No titles match “{search}”. Try another word.</p>
      )}

      {!search && myList.length > 0 && (
        <section className="row">
          <h2>My list</h2>
          <div className="row-cards">
            {movies
              .filter((m) => myList.includes(m._id))
              .map((m) => (
                <MovieCard key={m._id} movie={m} inList onToggle={toggleList} />
              ))}
          </div>
        </section>
      )}

      {genres.map((g) => (
        <section className="row" key={g}>
          <h2>{g}</h2>
          <div className="row-cards">
            {movies
              .filter((m) => m.genre === g)
              .map((m) => (
                <MovieCard
                  key={m._id}
                  movie={m}
                  inList={myList.includes(m._id)}
                  onToggle={toggleList}
                />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
