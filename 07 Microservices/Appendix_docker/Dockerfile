# Use an existing docker image as a base
FROM alpine

# Step 2: Download and install dependency (apk is the Alpine Linux package manager.)
RUN apk add --update gcc
RUN apk add --update redis

# Step 3: Tell the image what to do when it starts as container
CMD ["redis-server"]
