<?php

namespace App\Repository;

use App\Entity\Subject;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class SubjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Subject::class);
    }

    public function findByName(string $name): ?Subject
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('s')
            ->from('App\Entity\Subject', 's')
            ->where('s.name = :name')
            ->setParameter('name', $name);
        $query = $qb->getQuery();

        return $query->getOneOrNullResult();
    }
}
