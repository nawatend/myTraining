<?php

namespace App\Controller;

use App\Entity\Exercise;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ExerciseController extends AbstractController
{
    /**
     * @Route("/exercise/save", name="apiSaveExercise", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request)
    {
        $newExercise = new Exercise();

        if ($request->isMethod("POST")) {
            $postData = json_decode($request->getContent());
            $em = $this->getDoctrine()->getManager();

            $newExercise->setTitle($postData->title);
            $newExercise->setImagePath($postData->imagePath);
            $newExercise->setVideoPath($postData->videoPath);
            $newExercise->setCardioLevel($postData->cardioLevel);
            $newExercise->setMuscleLevel($postData->muscleLevel);
            $newExercise->setMainInfo($postData->mainInfo);
            $newExercise->setType($postData->type);

            $em->persist($newExercise);
            $em->flush();
        }
        return $this->json("EXERCISE CREATED");
    }

    /**
     * @Route("/exercise/update", name="apiUpdateExercise", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $newExercise = new Exercise();

        if ($request->isMethod("POST")) {
            $postData = json_decode($request->getContent());
            $em = $this->getDoctrine()->getManager();

            $newExercise->setTitle($postData->title);
            $newExercise->setImagePath($postData->imagePath);
            $newExercise->setVideoPath($postData->videoPath);
            $newExercise->setCardioLevel($postData->cardioLevel);
            $newExercise->setMuscleLevel($postData->muscleLevel);
            $newExercise->setMainInfo($postData->mainInfo);
            $newExercise->setType($postData->type);

            $em->persist($newExercise);
            $em->flush();
        }
        return $this->json("EXERCISE CREATED");
    }
}
