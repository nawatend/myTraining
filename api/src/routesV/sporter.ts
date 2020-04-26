import * as express from "express";
import { SporterController } from "../controller/SporterController";

const sporterRouter = express.Router()


sporterRouter
  .get('/', SporterController.all)
  .get('/:id', SporterController.one)
  .get('/user/:userId', SporterController.oneByUser)
  .post('/workoutprogram', SporterController.oneByWorkoutProgram)
  .post('/trainer', SporterController.allByTrainer)
  .post('/', SporterController.save)
  .post('/update', SporterController.update)
  .post('/assign/workoutprogram', SporterController.assignWorkoutProgram)
  .post('/trainer/remove', SporterController.removeTrainer)
  .post('/invite', SporterController.inviteByTrainer)
  .post('/invite/accept', SporterController.acceptInvite)
  .post('/invite/cancel', SporterController.cancelInvite)
  .delete('/:id', SporterController.remove)

export default sporterRouter