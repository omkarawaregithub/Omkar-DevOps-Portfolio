pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    tools {
        nodejs 'node20'
        // Make sure "nodejs" exists under:
        // Manage Jenkins → Tools → NodeJS installations
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '========== CHECKOUT =========='
                echo 'Checking out source code from GitHub...'

                checkout scm

                echo 'GitHub checkout completed successfully.'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========== INSTALL DEPENDENCIES =========='
                echo 'Installing npm dependencies using npm ci...'

                sh 'npm ci'

                echo 'Dependencies installed successfully.'
            }
        }

        stage('Lint') {
            steps {
                echo '========== LINT =========='
                echo 'Running ESLint...'

                sh 'npm run lint'

                echo 'Lint completed successfully.'
            }
        }

        stage('Unit Tests') {
            steps {
                echo '========== UNIT TESTS =========='
                echo 'Running unit tests...'

                sh 'npm test'

                echo 'Unit tests completed successfully.'
            }
        }

        stage('Gitleaks Scan') {
            steps {
                echo '========== GITLEAKS SECRET SCANNING =========='
                echo 'Scanning source code for exposed secrets...'

                script {
                    try {

                        sh '''
                            if command -v gitleaks >/dev/null 2>&1; then

                                echo "Gitleaks found on Jenkins agent."
                                echo "Using system-installed Gitleaks..."

                                gitleaks detect \
                                    --source . \
                                    --verbose \
                                    --redact

                            elif command -v docker >/dev/null 2>&1; then

                                echo "Gitleaks not found locally."
                                echo "Using Gitleaks Docker image..."

                                docker run --rm \
                                    -v "$WORKSPACE:/repo" \
                                    ghcr.io/gitleaks/gitleaks:latest \
                                    detect \
                                    --source /repo \
                                    --verbose \
                                    --redact

                            else

                                echo "ERROR: Neither Gitleaks nor Docker is available."
                                exit 1

                            fi
                        '''

                    } catch (Exception e) {

                        echo 'Gitleaks scan failed!'
                        echo 'Potential secrets were detected.'
                        echo 'Please review the Gitleaks output.'

                        error(
                            'Gitleaks detected potential secrets. Pipeline stopped.'
                        )
                    }
                }

                echo 'Gitleaks scan completed successfully.'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '========== SONARQUBE ANALYSIS =========='
                echo 'Starting SonarQube static code analysis...'

                withSonarQubeEnv('SonarQube') {

                    withCredentials([
                        string(
                            credentialsId: 'sonarqube-token',
                            variable: 'SONAR_TOKEN'
                        )
                    ]) {

                        sh '''
                            if ! command -v sonar-scanner >/dev/null 2>&1; then
                                echo "ERROR: sonar-scanner is not installed/configured."
                                exit 1
                            fi

                            sonar-scanner \
                                -Dsonar.projectBaseDir=. \
                                -Dsonar.token="$SONAR_TOKEN"
                        '''
                    }
                }

                echo 'SonarQube analysis submitted successfully.'
            }
        }

        stage('Quality Gate') {
            steps {
                echo '========== SONARQUBE QUALITY GATE =========='
                echo 'Waiting for SonarQube Quality Gate result...'

                script {

                    timeout(time: 5, unit: 'MINUTES') {

                        def qualityGate = waitForQualityGate()

                        echo "Quality Gate Status: ${qualityGate.status}"

                        if (qualityGate.status != 'OK') {

                            error(
                                "SonarQube Quality Gate failed: ${qualityGate.status}"
                            )

                        } else {

                            echo 'SonarQube Quality Gate PASSED.'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo '========== PRODUCTION BUILD =========='
                echo 'Creating production build...'

                sh 'npm run build'

                echo 'Production build completed successfully.'
            }
        }

        stage('Archive Build') {
            steps {
                echo '========== ARCHIVE BUILD =========='
                echo 'Archiving production build artifacts...'

                archiveArtifacts(
                    artifacts: 'dist/**',
                    fingerprint: true
                )

                echo 'Production artifacts archived successfully.'
            }
        }
    }

    post {

        success {
            echo '=============================================='
            echo '           CI PIPELINE SUCCESS'
            echo '=============================================='
            echo 'GitHub checkout       : SUCCESS'
            echo 'Dependencies          : SUCCESS'
            echo 'Lint                  : SUCCESS'
            echo 'Unit Tests            : SUCCESS'
            echo 'Gitleaks              : PASSED'
            echo 'SonarQube             : PASSED'
            echo 'Quality Gate          : PASSED'
            echo 'Production Build      : SUCCESS'
            echo 'Artifacts              : ARCHIVED'
            echo '=============================================='
            echo 'Production pipeline completed successfully.'
            echo '=============================================='
        }

        failure {
            echo '=============================================='
            echo '           CI PIPELINE FAILED'
            echo '=============================================='
            echo 'One or more pipeline stages failed.'
            echo 'Check the Jenkins console output above.'
            echo '=============================================='
        }

        always {
            echo '=============================================='
            echo '      PIPELINE EXECUTION COMPLETED'
            echo '=============================================='

            cleanWs()
        }
    }
}