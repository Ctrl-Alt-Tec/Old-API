# CTRL ALT TEC API

Ctrl Alt Tec se creó con el objetivo de hacer la programación accesible para todas y todos, de una forma diferente a las clases convencionales, con diferentes actividades y proyectos. Tenemos metas ambiciosas y para ello será necesario contar con herramientas que estén a la altura para ayudarnos en la toma de decisiones. Proponemos crear una API (Application Programming Interface) a modo de que la información pueda ser leída (y escrita) y que pueda integrarse fácilmente con diferentes servicios.

La dirección base de la API es `https://ctrl-alt-tec.herokuapp.com`

## Rutas

**GRUPO ESTUDIANTIL**

### /grupoestudiantil/miembrosybits/miembros
Regresa un array de objetos con los datos de todos los integrantes, ejemplo:
```json
[
    {
        "nombre": "Johny",
        "apellidopaterno": "Appleseed",
        "apellidomaterno": "M.",
        "matrícula": "A01020000",
        "carrera": "ITC",
        "semestre": 3,
        "sexo": "M",
        "díaderegistro": "22 de julio del 2020",
        "celular": 5500000000,
        "correoelectrónico": "A01020000@itesm.mx",
        "puestoenmesadirectiva": "Integrante",
        "totaldebits": 0
    },
]
```

### /grupoestudiantil/miembrosybits/bits
Regresa un array de objetos con los nombres completos de los integrantes, sus matrículas, el total de **Bits**, así como el desgloce de actividades. Por ejemplo:
```json
[
    {
        "nombrecompleto": "Johny Appleseed M.",
        "matrícula": "A01020000",
        "bitstotales": 1,
        "actividad_1_Inicio_de_semestre": 1
    },
]
```

**ACTIVIDADES Y EVENTOS**
### /eventos/calendario
Utiliza el id del calendario público en Google Calendars para obtener un `.ics` que es posteriormente convertido a `JSON` utilizando la especificación **`jCal`**, por ejemplo:

```json
[
    {
        "DTSTART;VALUE=DATE": "20180928",
        "DTEND;VALUE=DATE": "20180929",
        "DTSTAMP": "20200723T014249Z",
        "UID": "4hgvt8dim5ncrpe8rk3kr6m0a8@google.com",
        "CREATED": "20180923T031157Z",
        "DESCRIPTION": "",
        "LAST-MODIFIED": "20180923T031157Z",
        "LOCATION": "Tecnológico de Monterrey\\, Av de los Poetas 100\\, Santa Fe\\, La Loma\\, 01389 Ciudad de México\\, CDMX\\, México",
        "SEQUENCE": "0",
        "STATUS": "CONFIRMED",
        "SUMMARY": "Playeras",
        "TRANSP": "TRANSPARENT"
    }
]
```

**CONTENIDO Y RECURSOS**

Esta parte de la API será utilizada con la v.3.0. de `altBlog`, aún en producción

### /contenido/posts
En un archivo de Google Sheets se almacena la info con los posts para el blog. Regresa un array de objetos con metadatos de los posts. 
```json
[
    {
        "titulo": "WikiBot",
        "id": "2PACX-1vQbV1GRskG2GX2DWqSLcFW4bSt7tMq80dm9_RRRNCS8PU2VxYIh-zYLB4Cjv3QLdMF6o3aLl2NDd7bi",
        "autor": "jajoosam",
        "categoría": "Tutorial",
        "etiquetas": "workshop, cahtbot",
        "slug": "wikibot"
    },
    {
        "titulo": "Watermelon",
        "id": "2PACX-1vQtPDTOeRtXAiPJTo_-SGakBYzsckDOfHAipzymkpZthPrCtmHg0y5skGJwtgQ3Dp6Z2mprkeKfzAv7",
        "autor": "edvilme",
        "categoría": "Blog",
        "etiquetas": "watermelon, meta",
        "slug": "watermelon"
    },
    {
        "titulo": "Máquina Enseñable",
        "id": "2PACX-1vS1OEnsnccMSB_oG7Ua-08prUs1WZkhlmRgRoLTbsQAsag3hqpAlIiX0D6CKFPE5zP0SHtl1f0iMwOo",
        "autor": "hackclub",
        "categoría": "Tutorial",
        "etiquetas": "workshop ",
        "slug": "maquina-enseñable"
    }
]
```

### /contenido/postst/:slug
Donde `slug` se refiere a la propiedad `slug` del objeto de post. Regresa la versión HTML del documento de Google Docs. Si éste no existe, se regresa un error 404. 
