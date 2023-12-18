# Simple js dockerized app for devops class
HOW TO USE

# Build and run MongoDB container
docker run --name bestDb -p 27017:27017 -v $(pwd)/mongo-data:/data/db --network bestNetwork -d mongo

# Build and run Node.js application container
docker build -t bestapp -f app/Dockerfile app
docker run --name bestApp -p 3000:3000 -v $(pwd)/app/public:/app/public --link bestDb --network bestNetwork -d bestapp

# Build and run NGINX container
docker build -t bestnginx -f nginx/Dockerfile nginx
docker run --name bestNginx -p 80:80 -v $(pwd)/nginx/default.conf:/etc/nginx/conf.d/default.conf --link bestApp --network bestNetwork -d bestnginx
