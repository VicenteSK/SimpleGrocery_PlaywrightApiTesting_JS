# 🧪 Simple Grocery Store API Testing with Playwright

**Autor:** Vicente Valenzuela  
**Rol:** QA Automation Trainee / Tester Manual & Automation  
**Stack Tecnológico:** Playwright | JavaScript | Node.js | API Testing | Bruno | HTML Reporter  

---

## 📋 Descripción del Proyecto

Este proyecto automatiza el flujo completo de la **Simple Grocery Store API**, comenzando con pruebas manuales en **Bruno** (API Client) y luego migrando el flujo a **Playwright** para la ejecución automatizada en **JavaScript**.

El objetivo es validar todo el ciclo de una API REST de manera continua, aplicando buenas prácticas de QA Automation, control de respuestas, y reporte HTML.

---

## 🚀 Flujo de Pruebas Automatizado

El conjunto de pruebas ejecuta los siguientes pasos de forma **secuencial**:

1️⃣ **Creación de Token** → Generación dinámica de email y autenticación.  
2️⃣ **Creación de Carro (Cart)** → Validación de respuesta HTTP 201 y captura de `cartId`.  
3️⃣ **Adición de Item al Carro** → POST con `productId` y validación de respuesta.  
4️⃣ **Creación de Orden (Order)** → Asociación de `cartId` y validación de `orderId`.  
5️⃣ **Asociar Cart a Order (PATCH)** → Confirmación de vinculación correcta.  
6️⃣ **Validación Final (GET)** → Consulta y validación de la orden creada, mostrando una tabla con `Order ID` y `Cart ID` en consola.

---

## ⚙️ Tecnologías Utilizadas

| Herramienta / Librería | Uso |
|-------------------------|-----|
| **Playwright** | Framework de automatización para pruebas API y E2E |
| **JavaScript (Node.js)** | Lenguaje de desarrollo |
| **Bruno** | Validación y diseño inicial de endpoints API |
| **HTML Reporter** | Generación de reportes visuales |
| **Git & GitHub** | Control de versiones y publicación |
| **Windows + Visual Studio Code** | Entorno de desarrollo |

---

## 🧠 Buenas Prácticas Implementadas

- Uso de `test.describe.serial()` para mantener la secuencia de ejecución.  
- Reutilización de contexto (`apiContext`) para optimizar rendimiento.  
- Validación de status codes, tokens y cuerpos de respuesta.  
- Impresión de logs claros con `console.log()` y `console.table()`.  
- Reportes generados automáticamente con **Playwright HTML Reporter**.  

---

## 🧩 Estructura del Proyecto

📦 SimpleGrocery_PlaywrightApiTesting_JS/
┣ 📁 tests/
┃ ┗ api.spec.js
┣ 📄 playwright.config.js
┣ 📄 package.json
┣ 📄 .gitignore
┗ 📄 README.md

## 🧪 Ejecución del Proyecto

### 1️⃣ Instalar dependencias:
```bash
npm install

### 2️⃣ Ejecutar las pruebas:

npx playwright test

### 3️⃣ Ver reporte HTML:

npx playwright show-report

📊 Cobertura de Pruebas

6 tests automatizados

Flujo completo de creación de orden validado

100% de endpoints principales cubiertos

Ejecución estable en < 10 segundos

📊 Reporte de Ejecución

<img width="1243" height="626" alt="image" src="https://github.com/user-attachments/assets/aa6d479b-dda9-404b-9572-484f507934a2" />



💡 Aprendizajes Destacados

Transición de pruebas manuales en Bruno a pruebas automatizadas en Playwright.

Implementación de flujos secuenciales API REST.

Uso de variables dinámicas y validaciones condicionales.

Mejora en el control de errores y logging de respuestas.

