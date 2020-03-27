<?php

namespace App\Repository;

use App\Entity\Sporter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Sporter|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sporter|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sporter[]    findAll()
 * @method Sporter[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SporterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sporter::class);
    }

    // /**
    //  * @return Sporter[] Returns an array of Sporter objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Sporter
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
