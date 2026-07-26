"use client";

export function ResumeActions() {
  return (
    <button className="button button-dark no-print" type="button" onClick={() => window.print()}>
      Download / Save as PDF <span aria-hidden="true">↓</span>
    </button>
  );
}
