pipeline {
    agent none
   
    stages {
        stage('BE') {
            agent any
            environment {
                DOCKER_NAME_IMAGE = "social-network-be"
            }
            steps {
                sh 'cd be'
                script {
                    def branchName = env.GIT_BRANCH.replaceFirst(/^origin\//, '')
                    env.ENV_DEPLOY = (branchName == 'master') ? 'prod' : 'dev'
                    env.DOCKER_IMAGE = "ngochuyk8/${ENV_DEPLOY}-${DOCKER_NAME_IMAGE}:${BUILD_ID}"
                }
                script {
                    echo "Docker Tag: ${env.DOCKER_IMAGE}"
                }
                sh "cd be && docker build -t ${env.DOCKER_IMAGE} ."
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
                    sh "docker push ${env.DOCKER_IMAGE}"
                }
                // Clean to save disk space
                sh "docker image rm ${env.DOCKER_IMAGE}"
                script {
                    withCredentials([string(credentialsId: 'GithubSecret', variable: 'TOKEN')]) {
                        sh 'rm -rf devops'
                        sh 'git clone https://${TOKEN}@github.com/ngochuyk812/devops.git'
                        sh 'cd devops && ls -la'
                    }
                }
                script {
                    sh 'cd devops && ls -la'
                    echo "Deleting the K8s...: ngochuyk8/${env.BRANCH_NAME}/${DOCKER_NAME_IMAGE}:${BUILD_ID}"
                    def pipelineK8s = load 'devops/Jenkinsfile'
                    pipelineK8s.run("${DOCKER_NAME_IMAGE}", DOCKER_IMAGE, 'devops', ".net", env.ENV_DEPLOY) 
                }



            }
        }
        stage('FE') {
            agent any
            environment {
                DOCKER_NAME_IMAGE = "social-network-fe"
            }
            steps {
                sh 'cd fe'
                script {
                    def branchName = env.GIT_BRANCH.replaceFirst(/^origin\//, '')
                    env.ENV_DEPLOY = (branchName == 'master') ? 'prod' : 'dev'
                    env.DOCKER_IMAGE = "ngochuyk8/${ENV_DEPLOY}-${DOCKER_NAME_IMAGE}:${BUILD_ID}"
                }
                script {
                    echo "Docker Tag: ${env.DOCKER_IMAGE}"
                }
                sh "cd fe && docker build -t ${env.DOCKER_IMAGE} ."
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
                    sh "docker push ${env.DOCKER_IMAGE}"
                }
                // Clean to save disk space
                sh "docker image rm ${env.DOCKER_IMAGE}"
                script {
                    withCredentials([string(credentialsId: 'GithubSecret', variable: 'TOKEN')]) {
                        sh 'rm -rf devops'
                        sh 'git clone https://${TOKEN}@github.com/ngochuyk812/devops.git'
                        sh 'cd devops && ls -la'
                    }
                }
                script {
                    sh 'cd devops && ls -la'
                    
                    echo "Deleting the K8s...: ngochuyk8/${env.BRANCH_NAME}/${DOCKER_NAME_IMAGE}:${BUILD_ID}"
                    def pipelineK8s = load 'devops/Jenkinsfile'
                    pipelineK8s.run("${DOCKER_NAME_IMAGE}", DOCKER_IMAGE, 'devops', ".net", env.ENV_DEPLOY) 
                }



            }
        }
    }
}
