import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Feedback } from "../entity/Feedback";

export class FeedbackController {

  private feedbackRepository = getRepository(Feedback);

  static all = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Feedback).find({ relations: ["rate", "rate.sporter", "trainer", "rate.workoutSession"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static allByTrainer = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Feedback).find({ relations: ["rate", "rate.sporter", "rate.sporter.user", "trainer", "rate.workoutSession"], where: { trainer: request.params.trainerId } });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static one = async (request: Request, response: Response, next: NextFunction) => {

    const result = getRepository(Feedback).findOne(request.params.id, { relations: ["rate", "rate.sporter", "trainer", "rate.workoutSession"] });
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? response.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
      response.json(result);
    }
  }

  static save = async (request: Request, response: Response, next: NextFunction) => {

    let { rateId, message, trainerId } = request.body;
    let newFeedback = new Feedback();

    //assigned value to new feedback
    newFeedback.rate = rateId
    newFeedback.message = message
    newFeedback.trainer = trainerId
 //   console.log(request.body)

    const feedbackRepository = getRepository(Feedback);
    try {
      await feedbackRepository.save(newFeedback);
    } catch (e) {
      response.status(409).send("Feedback failed to created");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Feedback created");
  }

  static confirm = async (request: Request, response: Response, next: NextFunction) => {

    let { feedbackId, read } = request.body;

    const result = await getRepository(Feedback).findOne(feedbackId);


    result.read = read
    //console.log(request.body)

    const feedbackRepository = getRepository(Feedback);
    try {
      await feedbackRepository.save(result);
    } catch (e) {
      response.status(409).send("Feedback failed to created");
      return;
    }

    //If everything is fine, send 201 = CREATED
    response.status(201).send("Feedback created");
  }





  static remove = async (request: Request, response: Response, next: NextFunction) => {
    let feedbackToRemove = await getRepository(Feedback).findOne(request.params.id);
    await getRepository(Feedback).remove(feedbackToRemove);

    //After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }

}