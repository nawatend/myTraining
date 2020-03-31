<?php

namespace App\Controller;

use App\Entity\Exercise;
use App\Entity\WorkoutSession;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class WSExerciseController extends AbstractController
{
    /**
     * @Route("/wsexercise/save", name="apiSaveWSExercise", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request)
    {

        $exerciseManager = $this->getDoctrine()->getRepository(Exercise::class);
        $WSManager = $this->getDoctrine()->getRepository(WorkoutSession::class);

        if ($request->isMethod("POST")) {

            $postData = json_decode($request->getContent());
            $em = $this->getDoctrine()->getManager();

            $WSExercise = $WSManager->find($postData->workoutSessionId);
            $exercise = $exerciseManager->find($postData->exerciseId);

            $WSExercise->addExercise($exercise);

            $em->persist($WSExercise);
            $em->flush();
        }
        return $this->json("ADDED EXERCISE TO WS");
    }
}
