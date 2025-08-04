pipeline {
    agent any

    tools {
        nodejs "Node24"
        dockerTool "Dockertool"
    }

    environment {
        // Puedes definir variables de entorno aquí si necesitas
        DOCKER_IMAGE = 'school-cafeteria-api'
    }

    stages {
        stage('Checkout') {
            steps {
                // Descarga el código del repositorio configurado
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Instala todas las dependencias de Node.js
                sh 'npm install'
            }
        }

        stage('Build Docker image') {
            steps {
                // Construye la imagen Docker
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }

        // Puedes añadir más etapas según lo que necesites
        // Por ejemplo, pruebas, push a DockerHub, deploy, etc.
        /*
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Push Docker image') {
            steps {
                sh "docker push $DOCKER_IMAGE"
            }
        }
        */
    }
    // Puedes agregar bloque de post para limpieza o notificaciones
    post {
        always {
            echo 'El pipeline ha terminado (éxito o fallo)'
        }
        success {
            echo '¡Pipeline exitoso!'
        }
        failure {
            echo 'El pipeline falló.'
        }
    }
}
