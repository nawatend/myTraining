<?php

namespace App\Controller;

use App\Entity\Sporter;
use App\Entity\Trainer;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class TrainerController extends AbstractController
{
    /**
     * @Route("/trainer/save", name="apiSaveTrainer" , methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return RedirectResponse|Response
     */
    public function save(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $newUser = new User();
        $trainer = new Trainer();
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
            $newUser->setRoles(['ROLE_TRAINER']);

            $em->persist($newUser);
            $em->flush();

            $trainer->setUser($newUser);
            $trainer->setDescription($postData->description);
            $trainer->setAddress($postData->address);
            $trainer->setMobile($postData->mobile);

            $em->persist($trainer);
            $em->flush();

        }
        return $this->json("TRAINER CREATED");
    }


    /**
     * @Route("/trainer/update", name="apiUpdateTrainer" , methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return RedirectResponse|Response
     */
    public function update(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $trainerManager = $this->getDoctrine()->getRepository(Trainer::class);
        $userManager = $this->getDoctrine()->getRepository(User::class);

        if ($request->isMethod("POST")) {

            $postData = json_decode($request->getContent());

            $trainer= $trainerManager->find($postData->trainerId);
            $user =$userManager->find($trainer->user);


            //dd($postData);
            $em = $this->getDoctrine()->getManager();

            // info user
            $user->setPassword($passwordEncoder->encodePassword($user, $postData->password));

            if(isset($postData->nickname)){
                $user->setNickname($postData->nickname);
            }else{
                dd("no nickname");
            }

            $user->setFirstName($postData->firstname);
            $user->setLastName($postData->lastname);
            $user->setRoles(['ROLE_TRAINER']);

            $em->persist($user);
            $em->flush();

            $trainer->setUser($user);
            $trainer->setDescription($postData->description);
            $trainer->setAddress($postData->address);
            $trainer->setMobile($postData->mobile);

            $em->persist($trainer);
            $em->flush();

        }
        return $this->json("TRAINER UPDATED");
    }
}
