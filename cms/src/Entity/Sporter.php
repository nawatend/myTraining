<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SporterRepository")
 */
class Sporter
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    public $user;

    /**
     * @ORM\Column(type="integer")
     */
    private $totalDaysTrained;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $daysTrainedStreak;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Progress", mappedBy="sporter", orphanRemoval=true)
     */
    private $progresses;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\TrainerSporter", mappedBy="sporter", cascade={"persist", "remove"})
     */
    private $trainerSporter;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\WorkoutSessionSporter", mappedBy="sporter", orphanRemoval=true)
     */
    private $workoutSessionSporters;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $weight;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $height;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $goals = [];

    public function __construct()
    {
        $this->progresses = new ArrayCollection();
        $this->workoutSessionSporters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getTotalDaysTrained(): ?int
    {
        return $this->totalDaysTrained;
    }

    public function setTotalDaysTrained(int $totalDaysTrained): self
    {
        $this->totalDaysTrained = $totalDaysTrained;

        return $this;
    }

    public function getDaysTrainedStreak(): ?int
    {
        return $this->daysTrainedStreak;
    }

    public function setDaysTrainedStreak(?int $daysTrainedStreak): self
    {
        $this->daysTrainedStreak = $daysTrainedStreak;

        return $this;
    }

    /**
     * @return Collection|Progress[]
     */
    public function getProgresses(): Collection
    {
        return $this->progresses;
    }

    public function addProgress(Progress $progress): self
    {
        if (!$this->progresses->contains($progress)) {
            $this->progresses[] = $progress;
            $progress->setSporter($this);
        }

        return $this;
    }

    public function removeProgress(Progress $progress): self
    {
        if ($this->progresses->contains($progress)) {
            $this->progresses->removeElement($progress);
            // set the owning side to null (unless already changed)
            if ($progress->getSporter() === $this) {
                $progress->setSporter(null);
            }
        }

        return $this;
    }

    public function getTrainerSporter(): ?TrainerSporter
    {
        return $this->trainerSporter;
    }

    public function setTrainerSporter(TrainerSporter $trainerSporter): self
    {
        $this->trainerSporter = $trainerSporter;

        // set the owning side of the relation if necessary
        if ($trainerSporter->getSporter() !== $this) {
            $trainerSporter->setSporter($this);
        }

        return $this;
    }

    /**
     * @return Collection|WorkoutSessionSporter[]
     */
    public function getWorkoutSessionSporters(): Collection
    {
        return $this->workoutSessionSporters;
    }

    public function addWorkoutSessionSporter(WorkoutSessionSporter $workoutSessionSporter): self
    {
        if (!$this->workoutSessionSporters->contains($workoutSessionSporter)) {
            $this->workoutSessionSporters[] = $workoutSessionSporter;
            $workoutSessionSporter->setSporter($this);
        }

        return $this;
    }

    public function removeWorkoutSessionSporter(WorkoutSessionSporter $workoutSessionSporter): self
    {
        if ($this->workoutSessionSporters->contains($workoutSessionSporter)) {
            $this->workoutSessionSporters->removeElement($workoutSessionSporter);
            // set the owning side to null (unless already changed)
            if ($workoutSessionSporter->getSporter() === $this) {
                $workoutSessionSporter->setSporter(null);
            }
        }

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getHeight(): ?float
    {
        return $this->height;
    }

    public function setHeight(?float $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getGoals(): ?array
    {
        return $this->goals;
    }

    public function setGoals(?array $goals): self
    {
        $this->goals = $goals;

        return $this;
    }
}
