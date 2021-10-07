FROM openjdk:8
EXPOSE 8080
ADD target/lab1.jar lab1.jar
ENTRYPOINT ["java","-jar","/lab1.jar"]