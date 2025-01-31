pipeline {
    agent none
    
    stages {
        
        stage("BE") {
            agent any

            steps {
                script {
                    load 'be/Jenkinsfile'
                }
            }
        }
        stage('FE') {
            agent any
            steps {
                script {
                    load 'fe/Jenkinsfile'
                }
            }
        }
    }
}
