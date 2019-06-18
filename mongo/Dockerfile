FROM mongo:latest
# Copy the data files into the container
COPY ./data.gz /data.gz

# Run the mongoimport command to import the starting data, once for each collection
CMD mongorestore --host mongo --drop --gzip --archive=/data.gz
