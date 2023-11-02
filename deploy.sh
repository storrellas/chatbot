#!/bin/bash
echo "++++++++++++++++++++++++++++++"
echo "Application build"
echo "++++++++++++++++++++++++++++++"
npm run build
echo "++++++++++++++++++++++++++++++"
echo "Generating dashboard.html"
echo "++++++++++++++++++++++++++++++"
cp -rv dashboard.html build/dashboard.html
cd build
JS_PATH=`ls static/js/main.*.js`
CSS_PATH=`ls static/css/*.css`
sed -i "s/JS_PATH/${JS_PATH//\//\\\/}/g" ./dashboard.html
sed -i "s/CSS_PATH/${CSS_PATH//\//\\\/}/g" ./dashboard.html

# Upload to server
echo "++++++++++++++++++++++++++++++"
echo "Uploading to server ..."
echo "++++++++++++++++++++++++++++++"
scp -r * apid:/home/ubuntu/workspace/apid_ui
