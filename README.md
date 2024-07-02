# IncluLex

## React Client Application Routes

- Route `/`: main page
- Route `/search/:word`: display all the related information of a word given it name
- Route `/guia-uso`: display all the related information about the usage of the platform
- Route `/proyecto`: display all the related information about the proyect created
- Route`*`: page not found route

## Database Files

- Table `frecuencia` - contains palabra frecuencia
- JSON `dictionary` - contains palabra definition
- JSON `sinant` - contains palabra sinónimos

## Main React Components

- `SearchBar` (in `SearchBar.jsx`): to render the search bar in which you are able to search teh desired term
- `WordMeaning` (in `WordMeaning.jsx`): to render all the word info of the given word
- `GuiaUso` (in `GuiaUso.jsx`): to explain all the info about the usage of the web page
- `Proyecto`(in `Proyecto.jsx`): to gather all the information regarding the proyect
- `NotFound` (in `NotFound.jsx`):  to render a default layout when no route is matched

(only _main_ components, minor ones may be skipped)

## Quickstart

cd backend; python3 startup.py;
cd frontend; npm run dev;
