# Offizielles Tomcat-Image als Basis nutzen
FROM tomcat:9.0

# Entferne die Standard-Tomcat-Webapps (optional)
RUN rm -rf /usr/local/tomcat/webapps/*

# Kopiere die WAR-Datei in das Webapps-Verzeichnis von Tomcat
COPY target/figurines-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Exponiere den Tomcat-Port
EXPOSE 8080

# Starte Tomcat
CMD ["catalina.sh", "run"]
