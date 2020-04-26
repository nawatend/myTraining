import * as express from "express";
import { WorkoutSessionController } from "../controller/WorkoutSessionController";

const workoutSessionRouter = express.Router()

workoutSessionRouter
  .get('/', WorkoutSessionController.all)
  .get('/available', WorkoutSessionController.allByAvailable)
  .get('/:id', WorkoutSessionController.one)
  .get('/trainer/:trainerId', WorkoutSessionController.allByTrainer)
  .get('/workoutProgram/:workoutProgramId', WorkoutSessionController.allByWorkoutProgram)
  .get('/all/free', WorkoutSessionController.allByFree)
  .post('/', WorkoutSessionController.save)
  .post('/done', WorkoutSessionController.setDone)
  .post('/clone', WorkoutSessionController.clone)
  .put('/update', WorkoutSessionController.update)
  .delete('/:id', WorkoutSessionController.remove)

export default workoutSessionRouter