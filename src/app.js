const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.engine('handlebars', exphbs({
	layoutsDir: path.join(__dirname, 'views', 'layouts'),
	defaultLayout: 'main',
	extname: '.handlebars',
  }));
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, 'views'));


const productos =[
    {
        "id": 1,
        "title": "producto prueba1",
        "description": "Este es un producto prueba",
        "price": 200,
        "thumbnail": "sin imagen",
        "code": "COD1",
        "stock": 25
    },
    {
        "id": 2,
        "title": "producto prueba2",
        "description": "Este es un producto prueba",
        "price": 200,
        "thumbnail": "sin imagen",
        "code": "COD2",
        "stock": 25
    },
    {
		"id": 3,
		"title": "producto prueba3",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD3",
		"stock": 25
	},
	{
		"id": 4,
		"title": "producto prueba4",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD4",
		"stock": 25
	},
	{
		"id": 5,
		"title": "producto prueba5",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD5",
		"stock": 25
	},
	{
		"id": 6,
		"title": "producto prueba6",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD6",
		"stock": 25
	},
	{
		"id": 7,
		"title": "producto prueba7",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD7",
		"stock": 25
	},
	{
		"id": 8,
		"title": "producto prueba8",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD8",
		"stock": 25
	},
	{
		"id": 9,
		"title": "producto prueba9",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD9",
		"stock": 25
	},
	{
		"id": 10,
		"title": "producto prueba10",
		"description": "Este es un producto prueba",
		"price": 200,
		"thumbnail": "sin imagen",
		"code": "COD10",
		"stock": 25
	}
];


app.get('/', (req, res) => {
	res.render('index', { title: 'Inicio', productos });
  });
  
  app.get('/realtimeproducts', (req, res) => {
	res.render('realtimeproducts', { title: 'Productos en Tiempo Real', productos });
  });
  

  io.on('connection', (socket) => {
	console.log('Cliente conectado');
  

	io.emit('productos', productos);
  

	socket.on('nuevoProducto', (nuevoProducto) => {
	  productos.push(nuevoProducto);
  

	  io.emit('productos', productos);
	});
  

	socket.on('disconnect', () => {
	  console.log('Cliente desconectado');
	});
  });
  
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
