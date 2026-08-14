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

        // ============================================================
        // CHECKOUT
        // ============================================================

        stage('Checkout') {

            steps {

                echo '========== CHECKOUT =========='
                echo 'Checking out source code from GitHub...'

                checkout scm

                echo 'GitHub checkout completed successfully.'
            }
        }


        // ============================================================
        // INSTALL DEPENDENCIES
        // ============================================================

        stage('Install Dependencies') {

            steps {

                echo '========== INSTALL DEPENDENCIES =========='
                echo 'Installing project dependencies...'

                sh 'node --version'
                sh 'npm --version'

                sh 'npm ci'

                echo 'Dependencies installed successfully.'
            }
        }


        // ============================================================
        // LINT
        // ============================================================

        stage('Lint') {

            steps {

                echo '========== LINT =========='
                echo 'Running lint...'

                sh 'npm run lint'

                echo 'Lint completed successfully.'
            }
        }


        // ============================================================
        // UNIT TESTS
        // ============================================================

        stage('Unit Tests') {

            steps {

                echo '========== UNIT TESTS =========='
                echo 'Running unit tests...'

                sh 'npm test'

                echo 'Unit tests completed successfully.'
            }

            post {

                always {

                    junit(
                        testResults: '**/test-results/*.xml',
                        allowEmptyResults: true
                    )
                }

                success {
                    echo 'Unit Tests PASSED.'
                }

                failure {
                    echo 'Unit Tests FAILED.'
                }
            }
        }


        // ============================================================
        // SONARQUBE
        // ============================================================

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

                        script {

                            def scannerHome = tool 'sonar-scanner'

                            sh """
                                echo "Using SonarScanner from: ${scannerHome}"

                                ${scannerHome}/bin/sonar-scanner \
                                    -Dsonar.projectBaseDir=. \
                                    -Dsonar.token="\$SONAR_TOKEN"
                            """
                        }
                    }
                }

                echo 'SonarQube analysis completed successfully.'
            }
        }


        // ============================================================
        // QUALITY GATE
        // ============================================================

        stage('Quality Gate') {

            steps {

                echo '========== SONARQUBE QUALITY GATE =========='
                echo 'Waiting for SonarQube Quality Gate result...'

                timeout(time: 3, unit: 'MINUTES') {

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


        // ============================================================
        // PRODUCTION BUILD
        // ============================================================

        stage('Production Build') {

            steps {

                echo '========== PRODUCTION BUILD =========='
                echo 'Creating production build...'

                sh 'npm run build'

                echo 'Production build completed successfully.'
            }
        }


        // ============================================================
        // ARCHIVE BUILD
        // ============================================================

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


    // ================================================================
    // GLOBAL POST ACTIONS
    // ================================================================

    post {

        success {

            echo '=============================================='
            echo '          CI PIPELINE SUCCESS'
            echo '=============================================='
            echo 'Checkout                 : SUCCESS'
            echo 'Dependencies             : SUCCESS'
            echo 'Lint                     : SUCCESS'
            echo 'Unit Tests               : SUCCESS'
            echo 'SonarQube Analysis       : SUCCESS'
            echo 'Quality Gate             : PASSED'
            echo 'Production Build         : SUCCESS'
            echo 'Archive Build            : SUCCESS'
            echo '=============================================='
        }

        failure {

            echo '=============================================='
            echo '          CI PIPELINE FAILED'
            echo '=============================================='
            echo 'One or more stages failed.'
            echo 'Check Jenkins Console Output.'
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