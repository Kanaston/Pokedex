# PokeDex 🎮

Aplicación web hecha en **Angular** que muestra los primeros 151 Pokémon (generación 1) en una cuadrícula. Al hacer click en cualquiera, se abre una ventana modal con su información: foto, descripción tipo Pokédex, tipos, habilidades y estadísticas — sin salir de la pantalla ni navegar a otra ruta. También incluye un buscador para encontrar directamente un Pokémon por nombre o número.

## ✨ Características

- Cuadrícula con los 151 Pokémon originales, cargados de forma eficiente.
- Modal de detalle con:
  - Imagen oficial del Pokémon.
  - Descripción de la Pokédex (en español, con respaldo en inglés si no está disponible).
  - Tipos, habilidades y estadísticas base.
- Buscador por nombre o número de Pokédex, independiente de la cuadrícula.
- Manejo de estados de carga y error.
- Consumo de la [PokéAPI](https://pokeapi.co/).

## 🛠️ Tecnologías

- [Angular](https://angular.dev/) (standalone components + signals)
- TypeScript
- RxJS
- PokéAPI (REST)

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Angular CLI](https://angular.dev/tools/cli) instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Kanaston/Pokedex.git
   cd Pokedex
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## ▶️ Uso

Levanta el servidor de desarrollo:

```bash
ng serve
```

Abre tu navegador en [http://localhost:4200].

## 🧪 Tests

```bash
ng test
```

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── Pokemon/           # Cuadrícula de los 151 Pokémon + buscador
│   │   ├── Pokemon.ts
│   │   └── Pokemon.css
│   ├── Poke-info/         # Modal con el detalle del Pokémon seleccionado
│   │   ├── Poke-info.ts
│   │   └── Poke-info.css
│   ├── pokemon.service.ts # Llamadas a la PokéAPI (lista, detalle, especie)
│   ├── app.ts
│   ├── app.html
│   └── app.config.ts
```

## 🌐 API utilizada

Este proyecto consume la [PokéAPI](https://pokeapi.co/docs/v2), una API pública y gratuita con datos de todos los Pokémon.

- `GET /pokemon?limit=151` — lista base de los primeros 151 Pokémon.
- `GET /pokemon/{id o nombre}` — detalle (sprites, tipos, habilidades, stats).
- `GET /pokemon-species/{id o nombre}` — descripción tipo Pokédex.

## 📌 Próximas mejoras

- [ ] Filtrar la cuadrícula por tipo de Pokémon.
- [ ] Paginación o scroll infinito para incluir más generaciones.
- [ ] Guardar Pokémon favoritos.

## 📄 Licencia

Este proyecto es de uso libre con fines educativos. Los datos de Pokémon pertenecen a Nintendo/Game Freak y se obtienen a través de la PokéAPI.