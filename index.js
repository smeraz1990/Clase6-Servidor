const express = require('express')
const fs = require('fs')
const app = express()
const puerto = 8080
let Productos = [];


class Contenedor {
    constructor(archivo) {
        this.NombreArchivo = archivo;

    }

    async getByid(index) {
        try {
            let productos = JSON.parse(await fs.promises.readFile(`./${this.NombreArchivo}`))
            console.log(index)
            return JSON.stringify(productos[index])

        } catch (err) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            let productos = JSON.parse(await fs.promises.readFile(`./${this.NombreArchivo}`))

            return JSON.stringify(productos)


        } catch (err) {
            console.log(err)
        }
    }
}

const productos = new Contenedor("Productos.txt");


app.get('/', (req, res) => {

    res.send('Bienvenido al servidor copie ruta que desea visitar: <br> /productos  <br> /productoRandom')
})

app.get('/productos', async(req, res) => {

    let TodoArreglo = await productos.getAll();
    res.send(TodoArreglo)

})

app.get('/productoRandom', async(req, res) => {
    let productoIndexRandom = Math.floor(Math.random() * (3 - 0) + 0)
    let TodoArregloIndex = await productos.getByid(productoIndexRandom);
    res.send(TodoArregloIndex)

})

app.listen(puerto, (error) => {
    if (!error) {
        console.log(`Servidor escuchando el puerto ${puerto}`);
    } else {
        console.log('Error al iniciar el servidor');
    }
})