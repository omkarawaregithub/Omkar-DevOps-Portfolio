export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  status: "current" | "past";
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer Trainee (DevOps)",
    company: "Jijau Software Pvt. Ltd.",
    period: "September 2025 — Present",
    status: "current",
    points: [
      "Gained hands-on experience with DevOps tools including Jenkins, Docker, Git, Maven, and Linux.",
      "Assisted in building and maintaining CI/CD pipelines for application deployment.",
      "Containerized Spring Boot applications using Docker and managed container deployments.",
      "Used Git and GitHub for source code management and version control.",
      "Performed application deployment, troubleshooting, and basic Linux server administration.",
      "Learned AWS EC2 fundamentals and supported cloud-based application deployments.",
    ],
  },
];
