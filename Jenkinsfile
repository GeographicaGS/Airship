pipeline {
  environment {
    NPM_TOKEN = credentials("npm")
    CRED = credentials("airship_www")
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
        sh "docker run --rm -i -v \$(pwd)/airship:/usr/src/app  -e \"NPM_TOKEN=${NPM_TOKEN}\" geographica/airship_www echo \"//registry.npmjs.org/:_authToken=$NPM_TOKEN\" > ~/.npmrc &&  npm publish --access=public"
      }
      post {
       failure {
         echo "Pipeline is done"
         // notify users when the Pipeline fails
         //mail to: 'build@geographica.gs',
         //subject: "Failed Real Madrid ${env.BRANCH_NAME}: ${currentBuild.fullDisplayName}",
         //body: "Something is wrong with ${env.BUILD_URL}"
       }
     }
    }
    stage("Deploy") {
      when {
          anyOf {
              branch 'master';
          }
      }
      steps {
        sh "docker run -i --rm  -v \$(pwd)/dist:/usr/src/app/dist geographica/airship_www ng build -op dist/dist --locale es"
        sh "cp deploy_demo/s3_website.yml s3_website.yml"
        sh "docker run --rm -i -v \$(pwd):/usr/src/app  -e \"S3_WEBSITE_ID=${CRED_USR}\" -e \"S3_WEBSITE_SECRET=${CRED_PSW}\" geographica/s3_website cfg apply"
        sh "docker run --rm -i -v \$(pwd):/usr/src/app  -e \"S3_WEBSITE_ID=${CRED_USR}\" -e \"S3_WEBSITE_SECRET=${CRED_PSW}\" geographica/s3_website push"
        sh "rm s3_website.yml"
      }
      post {
       failure {
         echo "Pipeline is done"
         // notify users when the Pipeline fails
         mail to: 'build@geographica.gs',
         subject: "Failed Airship: ${currentBuild.fullDisplayName}",
         body: "Something is wrong"
       }
     }
    }
  }
}
