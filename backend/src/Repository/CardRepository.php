<?php

namespace App\Repository;

use App\Entity\Card;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Card::class);
    }

    public function findTopLevelBySubject(int $subjectId): array
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('c')
            ->from('App\Entity\Card', 'c')
            ->where('c.subject = :subject')
            ->andWhere('c.parentCard IS NULL')
            ->setParameter('subject', $subjectId);
        $query = $qb->getQuery();

        return $query->getResult();
    }
}
