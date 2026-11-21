/**
 * Shared icons — real SVG paths rather than unicode glyphs, which render as
 * wildly different shapes (or missing-glyph boxes) depending on installed fonts.
 */

import type { ReactNode } from "react";

type IconProps = { size?: number; className?: string };

function Stroke({
  size = 20,
  className,
  children,
  width = 1.7,
}: IconProps & { children: ReactNode; width?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------- contact --- */

export const MailIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </Stroke>
);

export function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.82 9.82 0 0 0 4.69 1.2h.01c5.43 0 9.86-4.43 9.86-9.87A9.8 9.8 0 0 0 19 4.88 9.8 9.8 0 0 0 12.04 2Zm0 1.79c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.08-8.09 8.08a8.06 8.06 0 0 1-4.11-1.13l-.3-.17-3.05.8.81-2.98-.19-.31a8.04 8.04 0 0 1-1.23-4.3c0-4.45 3.63-8.08 8.07-8.08Z" />
    </svg>
  );
}

export function TelegramIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.9h3.28V21H3.3V8.9Zm5.72 0h3.15v1.65h.05c.44-.83 1.5-1.71 3.1-1.71 3.31 0 3.92 2.18 3.92 5.02V21h-3.27v-5.45c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.42-2.09 2.88V21H9.02V8.9Z" />
    </svg>
  );
}

/** Freelancer.com mark — path from Simple Icons (CC0). */
export function FreelancerIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.096 3.076l1.634 2.292L24 3.076M5.503 20.924l4.474-4.374-2.692-2.89m6.133-10.584L11.027 5.23l4.022.15M4.124 3.077l.857 1.76 4.734.294m-3.058 7.072l3.497-6.522L0 5.13m7.064 7.485l3.303 3.548 3.643-3.57 1.13-6.652-4.439-.228Z" />
    </svg>
  );
}

/* ------------------------------------------------------------- general --- */

export const StarIcon = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.8a1 1 0 0 1 .9.56l2.38 4.83 5.33.77a1 1 0 0 1 .55 1.7l-3.85 3.76.91 5.3a1 1 0 0 1-1.45 1.06L12 18.27l-4.77 2.5a1 1 0 0 1-1.45-1.05l.91-5.31-3.85-3.76a1 1 0 0 1 .55-1.7l5.33-.77 2.38-4.83A1 1 0 0 1 12 2.8Z" />
  </svg>
);

export const QuoteIcon = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.6 19.5c-1.3-1.2-2.1-2.8-2.1-5 0-3.9 2.6-7.3 6.6-9.2l.9 1.4c-2.5 1.5-3.9 3.3-4.2 5.4.4-.2.9-.3 1.5-.3 1.9 0 3.3 1.4 3.3 3.3 0 2-1.5 3.5-3.5 3.5-1 0-1.9-.4-2.5-1.1Zm11 0c-1.3-1.2-2.1-2.8-2.1-5 0-3.9 2.6-7.3 6.6-9.2l.9 1.4c-2.5 1.5-3.9 3.3-4.2 5.4.4-.2.9-.3 1.5-.3 1.9 0 3.3 1.4 3.3 3.3 0 2-1.5 3.5-3.5 3.5-1 0-1.9-.4-2.5-1.1Z" />
  </svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12.2 2.3 2.3 4.2-4.4" />
  </Stroke>
);

export const ExpandIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </Stroke>
);

export const CloseIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="m15 5-7 7 7 7" />
  </Stroke>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="m9 5 7 7-7 7" />
  </Stroke>
);

export const CalendarIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </Stroke>
);

export const GlobeIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z" />
  </Stroke>
);

export const ImagesIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="6.5" y="3.5" width="14" height="12" rx="2" />
    <path d="M3.5 8v10a2.5 2.5 0 0 0 2.5 2.5h11" />
    <path d="m9.5 13 3-3.2 2.6 2.7 1.6-1.5 3.3 3.2" />
  </Stroke>
);

