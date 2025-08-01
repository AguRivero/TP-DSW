import 'reflect-metadata'
import express from 'express'
import { socioRouter } from './socio/socio.routes.js'
import { tipoEmbarcacionRouter } from './tipoEmbarcacion/tipoEmbarcacion.routes.js'
import { administradorRouter } from './administrador/administrador.routes.js'
import { embarcacionRouter } from './embarcacion/embarcacion.routes.js'
import { boxRouter } from './box/box.routes.js'
import { amarraRouter } from './amarra/amarra.routes.js'
import {orm, syncSchema} from './shared/orm.js'
import { RequestContext } from '@mikro-orm/mysql'
import cors from 'cors';

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
}));
app.use(express.json())


app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/socios', socioRouter)
app.use('/api/tiposEmbarcacion', tipoEmbarcacionRouter)
app.use('/api/embarcaciones', embarcacionRouter) 
app.use('/api/administradores', administradorRouter)
app.use('/api/boxes', boxRouter)
app.use('/api/amarras', amarraRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema()  //Nunca llamar a esto en producción, solo para desarrollo

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})


