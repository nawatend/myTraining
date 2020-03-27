<?php

namespace App\Repository;

use App\Entity\WorkoutSessionSporter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method WorkoutSessionSporter|null find($id, $lockMode = null, $lockVersion = null)
 * @method WorkoutSessionSporter|null findOneBy(array $criteria, array $orderBy = null)
 * @method WorkoutSessionSporter[]    findAll()
 * @method WorkoutSessionSporter[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkoutSessionSporterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorkoutSessionSporter::class);
    }

    // /**
    //  * @return WorkoutSessionSporter[] Returns an array of WorkoutSessionSporter objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WorkoutSessionSporter
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
