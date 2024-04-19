# IncluLex

## React Client Application Routes

- Route `/`: main page
- Route `/search/:word`: display all the related information of a word given it name

## API Server

- GET `/api/search/:word`
  - request parameters: _None_
  - response status: `200 OK` (success), `500` (server error), `404`(page not found)
  - response body content:
  ```JSON
  [
    {
      "palabra": "albornoz",
      "fecuencia": "1500",
      "definición": "Bata de tela de toalla.",
      "ejemplos": ["El albornoz es para uso exclusivo en la zona de baño o zona de recreo (piscina, club, etc.).", 
                    "El albornoz, es de una calidad excepcional y se lavana y se coloca sin problema.",
                    "El albornoz es imprescindible para cualquier baño y los clientes suelen recibir más de una vez a la semana por sus servicios en España."],
      "sinonimos": ["bata", "batín", "chilaba"],
    }
  ]
  ```

- GET `https://api.arasaac.org/v1/pictograms/es/search/:palabra`
  - request parameters: _None_
  - response status: `200 OK` (success), `500` (server error)
  - response body content:
  ``` JSON
  [
      {
          "_id": 0,
          "keywords": [
          {
              "idKeyword": 0,
              "keyword": "string",
              "plural": "string",
              "idLocution": "string",
              "meaning": "string",
              "type": 0,
              "lse": 0
          }
          ],
          "schematic": true,
          "sex": true,
          "violence": true,
          "created": "2024-02-20T11:15:59.685Z",
          "lastUpdated": "2024-02-20T11:15:59.685Z",
          "downloads": 0,
          "categories": [
          "string"
          ],
          "synsets": [
          "string"
          ],
          "tags": [
          "string"
          ],
          "desc": "string"
      }
  ]
  ```

- GET `https://api.arasaac.org/v1/pictograms/:idPictogram`
  - request parameters: _None_
  - response status: `200 OK` (success), `500` (server error)
  - response body content: `https://api.arasaac.org/v1/pictograms/12345/?download=false`

## Database Tables

- Table `word` - contains palabra frecuencia definición ejemplos sinonimos

## Main React Components

- `SearchBar` (in `SearchBar.jsx`): to render the search bar in which you are able to search teh desired term
- `WordMeaning` (in `WordMeaning.jsx`): to render all the word info of the given word
- `GuiaUso` (in `GuiaUso.jsx`): to explain all the info about the usage of the web page
- `Proyecto`(in `Proyecto.jsx`): to gather all the information regarding the proyect

## Quickstart

cd backend; python3 api.py;
cd backend; nodemon index.js;
cd frontend; npm run dev;
