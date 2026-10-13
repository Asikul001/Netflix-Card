// One card. The hover effect is pure CSS (see .card in index.css)
export default function MovieCard({ movie, inList, onToggle }) {
  return (
    <div className="card">
      <img src={movie.thumbnail} alt={movie.title} loading="lazy" />

      <div className="card-info">
        <h3>{movie.title}</h3>
        <p className="meta">
          <span className="match">★ {movie.rating}</span>
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
        </p>
        <p className="desc">{movie.description}</p>
        <button
          className={inList ? 'btn-list active' : 'btn-list'}
          onClick={() => onToggle(movie._id)}
        >
          {inList ? '✓ In my list' : '+ My list'}
        </button>
      </div>
    </div>
  );
}
