pipeline {
    agent none
    stages {
        stage("Build") {
            agent any
            steps {
                 script {
                    echo 'Getting commit ID...'
                    TAGNAME = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                }
                echo "Using TAGNAME: ${TAGNAME}"

                echo 'Clean data not using...'
                sh """
                docker system prune -f
                """
                echo 'Building Docker images...'
                sh """
                docker build -t ngochuyk8/social-network:${TAGNAME} .
                """
                sh "docker image ls"
                
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'

                    sh """
                    docker push ngochuyk8/social-network:${TAGNAME}
                    """

                }
                sh "docker image rm ngochuyk8/social-network:${TAGNAME}"
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
                   
                }
            }
        }
    }
}