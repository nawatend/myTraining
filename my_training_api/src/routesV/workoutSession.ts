import * as express from "express";
import { WorkoutSessionController } from "../controller/WorkoutSessionController";

const workoutSessionRouter = express.Router()

workoutSessionRouter
  .get('/', WorkoutSessionController.all)
  .get('/:id', WorkoutSessionController.one)
  .post('/', WorkoutSessionController.save)
  .delete('/:id', WorkoutSessionController.remove)

export default workoutSessionRouter