<?php

namespace App\Controller;

use App\Entity\Card;
use App\Entity\Subject;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @IsGranted("ROLE_USER")
 * @Route(name="app_main_")
 */
class MainController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(): Response
    {
        $subjectRepository = $this->getDoctrine()->getRepository(Subject::class);
        $subjects = $subjectRepository->findAll();

        return $this->render('home/index.html.twig', ['subjects' => $subjects]);
    }

    /**
     * @Route("/{subject}/maps/", name="show_subject")
     */
    public function showSubject(string $subject): Response
    {
        $subjectRepository = $this->getDoctrine()->getRepository(Subject::class);
        $subject = $subjectRepository->findByName($subject);
        $subjects = $subjectRepository->findAll();
        $cardRepository = $this->getDoctrine()->getRepository(Card::class);
        $cards = $cardRepository->findTopLevelBySubject($subject->getId());

        return $this->render('subject/subject.html.twig', [
            'cards' => $cards,
            'selectedSubject' => $subject,
            'subjects' => $subjects,
        ]);
    }

    /**
     * @Route("/{subject}/maps/{cardId}", name="show_card")
     */
    public function showCard(string $subject, int $cardId): Response
    {
        $subjectRepository = $this->getDoctrine()->getRepository(Subject::class);
        $subjects = $subjectRepository->findAll();
        $cardRepository = $this->getDoctrine()->getRepository(Card::class);
        $card = $cardRepository->find($cardId);

        return $this->render('card/card.html.twig', [
            'card' => $card,
            'subjects' => $subjects,
        ]);
    }
}
