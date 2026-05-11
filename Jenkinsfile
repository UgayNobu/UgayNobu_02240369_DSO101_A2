pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/UgayNobu/UgayNobu_02240369_DSO101_A2.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm install'
                }
                dir('todo-app/frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm run build'
                }
                dir('todo-app/backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    junit 'todo-app/backend/junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(
                    credentialsId: 'docker-hub-creds',
                    variable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u ugaynobu --password-stdin
                        docker build -t ugaynobu/be-todo:02240369 todo-app/backend
                        docker push ugaynobu/be-todo:02240369
                        docker build -t ugaynobu/fe-todo:02240369 todo-app/frontend
                        docker push ugaynobu/fe-todo:02240369
                        docker logout
                    '''
                }
            }
        }
    }
}
