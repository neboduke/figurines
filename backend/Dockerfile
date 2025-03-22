# Build Stage
FROM maven:3.8.4-openjdk-17-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml /app/pom.xml
COPY src /app/src

# Build the application (this will compile the project and create the JAR file)
RUN mvn clean package -DskipTests

# Offizielles Tomcat-Image als Basis nutzen
FROM tomcat:9.0

# Entferne die Standard-Tomcat-Webapps (optional)
RUN rm -rf /usr/local/tomcat/webapps/*

# Kopiere die WAR-Datei in das Webapps-Verzeichnis von Tomcat
COPY --from=build /app/target/figurines-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Exponiere den Tomcat-Port
EXPOSE 8080

# Starte Tomcat
ENV CATALINA_OPTS="-Xms256m -Xmx512m"
CMD ["catalina.sh", "run"]

