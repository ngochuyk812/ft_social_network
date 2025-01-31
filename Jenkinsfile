pipeline {
    agent none  // This prevents a default agent allocation at the top level
    
    stages {
        stage("BE") {
            agent any  // Allocating an agent for this stage

            steps {
                script {
                    def be = load 'be/Jenkinsfile'
                    be.stage()  // Assuming 'be.stage()' is a valid method
                }
            }
        }

        stage('FE') {
            agent any  // Allocating an agent for this stage

            steps {
                script {
                    def fe = load 'fe/Jenkinsfile'
                    fe.stage()  // Assuming 'fe.stage()' is a valid method
                }
            }
        }
    }
}
