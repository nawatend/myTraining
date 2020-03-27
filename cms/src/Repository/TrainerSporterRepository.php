<?php

namespace App\Repository;

use App\Entity\TrainerSporter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method TrainerSporter|null find($id, $lockMode = null, $lockVersion = null)
 * @method TrainerSporter|null findOneBy(array $criteria, array $orderBy = null)
 * @method TrainerSporter[]    findAll()
 * @method TrainerSporter[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrainerSporterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TrainerSporter::class);
    }

    // /**
    //  * @return TrainerSporter[] Returns an array of TrainerSporter objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TrainerSporter
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
