import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Sporter } from "../entity/Sporter";
import { User } from "../entity/User";



export class SporterController {


  private userRepository = getRepository(Sporter);

  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Sporter).find({ relations: ["user", "trainer"], where: { acceptTrainer: false } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static allByTrainer = async (request: Request, response: Response, next: NextFunction) => {
    const result = getRepository(Sporter).find({ relations: ["user", "trainer", "workoutProgram"], where: { trainer: request.body.trainerId, acceptTrainer: true } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }


  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Sporter).findOne(request.params.id, { relations: ["user", 'trainer'] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static oneByUser = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Sporter).findOne(request.params.id, { relations: ["user", "trainer", "trainer.user", "workoutProgram"], where: { user: request.params.userId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static oneByWorkoutProgram = async (request: Request, response: Response, next: NextFunction) => {

    let { workoutProgramId } = request.body;
    let sporter = await getRepository(Sporter).findOne({ relations: ["user", 'trainer'], where: { workoutProgram: workoutProgramId } });

    response.json(sporter)

  }



  static save = async (request: Request, response: Response, next: NextFunction) => {


    let { email, password, role, age, fullName, imageName, goal, weight, height } = request.body;
    let user = new User();
    let sporter = new Sporter();

    //assigned value to new user
    user.email = email
    user.password = password
    user.age = age
    user.fullName = fullName
    user.role = role
    user.imageName = imageName

    sporter.daysTrained = 0
    sporter.daysTrainedStreak = 0
    sporter.goal = goal
    sporter.user = user
    sporter.height = height
    sporter.weight = weight

    //encrytped password to db
    user.hashPassword();

    const userRepository = getRepository(User);
    const sporterRepository = getRepository(Sporter)
    try {
      await userRepository.save(user);
      await sporterRepository.save(sporter)
    } catch (e) {
      response.status(409).send("email already in use");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Sporter - User created");
  }

  static update = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId, trainerId, daysTrained, daysTrainedStreak, weight, height, goal, workoutProgramId, acceptTrainer } = request.body;
    let sporter = await getRepository(Sporter).findOne(sporterId, { relations: ["user", 'trainer'] });

    sporter.trainer = trainerId
    sporter.daysTrained = daysTrained
    sporter.daysTrainedStreak = daysTrainedStreak
    sporter.weight = weight
    sporter.height = height
    sporter.goal = goal
    sporter.workoutProgram = workoutProgramId
    sporter.acceptTrainer = acceptTrainer

    const sporterRepository = getRepository(Sporter)
    try {
      await sporterRepository.save(sporter)
      response.json(sporter)
    } catch (e) {
      response.status(409).send("email already in use");
      return;
    }

    //If everything is fine, send 201 = CREATED

  }


  static assignWorkoutProgram = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId, workoutProgramId } = request.body;
    let sporter = await getRepository(Sporter).findOne(sporterId, { relations: ["user", 'trainer', 'workoutProgram'] });

    console.log(workoutProgramId)
    sporter.workoutProgram = workoutProgramId

    const sporterRepository = getRepository(Sporter)
    try {
      await sporterRepository.save(sporter)
    } catch (e) {
      response.status(409).send("Accept WP Failed");
      return;
    }

    response.json(sporter)
  }

  static inviteByTrainer = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId, trainerId, acceptTrainer } = request.body;
    let sporter = await getRepository(Sporter).findOne(sporterId, { relations: ["user", 'trainer'] });

    sporter.trainer = trainerId
    sporter.acceptTrainer = acceptTrainer

    const sporterRepository = getRepository(Sporter)
    try {
      await sporterRepository.save(sporter)
    } catch (e) {
      response.status(409).send("Invite Failed");
      return;
    }

    response.status(201).send("Sporter - invite");
  }

  static acceptInvite = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId, trainerId, acceptTrainer } = request.body;
    let sporter = await getRepository(Sporter).findOne(sporterId, { relations: ["user", 'trainer'] });

    sporter.trainer = trainerId
    sporter.acceptTrainer = acceptTrainer

    const sporterRepository = getRepository(Sporter)
    try {
      await sporterRepository.save(sporter)
    } catch (e) {
      response.status(409).send("Accept Invite Failed");
      return;
    }

    response.status(201).send("Sporter - Accepted invite");
  }

  static cancelInvite = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId } = request.body;
    let sporter = await getRepository(Sporter).findOne(sporterId, { relations: ["user", 'trainer'] });

    sporter.trainer = null
    sporter.acceptTrainer = false

    const sporterRepository = getRepository(Sporter)
    try {
      await sporterRepository.save(sporter)
    } catch (e) {
      response.status(409).send("Cancel Invite Failed");
      return;
    }

    response.status(201).send("Sporter - Accepted invite");
  }

  static removeTrainer = async (request: Request, response: Response, next: NextFunction) => {


    let { sporterId } = request.body;
    let sporter = await getRepository(Sporter).findOne(sporterId, { relations: ["user", 'trainer'] });

    sporter.trainer = null
    sporter.acceptTrainer = false
    sporter.workoutProgram = null

    console.log("removed")
    const sporterRepository = getRepository(Sporter)
    try {
      await sporterRepository.save(sporter)
    } catch (e) {
      response.status(409).send("Remove trainer Failed");
      return;
    }

    response.status(201).send("Sporter -Removed Trainer");
  }





  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let sporterToRemove = await getRepository(Sporter).findOne(request.params.id);
    let userToRemove = await getRepository(User).findOne(sporterToRemove.user);
    await getRepository(Sporter).remove(sporterToRemove);
    await getRepository(User).remove(userToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}