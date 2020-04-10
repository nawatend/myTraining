import * as express from "express";
import { ExerciseBaseController } from "../controller/ExerciseBaseController";

const exerciseBaseRouter = express.Router()


exerciseBaseRouter
  .get('/', ExerciseBaseController.all)
  .get('/:id', ExerciseBaseController.one)
  .post('/', ExerciseBaseController.save)
  .delete('/:id', ExerciseBaseController.remove)


export default exerciseBaseRouter