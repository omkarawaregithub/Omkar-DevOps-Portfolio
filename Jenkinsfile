pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    tools {
        nodejs 'nodejs'
    }

    environment {
        CI = 'true'
        SONARQUBE_TOKEN = credentials('sonarqube-token')
        SONAR_HOST_URL = credentials('sonarqube-host-url')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '========== CHECKOUT =========='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========== INSTALL DEPENDENCIES =========='
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo '========== LINT =========='
                sh 'npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                echo '========== UNIT TESTS =========='
                sh 'npm test'
            }
        }

        stage('Gitleaks Scan') {
            steps {
                echo '========== GITLEAKS SECRET SCANNING =========='
                script {
                    try {
                        sh '''
                            if command -v gitleaks &> /dev/null; then
                                echo "Using system-installed Gitleaks..."
                                gitleaks detect --source . --verbose
                            else
                                echo "Using Gitleaks Docker image..."
                                docker run --rm -v ${WORKSPACE}:/repo zricethezav/gitleaks:latest detect --source /repo --verbose
                            fi
                        '''
                    } catch (Exception e) {
                        echo "Gitleaks scan failed: Potential secrets detected!"
                        currentBuild.result = 'FAILURE'
                        error("Gitleaks detected potential secrets. Please review and remove any hardcoded credentials.")
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '========== SONARQUBE ANALYSIS =========='
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectBaseDir=. \
                            -Dsonar.token=${SONARQUBE_TOKEN}
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo '========== SONARQUBE QUALITY GATE =========='
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            echo "Quality Gate Status: ${qg.status}"
                            currentBuild.result = 'FAILURE'
                            error("SonarQube Quality Gate failed. Check SonarQube dashboard for details.")
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo '========== BUILD =========='
                sh 'npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                echo '========== ARCHIVE BUILD =========='
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '========== CI PIPELINE SUCCESS =========='
            echo 'Production build completed successfully.'
            echo 'Artifacts available for download.'
        }

        failure {
            echo '========== CI PIPELINE FAILED =========='
            echo 'Check the stage logs above for details.'
        }

        always {
            echo '========== CI PIPELINE EXECUTION COMPLETED =========='
            cleanWs()
        }
    }
}
