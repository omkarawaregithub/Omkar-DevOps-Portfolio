interface GlyphProps {
  name: string;
  className?: string;
}

/**
 * A small set of original, abstract line-art icons.
 * These are intentionally geometric/abstract rather than reproductions
 * of any brand's logo — they represent the *concept* of each tool.
 */
export default function Glyph({ name, className = "w-6 h-6" }: GlyphProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "jenkins":
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="3.2" />
          <path d="M7 20c0-3.3 2.2-6 5-6s5 2.7 5 6" />
          <path d="M9 9.5c0 1 1.2 1.8 3 1.8s3-.8 3-1.8" />
        </svg>
      );
    case "docker":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="4" height="4" />
          <rect x="8" y="11" width="4" height="4" />
          <rect x="13" y="11" width="4" height="4" />
          <rect x="8" y="6" width="4" height="4" />
          <path d="M2 15c0 3.5 3 6 8.5 6 6 0 9.7-3.3 10.7-7-1 0.3-1.9-0.4-2.3-1.2C18 12 16.7 12 16.7 12" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg {...common}>
          <path d="M12 2.5 20.5 8v8L12 21.5 3.5 16V8L12 2.5Z" />
          <path d="M12 7.5 16.5 10v4L12 16.5 7.5 14v-4L12 7.5Z" />
        </svg>
      );
    case "aws":
      return (
        <svg {...common}>
          <path d="M4 16c3.5 2 12.5 2 16 0" />
          <path d="M17 15.5 19.5 16.3 18.9 13.6" />
          <ellipse cx="12" cy="9" rx="7" ry="3.6" />
          <path d="M5 9v4c0 2 3.1 3.6 7 3.6s7-1.6 7-3.6V9" />
        </svg>
      );
    case "sonarqube":
      return (
        <svg {...common}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <path d="M4 13h16" />
          <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" />
          <path d="M12 13 16 8" />
        </svg>
      );
    case "trivy":
      return (
        <svg {...common}>
          <path d="M12 2.5 19 5.5v6c0 5-3 8.3-7 10-4-1.7-7-5-7-10v-6L12 2.5Z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M13 7.5 9.5 12.3H12l-1 4.2 4-5.2H12.5L13 7.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="3.2" />
          <circle cx="17" cy="15" r="3.2" />
          <path d="M9 10.2V13c0 1.7 1.3 2.4 3 2.4h1.8" />
        </svg>
      );
    case "git":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="12" r="2" />
          <path d="M6 8v8" />
          <path d="M6 10c0 3.5 3 4 6 4h3" />
        </svg>
      );
    case "maven":
      return (
        <svg {...common}>
          <path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z" />
          <path d="M12 3v18M4.5 7.5 12 12l7.5-4.5M4.5 16.5 12 12l7.5 4.5" opacity="0.55" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M7 10l3 2.5L7 15" />
          <path d="M13 15h4" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <circle cx="12" cy="4.5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M12 6.5v5M12 11.5 5.8 16.3M12 11.5l6.2 4.8" />
        </svg>
      );
    case "test":
      return (
        <svg {...common}>
          <path d="M9 3v5.5L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 8.5V3" />
          <path d="M9 3h6" />
          <path d="M7.2 15h9.6" />
        </svg>
      );
    case "deploy":
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="M7.5 10 12 15l4.5-5" />
          <path d="M4.5 19.5h15" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7.5 17.5A4.2 4.2 0 0 1 6 9.3 5.5 5.5 0 0 1 16.8 8.5 3.8 3.8 0 0 1 17 16.1" opacity="0.9" />
          <path d="M7.5 17.5h9.4" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8.5 8 4.5 12l4 4" />
          <path d="M15.5 8l4 4-4 4" />
          <path d="M13 6.5 11 17.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
