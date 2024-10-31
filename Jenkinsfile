pipeline {
    agent none
    environment {
        DOCKER_IMAGE = "ngochuyk8/socical"
    }
    stages {
        stage("Build") {
            agent any
            environment {
                DOCKER_TAG = "${env.GIT_COMMIT.take(8)}"
            }
            steps {
                script {
                    echo "Docker Tag: ${DOCKER_TAG}"
                }
                echo 'Removing existing containers if they exist...'
                sh """
                docker-compose down
                """
                echo 'Building Docker images...'
                sh """
                docker-compose build
                """
                sh "docker image ls | grep ${DOCKER_IMAGE}"
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