<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="cards")
 * @ORM\Entity(repositoryClass="App\Repository\CardRepository")
 */
class Card
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="Subject")
     * @ORM\JoinColumn(name="subject_id", referencedColumnName="id")
     */
    private $subject;

    /**
     * @ORM\OneToOne(targetEntity="User")
     * @ORM\JoinColumn(name="owner", referencedColumnName="id")
     */
    private $owner;

    /**
     * @ORM\Column(type="string", length=70)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="CardImage", mappedBy="card")
     */
    private $images;

    /**
     * @ORM\ManyToOne(targetEntity="Card", inversedBy="subcards")
     * @ORM\JoinColumn(name="parent_card_id", referencedColumnName="id")
     */
    private $parentCard;

    /**
     * @ORM\OneToMany(targetEntity="Card", mappedBy="parentCard")
     */
    private $subcards;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $labelColor;

    public function __construct() {
        $this->images = new ArrayCollection();
        $this->subcards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getImages(): array
    {
        return $this->images->toArray();
    }

    public function getFirstImage(): CardImage
    {
        return $this->images->first();
    }

    public function getParentCard(): self
    {
        return $this->parentCard;
    }

    public function getSubcards(): array
    {
        return $this->subcards->toArray();
    }

    public function getSubject(): Subject
    {
        return $this->subject;
    }

    public function toJSONArray(): array
    {
        return $this->getTreeStructureAsJSONArray($this);
    }

    private function getTreeStructureAsJSONArray(Card $card): array
    {
        return [
            'id' => $card->getId(),
            'title' => $card->getTitle(),
            'text' => $card->getDescription(),
            'images' => array_map(function (CardImage $image) {
                return $image->getPath();
            }, $card->getImages()),
            'nodes' => array_map(function (Card $subcard) {
                return $this->getTreeStructureAsJSONArray($subcard);
            }, $card->getSubcards()),
        ];
    }
}
