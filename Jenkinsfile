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
                // Estrategia simplificada para Jenkins GUI
                sh '''
                    # Detener y remover contenedor existente de manera forzada
                    docker stop school-cafeteria-api >/dev/null 2>&1 || echo "No hay contenedor corriendo"
                    docker rm -f school-cafeteria-api >/dev/null 2>&1 || echo "No hay contenedor que remover"
                    
                    # Limpiar imágenes huérfanas
                    docker container prune -f >/dev/null 2>&1 || true
                    
                    # Esperar para asegurar limpieza
                    sleep 5
                    
                    # Ejecutar nuevo contenedor con reinicio automático
                    docker run -d --name school-cafeteria-api --restart unless-stopped -p 3000:3000 school-cafeteria-api:latest
                    
                    # Verificar que el contenedor esté corriendo
                    sleep 3
                    docker ps | grep school-cafeteria-api || (echo "Error: El contenedor no se inició correctamente" && exit 1)
                '''
                
                echo 'Aplicación desplegada exitosamente en http://localhost:3000'
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
