import Link from "next/link";

export default function EmptyState({ title, description, actionHref, actionLabel }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📚</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionHref && (
        <Link className="primary-btn" href={actionHref}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
