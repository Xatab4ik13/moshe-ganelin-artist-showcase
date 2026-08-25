import { Reveal } from "./Reveal";

export function StaffDivider({ className = "" }: { className?: string }) {
  return (
    <Reveal className={`staff ${className}`} aria-hidden="true">
      <div className="staff-lines">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <i className="staff-note" />
    </Reveal>
  );
}
