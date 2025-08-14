pipeline {
    agent any

    tools {
        nodejs "Node24"
        dockerTool "Dockertool" 
    }
    
    triggers {
        // Polls the SCM every 2 minutes
        pollSCM('*/2 * * * *')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install' 
            }
        }
        
        stage('Ejecutar Tests') {
            steps {
                sh 'chmod +x ./node_modules/.bin/jest'
                sh 'npm test -- --ci --runInBand'
            }
        }
 
        stage('Build Docker image') {
            steps {
                sh 'docker build -t school-cafeteria-api .'
            }
        }

        stage('Ejecutar Contenedor Node.js') {
            steps {
                sh '''
                    # Detener y eliminar cualquier contenedor previo
                    docker stop school-cafeteria-api || true
                    docker rm school-cafeteria-api || true
 
                    # Ejecutar el contenedor de la aplicación
                    docker run -d --name school-cafeteria-api -p 3000:3000 school-cafeteria-api:latest
                '''
            }
        }
    }
}