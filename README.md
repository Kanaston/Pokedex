# PokeDex 🎮

Aplicación web hecha en Angular que muestra el Pokédex nacional completo (1,025 Pokémon, del #1 al #1025) organizado por región/generación. Al hacer click en cualquiera, se abre una ventana modal con su información: foto, descripción tipo Pokédex, tipos, habilidades y estadísticas — sin salir de la pantalla ni navegar a otra ruta. También incluye un buscador para encontrar directamente un Pokémon por nombre o número, sin importar su generación.

## ✨ Características

- Selector de región (Kanto, Johto, Hoenn, Sinnoh, Teselia, Kalos, Alola, Galar, Paldea) para navegar el Pokédex nacional por partes, en  vez de cargar los 1,025 Pokémon de golpe.
- Cuadrícula con los Pokémon de la generación activa, cargados de forma eficiente (sin hacer una petición por cada sprite).
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
│   ├── Pokemon/           # Cuadrícula por generación + buscador
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

- `GET /pokemon?offset={n}&limit={n}` — lista base de los Pokémon de la región/generación seleccionada.
- `GET /pokemon/{id o nombre}` — detalle (sprites, tipos, habilidades, stats).
- `GET /pokemon-species/{id o nombre}` — descripción tipo Pokédex.

## 📌 Próximas mejoras

- [ ] Filtrar la cuadrícula por tipo de Pokémon.
- [ ] Mejorar el diseño visual del selector de regiones y del modal de detalle.
- [ ] Guardar Pokémon favoritos.

## 📄 Licencia

Este proyecto es de uso libre con fines educativos. Los datos de Pokémon pertenecen a Nintendo/Game Freak y se obtienen a través de la PokéAPI.