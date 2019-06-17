FROM mongo:latest
# Copy the data files into the container
COPY ./employees.json /employees.json
COPY ./departments.json /departments.json

# Run the mongoimport command to import the starting data, once for each collection
CMD mongoimport --host mongo --db struct-graphql --collection employees --drop --file employees.json --jsonArray && \
mongoimport --host mongo --db struct-graphql --collection departments --drop --file /departments.json --jsonArray
