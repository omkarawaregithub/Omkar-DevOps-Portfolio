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

        // SonarQube
        SCANNER_HOME = tool 'sonar-scanner'

        // AWS / ECR
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '931680509142.dkr.ecr.ap-south-1.amazonaws.com'
        IMAGE_NAME = '931680509142.dkr.ecr.ap-south-1.amazonaws.com/omkar-portfolio'

        // Build image tag
        FULL_IMAGE = "${IMAGE_NAME}:${BUILD_NUMBER}"

        // OWASP Dependency Check
        DEPENDENCY_CHECK = 'dp-check'

        // Trivy HTML template
        TRIVY_TEMPLATE = '/opt/trivy/html.tpl'

        // Deployed application URL
        DAST_TARGET = 'http://3.109.185.240:8081'
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
                echo 'Running ESLint/Oxlint...'

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
        // OWASP DEPENDENCY CHECK
        // ============================================================

        stage('OWASP Dependency Check') {

            steps {

                echo '========== OWASP DEPENDENCY CHECK =========='
                echo 'Scanning project dependencies for known vulnerabilities...'

                dependencyCheck(
                    odcInstallation: 'dp-check',
                    additionalArguments: '--scan . --format ALL --nvdApiDelay 5000'
                )
            }

            post {

                always {

                    echo 'Publishing OWASP Dependency-Check report...'

                    dependencyCheckPublisher(
                        pattern: '**/dependency-check-report.xml'
                    )

                    publishHTML(
                        target: [
                            reportName: 'OWASP Dependency-Check Report',
                            reportDir: '.',
                            reportFiles: 'dependency-check-report.html',
                            keepAll: true,
                            allowMissing: true,
                            alwaysLinkToLastBuild: true
                        ]
                    )
                }
            }
        }


        // ============================================================
        // TRIVY FILESYSTEM SCAN
        // ============================================================

        stage('Trivy File System Scan') {

            steps {

                echo '========== TRIVY FILE SYSTEM SCAN =========='
                echo 'Scanning project filesystem for vulnerabilities...'

                sh """
                    trivy fs \
                    --format template \
                    --template "@${TRIVY_TEMPLATE}" \
                    -o trivy-file-scan-report.html .
                """

                sh """
                    trivy fs \
                    --format table \
                    -o trivy-file-scan-report.txt .
                """

                echo 'Trivy filesystem scan completed.'
            }

            post {

                always {

                    publishHTML(
                        target: [
                            reportName: 'Trivy File System Scan Report',
                            reportDir: '.',
                            reportFiles: 'trivy-file-scan-report.html',
                            keepAll: true,
                            allowMissing: true,
                            alwaysLinkToLastBuild: true
                        ]
                    )

                    archiveArtifacts(
                        artifacts: 'trivy-file-scan-report.html,trivy-file-scan-report.txt',
                        fingerprint: true,
                        allowEmptyArchive: true
                    )
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


        // ============================================================
        // DOCKER BUILD
        // ============================================================

        stage('Build Docker Image') {

            steps {

                echo '========== BUILD DOCKER IMAGE =========='

                script {

                    echo "Building Docker image:"
                    echo "${FULL_IMAGE}"

                    sh """
                        docker build \
                        -t ${FULL_IMAGE} \
                        .
                    """

                    echo 'Docker image built successfully.'
                }
            }
        }


        // ============================================================
        // TRIVY IMAGE SCAN
        // ============================================================

        stage('Trivy Image Scan') {

            steps {

                echo '========== TRIVY IMAGE SCAN =========='
                echo "Scanning Docker image: ${FULL_IMAGE}"

                sh """
                    trivy image \
                    --format template \
                    --template "@${TRIVY_TEMPLATE}" \
                    -o trivy-image-scan-report.html \
                    ${FULL_IMAGE}
                """

                sh """
                    trivy image \
                    --format table \
                    -o trivy-image-scan-report.txt \
                    ${FULL_IMAGE}
                """

                echo 'Trivy Docker image scan completed.'
            }

            post {

                always {

                    publishHTML(
                        target: [
                            reportName: 'Trivy Image Scan Report',
                            reportDir: '.',
                            reportFiles: 'trivy-image-scan-report.html',
                            keepAll: true,
                            allowMissing: true,
                            alwaysLinkToLastBuild: true
                        ]
                    )

                    archiveArtifacts(
                        artifacts: 'trivy-image-scan-report.html,trivy-image-scan-report.txt',
                        fingerprint: true,
                        allowEmptyArchive: true
                    )
                }
            }
        }


        // ============================================================
        // LOGIN TO ECR
        // ============================================================

        stage('Login to ECR') {

            steps {

                echo '========== LOGIN TO AWS ECR =========='

                sh """
                    aws ecr get-login-password \
                    --region ${AWS_REGION} | \
                    docker login \
                    --username AWS \
                    --password-stdin ${ECR_REGISTRY}
                """

                echo 'Successfully logged in to AWS ECR.'
            }
        }


        // ============================================================
        // PUSH IMAGE TO ECR
        // ============================================================

        stage('Push Image to ECR') {

            steps {

                echo '========== PUSH IMAGE TO ECR =========='
                echo "Pushing image: ${FULL_IMAGE}"

                sh """
                    docker push ${FULL_IMAGE}
                """

                echo 'Docker image pushed successfully to ECR.'
            }
        }


        // ============================================================
        // DEPLOY
        // ============================================================

        stage('Deploy to Container') {

            steps {

                echo '========== DEPLOY TO CONTAINER =========='
                echo 'Deploying application using Docker Compose...'

                script {

                    withEnv([
                        "FULL_IMAGE=${FULL_IMAGE}"
                    ]) {

                        sh '''
                            docker compose down || true
                            docker compose up -d
                        '''
                    }
                }

                echo 'Application deployed successfully.'
            }
        }


        // ============================================================
        // OWASP ZAP DAST
        // ============================================================

        stage('DAST Scan with OWASP ZAP') {

            steps {

                echo '========== OWASP ZAP DAST SCAN =========='
                echo 'Running Dynamic Application Security Testing...'

                script {

                    def exitCode = sh(
                        script: """
                            docker run --rm \
                            --user root \
                            --network host \
                            -v \$(pwd):/zap/wrk:rw \
                            ghcr.io/zaproxy/zaproxy:stable \
                            zap-baseline.py \
                            -t ${DAST_TARGET} \
                            -r zap_report.html \
                            -J zap_report.json || true
                        """,
                        returnStatus: true
                    )

                    echo "ZAP scan completed with exit code: ${exitCode}"

                    publishHTML(
                        target: [
                            reportName: 'OWASP ZAP DAST Report',
                            reportDir: '.',
                            reportFiles: 'zap_report.html',
                            keepAll: true,
                            allowMissing: true,
                            alwaysLinkToLastBuild: true
                        ]
                    )

                    if (exitCode != 0) {

                        echo 'ZAP detected warnings or findings.'
                        echo 'Review the ZAP report in Jenkins.'
                    }
                    else {

                        echo 'OWASP ZAP scan completed successfully.'
                    }
                }
            }

            post {

                always {

                    archiveArtifacts(
                        artifacts: 'zap_report.html,zap_report.json',
                        fingerprint: true,
                        allowEmptyArchive: true
                    )
                }
            }
        }
    }


    // ================================================================
    // GLOBAL POST ACTIONS
    // ================================================================

    post {

        success {

            echo '=============================================='
            echo '          DEVSECOPS PIPELINE SUCCESS'
            echo '=============================================='
            echo 'Checkout                 : SUCCESS'
            echo 'Dependencies             : SUCCESS'
            echo 'Lint                     : SUCCESS'
            echo 'Unit Tests               : SUCCESS'
            echo 'SonarQube Analysis       : SUCCESS'
            echo 'Quality Gate             : PASSED'
            echo 'OWASP Dependency Check   : COMPLETED'
            echo 'Trivy FS Scan            : COMPLETED'
            echo 'Production Build         : SUCCESS'
            echo 'Docker Build             : SUCCESS'
            echo 'Trivy Image Scan         : COMPLETED'
            echo 'ECR Push                 : SUCCESS'
            echo 'Deployment               : SUCCESS'
            echo 'OWASP ZAP DAST           : COMPLETED'
            echo '=============================================='
        }

        failure {

            echo '=============================================='
            echo '          DEVSECOPS PIPELINE FAILED'
            echo '=============================================='
            echo 'One or more stages failed.'
            echo 'Check Jenkins Console Output and Security Reports.'
            echo '=============================================='
        }

        always {

            echo '=============================================='
            echo '       PIPELINE EXECUTION COMPLETED'
            echo '=============================================='

            script {

                def buildStatus = currentBuild.currentResult
                def buildUrl = env.BUILD_URL

                try {

                    emailext(
                        subject: "DevSecOps Pipeline ${buildStatus}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                        body: """
                            <html>
                            <body>

                            <h2>Omkar Aware - DevSecOps Pipeline</h2>

                            <p>
                                <b>Build Status:</b>
                                ${buildStatus}
                            </p>

                            <p>
                                <b>Project:</b>
                                ${env.JOB_NAME}
                            </p>

                            <p>
                                <b>Build Number:</b>
                                ${env.BUILD_NUMBER}
                            </p>

                            <p>
                                <b>Build URL:</b>
                                <a href="${buildUrl}">
                                    ${buildUrl}
                                </a>
                            </p>

                            <h3>Pipeline Stages</h3>

                            <ul>
                                <li>Git Checkout</li>
                                <li>Dependency Installation</li>
                                <li>Lint</li>
                                <li>Unit Testing</li>
                                <li>SonarQube Analysis</li>
                                <li>SonarQube Quality Gate</li>
                                <li>OWASP Dependency Check</li>
                                <li>Trivy Filesystem Scan</li>
                                <li>Production Build</li>
                                <li>Docker Image Build</li>
                                <li>Trivy Image Scan</li>
                                <li>AWS ECR Push</li>
                                <li>Docker Compose Deployment</li>
                                <li>OWASP ZAP DAST</li>
                            </ul>

                            <p>
                                Security reports are attached when available.
                            </p>

                            </body>
                            </html>
                        """,

                        to: 'omkaraware1301@gmail.com',
                        from: 'omkaraware1301@gmail.com',
                        mimeType: 'text/html',

                        attachmentsPattern:
                            'zap_report.html,' +
                            'trivy-file-scan-report.html,' +
                            'trivy-image-scan-report.html,' +
                            'dependency-check-report.html'
                    )

                }
                catch (Exception e) {

                    echo "Email notification failed: ${e.getMessage()}"
                }
            }

            cleanWs()
        }
    }
}