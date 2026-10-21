export default function SceneSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className="scene-skeleton" role="status" aria-label="Loading 3D illustration">
      <span className={`skeleton scene-skeleton__ring${dark ? " skeleton--dark" : ""}`} />
    </div>
  );
}
