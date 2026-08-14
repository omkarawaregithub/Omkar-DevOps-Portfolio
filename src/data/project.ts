export interface PipelineStage {
  id: string;
  label: string;
  sub: string;
  glyph: string;
}

export const pipelineStages: PipelineStage[] = [
  { id: "github", label: "GitHub", sub: "Source checkout via webhook", glyph: "github" },
  { id: "jenkins", label: "Jenkins", sub: "Pipeline orchestration", glyph: "jenkins" },
  { id: "maven", label: "Maven Build", sub: "Compile & package", glyph: "maven" },
  { id: "test", label: "Testing", sub: "Automated test execution", glyph: "test" },
  { id: "sonarqube", label: "SonarQube", sub: "Static analysis (SAST)", glyph: "sonarqube" },
  { id: "trivy", label: "Trivy", sub: "Image vulnerability scan", glyph: "trivy" },
  { id: "docker", label: "Docker", sub: "Containerize application", glyph: "docker" },
  { id: "ecr", label: "Amazon ECR", sub: "Push versioned image", glyph: "aws" },
  { id: "zap", label: "OWASP ZAP", sub: "Dynamic analysis (DAST)", glyph: "zap" },
  { id: "deploy", label: "Deployment", sub: "Release to environment", glyph: "deploy" },
];

export const projectHighlights: string[] = [
  "Automated source code checkout, Maven build, testing, and application packaging using Jenkins.",
  "Integrated SonarQube for Static Application Security Testing (SAST).",
  "Integrated Trivy for container vulnerability scanning.",
  "Integrated OWASP ZAP for Dynamic Application Security Testing (DAST).",
  "Containerized the application using Docker.",
  "Securely pushed versioned images to Amazon ECR.",
  "Implemented GitHub webhooks to trigger automated CI/CD pipeline execution.",
];

export const projectMeta = {
  title: "Automated Maven DevSecOps Pipeline with OWASP ZAP",
  description:
    "Designed and implemented an end-to-end DevSecOps CI/CD pipeline for a Maven-based Spring Boot application using Jenkins, Git, Docker, SonarQube, Trivy, OWASP ZAP, and Amazon ECR.",
};
