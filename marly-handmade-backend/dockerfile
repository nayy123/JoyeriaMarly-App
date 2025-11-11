# ---------- Etapa de compilación ----------
FROM eclipse-temurin:21 AS builder
WORKDIR /backend
  
COPY pom.xml .
COPY .mvn .mvn/
COPY mvnw .

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
  
COPY src src/
  
RUN ./mvnw clean package -DskipTests
  
# ---------- Etapa de ejecucion ----------#
FROM eclipse-temurin:21
WORKDIR /app
  
COPY --from=builder /backend/target/marly-handmade-backend-0.0.1-SNAPSHOT.jar app.jar
  
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
  