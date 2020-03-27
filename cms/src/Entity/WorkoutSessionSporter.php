<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\WorkoutSessionSporterRepository")
 */
class WorkoutSessionSporter
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\WorkoutSession", inversedBy="workoutSessionSporters")
     * @ORM\JoinColumn(nullable=false)
     */
    private $workoutsession;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Sporter", inversedBy="workoutSessionSporters")
     * @ORM\JoinColumn(nullable=false)
     */
    private $sporter;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWorkoutsession(): ?WorkoutSession
    {
        return $this->workoutsession;
    }

    public function setWorkoutsession(?WorkoutSession $workoutsession): self
    {
        $this->workoutsession = $workoutsession;

        return $this;
    }

    public function getSporter(): ?Sporter
    {
        return $this->sporter;
    }

    public function setSporter(?Sporter $sporter): self
    {
        $this->sporter = $sporter;

        return $this;
    }
}
