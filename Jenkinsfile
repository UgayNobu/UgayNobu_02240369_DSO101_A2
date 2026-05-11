pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
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
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
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
