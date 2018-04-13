pipeline {
  environment {
    NPM_TOKEN = credentials("npm")
  }
  agent {
    node {
      label 'docker'
    }
  }

  stages {
    stage('Building') {
      steps {
        sh "docker build --pull=true -t geographica/airship_www ."
      }
    }

    stage("publish") {
      when {
          anyOf {
              branch 'master';
          }
      }
      steps {
        sh "docker run -i --rm  -v \$(pwd)/airship:/usr/src/app/airship geographica/airship_www npm run build-airship"

        sh "docker run --rm -i -v \$(pwd)/airship:/usr/src/app  -e \"NPM_TOKEN=${NPM_TOKEN}\" geographica/airship_www npm-publish"
      }
      post {
       failure {
         //echo "Pipeline is done"
         // notify users when the Pipeline fails
         //mail to: 'build@geographica.gs',
         //subject: "Failed Real Madrid ${env.BRANCH_NAME}: ${currentBuild.fullDisplayName}",
         //body: "Something is wrong with ${env.BUILD_URL}"
       }
     }
    }
  }
}
