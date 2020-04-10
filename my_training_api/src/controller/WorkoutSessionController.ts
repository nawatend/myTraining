import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { WorkoutSession } from "../entity/WorkoutSession";
import { User } from "../entity/User";



export class WorkoutSessionController {


  private workoutProgramRepository = getRepository(WorkoutSession);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).find({ relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(WorkoutSession).findOne(request.params.id, { relations: ["trainer"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { title, trainerId, type, workoutSessionIds} = request.body;
    let workoutSession = new WorkoutSession();

    workoutSession.title = title
    workoutSession.trainer = trainerId
    workoutSession.type = type
    

    const workoutSessionRepository = getRepository(WorkoutSession)
    try {
      await workoutSessionRepository.save(workoutSession)
    } catch (e) {
      console.log(e)
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("WorkoutSession - created");
  }

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let workoutProgramToRemove = await getRepository(WorkoutSession).findOne(request.params.id);

    await getRepository(WorkoutSession).remove(workoutProgramToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}