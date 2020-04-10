import * as express from "express";
import { TrainerController } from "../controller/trainerController";

const trainerRouter = express.Router()


trainerRouter
  .get('/', TrainerController.all)
  .get('/:id', TrainerController.one)
  .post('/', TrainerController.save)
  .delete('/:id', TrainerController.remove)


export default trainerRouter