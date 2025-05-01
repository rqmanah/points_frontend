function PointsCard({ avatar, points, title }: any) {
  return (
    <div className="points-card shadow">
      {avatar && (
        <div className="points-card-avatar shadow-sm">
          <img src={avatar} />
        </div>
      )}
      {points && <div className="fw-400 font-size-33">{points}</div>}
      {title && <div className="font-size-24 fw-400">{title}</div>}
    </div>
  );
}

export default PointsCard;
