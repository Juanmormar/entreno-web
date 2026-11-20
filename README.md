# Entreno Juan

Web para seguir el plan de entrenamiento desde el móvil: series que se marcan, cronómetro de descanso, peso por ejercicio y registro de sesiones para enviar al coach.

## Cambiar de etapa

1. Abre la carpeta `dias/` en GitHub.
2. En `etapa.txt` pon el nombre de la nueva etapa (ej. `ETAPA 45`).
3. En cada `diaN.txt` pega el texto del PDF del coach para ese día.
4. Guarda (Commit changes). En 1 o 2 minutos la web ya muestra el plan nuevo.

Si un día nuevo aparece (dia5.txt, dia6.txt...), la web lo añade sola.

## Formato de los .txt

- Primera línea: `DÍA 1`
- Lo que va fuera de bloque empieza por `//`:
  - `// FOCO: PECTORALES - DELTOIDES - ZONA MEDIA`
  - `// CINTA TROTANDO: 100 kcal` (cardio)
  - `// REMO: 7 MINUTOS` (si pone minutos, sale un botón de cronómetro)
  - `// ESTIRAMIENTO: 2 SERIES.` y debajo los músculos
- Bloques: `SET: 6 SERIES. (90” REST)`, `SUPER SET: ...`, `COMPOUND SET: ...`
- Dentro del bloque, por ejercicio:
  ```
  PECTORALES: 6 REPS
  PRESS CON MANCUERNAS EN BANCO PLANO
  ```
  o con las reps en la línea siguiente:
  ```
  GLÚTEOS:
  2x6 4x4 REPS x PIERNA
  ESTOCADA REVERSA ALTERNADA CON MANCUERNAS
  ```
- Tempo entre paréntesis al final del nombre: `(6:0::1:2)`
- `(Drop Set)` junto al músculo marca el drop set.
- Líneas que empiezan por `DESCANSO` se muestran como nota del bloque.

## Datos

Las series marcadas, los pesos y el registro se guardan en el navegador del móvil (no en GitHub). Cambiar de etapa limpia lo marcado pero conserva el registro.
