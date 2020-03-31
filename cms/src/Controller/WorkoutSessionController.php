<?php

namespace App\Controller;

use App\Entity\Trainer;
use App\Entity\WorkoutSession;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class WorkoutSessionController extends AbstractController
{
    /**
     * @Route("/workoutsession/save", name="apiSaveWorkoutSession", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request)
    {
        $newWorkoutSession =  new WorkoutSession();
        $trainerManager = $this->getDoctrine()->getRepository(Trainer::class);
        if ($request->isMethod("POST")) {
            $postData = json_decode($request->getContent());
            //dd($postData);
            $em = $this->getDoctrine()->getManager();

            $trainer= $trainerManager->find($postData->trainerId);
            $newWorkoutSession->setType($postData->type);
            $newWorkoutSession->setMuscleLevel($postData->muscleLevel);
            $newWorkoutSession->setCardioLevel($postData->cardioLevel);
            $newWorkoutSession->setTitle($postData->title);
            $newWorkoutSession->setImagePath($postData->imagePath);
            $newWorkoutSession->setTrainer($trainer);

            $em->persist($newWorkoutSession);
            $em->flush();
        }
        return $this->json("Workout Session Created");
    }


    /**
     * @Route("/workoutsession/update", name="apiUpdateWorkoutSession", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {

        $WSManager = $this->getDoctrine()->getRepository(WorkoutSession::class);
        $trainerManager = $this->getDoctrine()->getRepository(Trainer::class);

        if ($request->isMethod("POST")) {
            $postData = json_decode($request->getContent());
            $em = $this->getDoctrine()->getManager();
            $trainer= $trainerManager->find($postData->trainerId);

            $newWorkoutSession =  $WSManager->find($postData->workoutSessionId);

            $newWorkoutSession->setType($postData->type);
            $newWorkoutSession->setMuscleLevel($postData->muscleLevel);
            $newWorkoutSession->setCardioLevel($postData->cardioLevel);
            $newWorkoutSession->setTitle($postData->title);
            $newWorkoutSession->setImagePath($postData->imagePath);
            $newWorkoutSession->setTrainer($trainer);

            $em->persist($newWorkoutSession);
            $em->flush();
        }
        return $this->json("Workout Session Updated");
    }
}
