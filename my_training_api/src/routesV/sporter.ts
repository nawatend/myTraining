import * as express from "express";
import { SporterController } from "../controller/SporterController";

const sporterRouter = express.Router()


sporterRouter
  .get('/', SporterController.all)
  .get('/:id', SporterController.one)
  .post('/', SporterController.save)
  .delete('/:id', SporterController.remove)


export default sporterRouter