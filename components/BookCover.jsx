export default function BookCover({ book, size = "md" }) {
  return (
    <div className={`book-cover ${book?.coverTone || "blue"} ${size}`} aria-label={`Sampul ${book?.title}`}>
      <span className="cover-type">{book?.type || "Buku"}</span>
      <strong>{book?.title}</strong>
      <small>{book?.author}</small>
    </div>
  );
}
