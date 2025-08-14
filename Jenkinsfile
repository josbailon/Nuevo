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

        stage('Test') {
            steps {
                // Dar permisos de ejecución a Jest y ejecutar los tests
                sh 'chmod +x ./node_modules/.bin/jest'
                sh 'npm test'
            }
        }

        stage('Build Docker image') {
            steps {
                // Construye la imagen Docker
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }

        stage('Deploy') {
            steps {
                // Limpiar contenedores anteriores de forma más robusta
                sh '''
                    # Forzar detención y eliminación de cualquier contenedor con este nombre
                    docker ps -a -q --filter "name=school-cafeteria-api" | xargs -r docker stop
                    docker ps -a -q --filter "name=school-cafeteria-api" | xargs -r docker rm -f
                    
                    # Limpiar cualquier proceso usando el puerto 3000 (sin sudo)
                    lsof -ti:3000 | xargs -r kill -9 || true
                    
                    # Esperar un momento para que se libere completamente
                    sleep 3
                '''
                
                // Ejecutar el nuevo contenedor
                sh '''
                    docker run -d --name school-cafeteria-api -p 3000:3000 school-cafeteria-api:latest
                '''
                
                echo 'Aplicación desplegada en http://localhost:3000'
            }
        }

        // Puedes añadir más etapas según lo que necesites
        // Por ejemplo, push a DockerHub, etc.
        /*
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
