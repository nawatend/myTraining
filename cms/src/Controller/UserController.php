<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Common\Annotations\AnnotationException;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class UserController extends AbstractController
{
    /**
     * @Route("/admin/user/save", name="apiSaveUser", methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return RedirectResponse|Response
     */
    public function save(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $newUser = new User();
        if ($request->isMethod("post")) {

            $postData = json_decode($request->getContent());
            //dd($userData);
            $em = $this->getDoctrine()->getManager();
            $newUser->setEmail($postData->email);
            $newUser->setPassword($passwordEncoder->encodePassword($newUser, $postData->password));
            $newUser->setNickname($postData->nickname);
            $newUser->setFirstName($postData->firstname);
            $newUser->setLastName($postData->lastname);
            $newUser->setRoles(['ROLE_ADMIN']);

            $em->persist($newUser);
            $em->flush();
        }
        return $this->json("Saved");
    }

    /**
     * @Route("/api/getuserinfo", name="apiGetUserInfo", methods={"POST"})
     * @param Request $request
     * @throws AnnotationException
     */
    public function getUserInfo(Request $request)
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $norm = [new DateTimeNormalizer(), new ObjectNormalizer($classMetadataFactory),];
        $encoders = [new JsonEncoder()];
        $serializer = new Serializer($norm, $encoders);
    }

    /**
     * @Route("/api/user/update", name="apiUpdateUser", methods={"POST"})
     * @param Request $request
     * @throws AnnotationException
     */
    public function updateUser(Request $request)
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $norm = [new DateTimeNormalizer(), new ObjectNormalizer($classMetadataFactory),];
        $encoders = [new JsonEncoder()];
        $serializer = new Serializer($norm, $encoders);
    }

    /**
     * @Route("/api/user/delete", name="apiDeleteUser", methods={"POST"})
     * @param Request $request
     * @throws AnnotationException
     */
    public function deleteUser(Request $request)
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $norm = [new DateTimeNormalizer(), new ObjectNormalizer($classMetadataFactory),];
        $encoders = [new JsonEncoder()];
        $serializer = new Serializer($norm, $encoders);
    }
}
