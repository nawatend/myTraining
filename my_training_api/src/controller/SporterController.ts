import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Sporter } from "../entity/Sporter";
import { User } from "../entity/User";



export class SporterController {


  private userRepository = getRepository(Sporter);


  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Sporter).find({ relations: ["user"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Sporter).findOne(request.params.id,{ relations: ["user"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
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

  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let sporterToRemove = await getRepository(Sporter).findOne(request.params.id);
    let userToRemove = await getRepository(User).findOne(sporterToRemove.user);
    await getRepository(Sporter).remove(sporterToRemove);
    await getRepository(User).remove(userToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}