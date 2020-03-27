<?php

namespace App\Controller;

use App\Entity\Sporter;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SporterController extends AbstractController
{
    /**
     * @Route("/sporter/save", name="apiSaveSporter" , methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return RedirectResponse|Response
     */
    public function save(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $newUser = new User();
        $sporter = new Sporter();
        if ($request->isMethod("POST")) {
            $postData = json_decode($request->getContent());

            //dd($postData);
            $em = $this->getDoctrine()->getManager();

            // set new user
            $newUser->setEmail($postData->email);
            $newUser->setPassword($passwordEncoder->encodePassword($newUser, $postData->password));
            $newUser->setNickname($postData->nickname);
            $newUser->setFirstName($postData->firstname);
            $newUser->setLastName($postData->lastname);
            $newUser->setRoles(['ROLE_SPORTER']);

            $em->persist($newUser);
            $em->flush();

            $sporter->setUser($newUser);
            $sporter->setDaysTrainedStreak(0);
            $sporter->setTotalDaysTrained(0);

            $em->persist($sporter);
            $em->flush();

        }
        return $this->json("Sporter Created");
    }

    /**
     * @Route("/sporter/update", name="apiUpdateSporter" , methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return RedirectResponse|Response
     */
    public function update(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $sporterManager = $this->getDoctrine()->getRepository(Sporter::class);
        $userManager = $this->getDoctrine()->getRepository(User::class);

        if ($request->isMethod("POST")) {
            $postData = json_decode($request->getContent());


            $sporter= $sporterManager->find($postData->sporterId);
                //dd($sporter->user);0
            $user =$userManager->find($sporter->user);

            //dd($postData);
            $em = $this->getDoctrine()->getManager();

            // info user
            $user->setPassword($passwordEncoder->encodePassword($user, $postData->password));
            $user->setNickname($postData->nickname);
            $user->setFirstName($postData->firstname);
            $user->setLastName($postData->lastname);
            $user->setRoles(['ROLE_SPORTER']);

            $em->persist($user);
            $em->flush();


//            dd($sporter->daysTrainedStreak);
//
//
//            $em->persist($sporter);
//            $em->flush();
        }
        return $this->json("SPORTER UPDATED");
    }

}
