pipeline {
    agent none
    
    stages {
        
        stage("BE") {
            agent any

            steps {
                script {
                    def be = load 'be/Jenkinsfile'
                    be.stage()
                }
            }
        }
        stage('FE') {
            agent any
            steps {
                script {
                    def fe = load 'fe/Jenkinsfile'
                    fe.stage()
                }
            }
        }
    }
}
