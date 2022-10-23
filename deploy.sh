git pull origin production
cd server
npm install
sudo pm2 start app.js -i max --watch
cd ..
sudo pm2 restart all
