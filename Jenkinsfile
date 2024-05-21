pipeline {
    agent any

    stages {
        stage('Build backend') {

            steps {
                script {
                    dockerComposeBuild = "docker-compose build backend"
                    
                    sh dockerComposeBuild
                }
            }
        }

        stage('Build frontend') {
              
            steps {
                script {
                    dockerComposeBuild = "docker-compose build frontend"
                    
                    sh dockerComposeBuild
                }
            }
        }        
        
        stage('Run containers') {

            steps {
                script {
                    dockerComposeUp = "docker-compose up -d"
                    
                    sh dockerComposeUp
                }
            }
        }

        stage('Load NLP Model') {

            steps {
                script {
                    sh "docker-compose exec -T backend python3 startup.py"
                }
            }
        }                
    }
}