import * as express from "express";
import { WorkoutProgramController } from "../controller/WorkoutProgramController";

const workoutProgramRouter = express.Router()


workoutProgramRouter
  .get('/', WorkoutProgramController.all)
  .get('/:id', WorkoutProgramController.one)
  .post('/', WorkoutProgramController.save)
  .delete('/:id', WorkoutProgramController.remove)


export default workoutProgramRouter