from markadams/chromium-xvfb-js:7-onbuild
COPY .npmrc /.npmrc
COPY .npmrc .npmrc
RUN npm install -g @angular/cli@1.7.3
RUN npm install -g gulp@3.9.1
