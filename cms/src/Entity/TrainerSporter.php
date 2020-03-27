<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrainerSporterRepository")
 */
class TrainerSporter
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Trainer", inversedBy="trainerSporters")
     * @ORM\JoinColumn(nullable=false)
     */
    private $trainer;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Sporter", inversedBy="trainerSporter", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $sporter;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTrainer(): ?Trainer
    {
        return $this->trainer;
    }

    public function setTrainer(?Trainer $trainer): self
    {
        $this->trainer = $trainer;

        return $this;
    }

    public function getSporter(): ?Sporter
    {
        return $this->sporter;
    }

    public function setSporter(Sporter $sporter): self
    {
        $this->sporter = $sporter;

        return $this;
    }
}
