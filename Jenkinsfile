pipeline {
  agent any
  options { timestamps(); ansiColor('xterm') }

  environment {
    IMAGE_TAG = "${env.BRANCH_NAME == 'master' ? env.BUILD_NUMBER : env.BRANCH_NAME.replaceAll('/','-')}-${env.GIT_COMMIT.take(7)}"
  }

  stages {
    stage('Checkout'){ steps{ checkout scm } }

    stage('Build images'){
      steps { sh 'docker compose build' }
    }

    stage('Tag local images'){
      steps {
        sh '''
          set -eux
          TAG="${IMAGE_TAG}"
          for S in auth-api frontend log-message-processor todos-api users-api; do
            docker tag "$S:latest" "app/$S:$TAG"
          done
          echo "TAG=$TAG" > .image_tag
        '''
        stash includes: '.image_tag', name: 'tag'
      }
    }

    stage('Deploy local (Compose prod)'){
      when { branch 'master' }
      steps {
        unstash 'tag'
        sh '''
          set -eux
          TAG=$(cut -d= -f2 .image_tag)
          export TAG
          bash deploy/local_deploy.sh
        '''
      }
    }
  }
}