export const DownloadIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3.5v11m0 0 4.2-4.2M12 14.5l-4.2-4.2" />
    <path d="M4.5 16.5v1.8a2.2 2.2 0 0 0 2.2 2.2h10.6a2.2 2.2 0 0 0 2.2-2.2v-1.8" />
  </Stroke>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
);

export const MapPinIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Stroke>
);

export const CapIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z" />
    <path d="M6.5 11v4.6c0 1.3 2.5 2.9 5.5 2.9s5.5-1.6 5.5-2.9V11" />
    <path d="M21.5 9v5" />
  </Stroke>
);

export const CheckIcon = (p: IconProps) => (
  <Stroke {...p} width={2.2}>
    <path d="m4.5 12.5 4.8 4.8L19.5 7" />
  </Stroke>
);

export const CopyIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </Stroke>
);

export const ClockIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Stroke>
);

export const SendIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M21 3 10 14" />
    <path d="m21 3-6.5 18-4.5-7-7-4.5L21 3Z" />
  </Stroke>
);

export const LockIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.2" />
    <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" />
  </Stroke>
);

export const PlayIcon = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5.6v12.8c0 .8.9 1.3 1.6.85l10-6.4a1 1 0 0 0 0-1.7l-10-6.4C8.9 4.3 8 4.8 8 5.6Z" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <Stroke {...p} width={2}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
);

/* -------------------------------------------------------------- devices --- */

export const DesktopIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
    <path d="M8.5 20h7M12 16.5V20" />
  </Stroke>
);

export const TabletIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2.2" />
    <path d="M11 18.5h2" />
  </Stroke>
);

export const MobileIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.4" />
    <path d="M11 18.5h2" />
  </Stroke>
);

/* ------------------------------------------------------- domain glyphs --- */

export const SparkIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z" />
    <path d="M18.5 15.5c.25 1.6.9 2.25 2.5 2.5-1.6.25-2.25.9-2.5 2.5-.25-1.6-.9-2.25-2.5-2.5 1.6-.25 2.25-.9 2.5-2.5Z" />
  </Stroke>
);

export const CodeIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
  </Stroke>
);

export const ServerIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="3.5" width="18" height="7" rx="2" />
    <rect x="3" y="13.5" width="18" height="7" rx="2" />
    <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
  </Stroke>
);

export const LayersIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m12 3 9 4.8-9 4.8-9-4.8L12 3Z" />
    <path d="m3 12.2 9 4.8 9-4.8M3 16.4l9 4.8 9-4.8" />
  </Stroke>
);

export const PlugIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9 3v4M15 3v4M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0V7ZM12 16v5" />
  </Stroke>
);

export const RocketIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14.5 4.2c2.6-1 4.6-.9 5.6-.3.6 1 .7 3-.3 5.6-1.1 2.8-3.6 5.4-6.6 7.1l-3.8-3.8c1.7-3 4.3-5.5 7.1-6.6Z" />
    <path d="M9.4 12.8 6 12.3l2.6-3.1 3.3.3M11.2 14.6l.5 3.4 3.1-2.6-.3-3.3" />
    <path d="M6.2 16.3c-1.4.4-2.2 1.8-2.4 3.9 2.1-.2 3.5-1 3.9-2.4" />
    <circle cx="15.6" cy="8.4" r="1.4" />
  </Stroke>
);

export const DevicesIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.5" y="4.5" width="13" height="9.5" rx="1.6" />
    <path d="M6 18h6" />
    <rect x="15.5" y="9" width="6" height="11" rx="1.6" />
  </Stroke>
);

export const ChatIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20.5 12a8 8 0 0 1-11.7 7.1L3.5 20.5l1.4-5A8 8 0 1 1 20.5 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </Stroke>
);

export const BriefcaseIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2.2" />
    <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" />
  </Stroke>
);

export const CloudIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 9H7Z" />
  </Stroke>
);

/** a small robot head — AI agents */
export const AgentIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 8V4.5M12 4.5h.01M9 13.5h.01M15 13.5h.01M9.5 17h5M2 13v2M22 13v2" />
  </Stroke>
);

export const SearchIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Stroke>
);
