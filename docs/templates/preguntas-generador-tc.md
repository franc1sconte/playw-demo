# Relevamiento previo para generar un test automatizado en Playwright

## Objetivo del test

1. ¿Cuál es el objetivo principal del caso de prueba?
2. ¿Qué funcionalidad o regla de negocio se desea validar?
3. ¿Qué riesgo o comportamiento crítico busca cubrir este test?

## Flujo funcional

4. ¿Cuál es el flujo esperado paso a paso?
5. ¿Existen flujos alternativos o caminos secundarios que deban contemplarse?
6. ¿Hay casos borde o validaciones especiales que deban incluirse?

## Precondiciones

7. ¿Qué condiciones deben cumplirse antes de ejecutar el test?
8. ¿Es necesario crear datos previamente o pueden reutilizarse datos existentes?
9. ¿El test debe limpiar los datos generados al finalizar?

## Usuarios y permisos

10. ¿Qué usuario o rol debe utilizarse?
11. ¿Existen permisos o configuraciones específicas que afecten el escenario?

## Datos de prueba

12. ¿Qué datos son necesarios para ejecutar el caso?
13. ¿Los datos deben ser fijos, dinámicos o generados aleatoriamente?
14. ¿Existen restricciones o formatos que deban respetarse?

## Validaciones

15. ¿Qué resultado se espera al finalizar el flujo?

## API y dependencias

19. ¿El test debe interceptar llamadas a la API?
20. ¿Es necesario mockear o simular respuestas del backend?
21. ¿Existen dependencias con otros módulos o servicios externos?

## Evidencias y diagnóstico

32. ¿Se requieren capturas de pantalla, videos o traces?
33. ¿Debe incluir logs o mensajes descriptivos para facilitar el debugging?

## Información adicional

34. ¿Existe documentación funcional o técnica relacionada con este escenario?
35. ¿Hay ejemplos de tests similares que puedan utilizarse como referencia?
36. ¿Qué información adicional consideras relevante para generar un test mantenible y alineado con las mejores prácticas del proyecto?

## Regla final

Si alguna respuesta es insuficiente o genera ambigüedad, realiza preguntas adicionales hasta contar con el contexto necesario. No asumas comportamientos, datos ni reglas de negocio que no hayan sido especificados.
