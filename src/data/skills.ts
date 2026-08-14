export type SkillLevel = "Working knowledge" | "Basics";

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  level: SkillLevel;
  glyph: string; // key used to select an icon/animation
}

// Skills that cycle through the hero's floating card sequence.
export const heroSkills: Skill[] = [
  {
    id: "jenkins",
    name: "JENKINS",
    category: "CI/CD",
    description: "Pipeline Automation",
    level: "Working knowledge",
    glyph: "jenkins",
  },
  {
    id: "docker",
    name: "DOCKER",
    category: "Containers",
    description: "Containerization",
    level: "Working knowledge",
    glyph: "docker",
  },
  {
    id: "kubernetes",
    name: "KUBERNETES",
    category: "Orchestration",
    description: "Orchestration Basics",
    level: "Basics",
    glyph: "kubernetes",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    description: "Cloud / EC2",
    level: "Working knowledge",
    glyph: "aws",
  },
  {
    id: "sonarqube",
    name: "SONARQUBE",
    category: "DevSecOps",
    description: "Code Quality / SAST",
    level: "Working knowledge",
    glyph: "sonarqube",
  },
  {
    id: "trivy",
    name: "TRIVY",
    category: "DevSecOps",
    description: "Container Security",
    level: "Working knowledge",
    glyph: "trivy",
  },
  {
    id: "owasp-zap",
    name: "OWASP ZAP",
    category: "DevSecOps",
    description: "DAST Security",
    level: "Working knowledge",
    glyph: "zap",
  },
  {
    id: "github",
    name: "GITHUB",
    category: "Version Control",
    description: "Source Control",
    level: "Working knowledge",
    glyph: "github",
  },
];

export interface SkillCategory {
  index: string;
  title: string;
  items: Skill[];
}

const mk = (
  id: string,
  name: string,
  category: string,
  description: string,
  level: SkillLevel,
  glyph: string
): Skill => ({ id, name, category, description, level, glyph });

export const skillCategories: SkillCategory[] = [
  {
    index: "01",
    title: "AUTOMATION",
    items: [
      mk("jenkins-2", "Jenkins", "Automation", "CI/CD pipelines", "Working knowledge", "jenkins"),
      mk("git", "Git", "Automation", "Version control", "Working knowledge", "git"),
      mk("github-2", "GitHub", "Automation", "Source hosting", "Working knowledge", "github"),
      mk("maven", "Maven", "Automation", "Build & dependency management", "Working knowledge", "maven"),
      mk("shell", "Shell Scripting", "Automation", "Task scripting", "Basics", "terminal"),
    ],
  },
  {
    index: "02",
    title: "CONTAINERS",
    items: [
      mk("docker-2", "Docker", "Containers", "Image build & runtime", "Working knowledge", "docker"),
      mk("compose", "Docker Compose", "Containers", "Multi-container apps", "Working knowledge", "docker"),
      mk("k8s-2", "Kubernetes", "Containers", "Orchestration", "Basics", "kubernetes"),
    ],
  },
  {
    index: "03",
    title: "CLOUD",
    items: [
      mk("ec2", "AWS EC2", "Cloud", "Compute instances", "Working knowledge", "aws"),
      mk("iam", "IAM", "Cloud", "Access management", "Basics", "aws"),
      mk("ecr", "Amazon ECR", "Cloud", "Container registry", "Working knowledge", "aws"),
    ],
  },
  {
    index: "04",
    title: "DEVSECOPS",
    items: [
      mk("sonarqube-2", "SonarQube", "DevSecOps", "Static analysis (SAST)", "Working knowledge", "sonarqube"),
      mk("trivy-2", "Trivy", "DevSecOps", "Vulnerability scanning", "Working knowledge", "trivy"),
      mk("zap-2", "OWASP ZAP", "DevSecOps", "Dynamic analysis (DAST)", "Working knowledge", "zap"),
    ],
  },
  {
    index: "05",
    title: "SYSTEMS",
    items: [
      mk("linux", "Linux (Ubuntu)", "Systems", "Server administration", "Working knowledge", "terminal"),
      mk("windows", "Windows", "Systems", "Desktop environment", "Working knowledge", "terminal"),
      mk("networking", "Networking Fundamentals", "Systems", "Core concepts", "Basics", "network"),
    ],
  },
];

export const additionalConcepts = [
  "DevOps",
  "CI/CD Pipelines",
  "Containerization",
  "Automation",
  "Software Deployment",
  "Jira",
  "Java (Basics)",
];
