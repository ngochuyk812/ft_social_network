pipeline {
    agent none
    stages {
        stage("Build") {
            agent any
            steps {
                echo 'Removing existing containers if they exist...'
                sh """
                docker-compose down || exit 1
                """
                
                echo 'Checking existence of default.conf...'
                sh "ls -l ./nginx/default.conf"
                
                echo 'Setting permissions for default.conf...'
                sh """
                chmod 644 ./nginx/default.conf
                """
                
                echo 'Building Docker images...'
                sh """
                docker-compose build --no-cache || exit 1
                """
                
                echo 'Listing Docker images...'
                sh "docker image ls"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // Thêm bước kiểm tra thực tế nếu cần
            }
        }
        stage('Deploy') {
            agent any 
            steps {
                script {
                    echo 'Running the containers...'
                    sh """
                    docker-compose up -d || exit 1
                    """
                }
            }
        }
    }
}
