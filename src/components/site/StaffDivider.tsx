import { Reveal } from "./Reveal";

export function StaffDivider({ className = "" }: { className?: string }) {
  return (
    <Reveal className={`staff ${className}`}>
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
