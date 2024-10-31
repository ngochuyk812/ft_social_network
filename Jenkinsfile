pipeline {
    agent none
    stages {
        stage("Build") {
            agent any
            steps {
                echo 'Removing existing containers if they exist...'
                sh """
                docker-compose down
                """
                echo 'Setting permissions for default.conf...'
                sh """
                chmod 777 ./nginx/default.conf
                """
                echo 'Building Docker images...'
                sh """
                docker-compose build
                """
                sh "docker image ls"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            agent any 
            steps {
                script {
                    echo 'Running the containers...'
                    sh """
                    docker-compose up -d
                    """
                }
            }
        }
    }
}