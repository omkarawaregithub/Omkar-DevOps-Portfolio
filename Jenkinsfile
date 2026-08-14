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
                echo 'Installing project dependencies...'

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

        stage('SonarQube Analysis') {
            steps {
                echo '========== SONARQUBE ANALYSIS =========='
                echo 'Starting SonarQube code analysis...'

                withSonarQubeEnv('sonar-server') {

                    withCredentials([
                        string(
                            credentialsId: 'sonarqubq-token',
                            variable: 'SONAR_TOKEN'
                        )
                    ]) {

                        sh '''
                            if ! command -v sonar-scanner >/dev/null 2>&1; then
                                echo "ERROR: sonar-scanner is not available."
                                echo "Configure SonarScanner under Jenkins Tools."
                                exit 1
                            fi

                            sonar-scanner \
                                -Dsonar.projectBaseDir=. \
                                -Dsonar.token="$SONAR_TOKEN"
                        '''
                    }
                }

                echo 'SonarQube analysis completed.'
            }
        }

        stage('Quality Gate') {
            steps {
                echo '========== SONARQUBE QUALITY GATE =========='
                echo 'Waiting for SonarQube Quality Gate result...'

                timeout(time: 5, unit: 'MINUTES') {

                    script {

                        def qualityGate = waitForQualityGate()

                        echo "Quality Gate Status: ${qualityGate.status}"

                        if (qualityGate.status != 'OK') {
                            error(
                                "SonarQube Quality Gate failed: ${qualityGate.status}"
                            )
                        }

                        echo 'SonarQube Quality Gate PASSED.'
                    }
                }
            }
        }

        stage('Production Build') {
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
                echo 'Archiving dist directory...'

                archiveArtifacts(
                    artifacts: 'dist/**',
                    fingerprint: true
                )

                echo 'Production build archived successfully.'
            }
        }
    }

    post {

        success {
            echo '=============================================='
            echo '          CI PIPELINE SUCCESS'
            echo '=============================================='
            echo 'Checkout              : SUCCESS'
            echo 'Dependencies          : SUCCESS'
            echo 'Lint                  : SUCCESS'
            echo 'Unit Tests            : SUCCESS'
            echo 'SonarQube Analysis    : SUCCESS'
            echo 'Quality Gate          : PASSED'
            echo 'Production Build      : SUCCESS'
            echo 'Artifacts             : ARCHIVED'
            echo '=============================================='
            echo 'Portfolio CI pipeline completed successfully.'
            echo '=============================================='
        }

        failure {
            echo '=============================================='
            echo '          CI PIPELINE FAILED'
            echo '=============================================='
            echo 'One or more stages failed.'
            echo 'Please check the Jenkins console output.'
            echo '=============================================='
        }

        always {
            echo '=============================================='
            echo '       PIPELINE EXECUTION COMPLETED'
            echo '=============================================='

            cleanWs()
        }
    }
}