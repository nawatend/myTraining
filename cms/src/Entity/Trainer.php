<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrainerRepository")
 */
class Trainer
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
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $mobile;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\WorkoutSession", mappedBy="trainer")
     */
    private $workoutSessions;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrainerSporter", mappedBy="trainer", orphanRemoval=true)
     */
    private $trainerSporters;

    public function __construct()
    {
        $this->workoutSessions = new ArrayCollection();
        $this->trainerSporters = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getMobile(): ?string
    {
        return $this->mobile;
    }

    public function setMobile(string $mobile): self
    {
        $this->mobile = $mobile;

        return $this;
    }

    /**
     * @return Collection|WorkoutSession[]
     */
    public function getWorkoutSessions(): Collection
    {
        return $this->workoutSessions;
    }

    public function addWorkoutSession(WorkoutSession $workoutSession): self
    {
        if (!$this->workoutSessions->contains($workoutSession)) {
            $this->workoutSessions[] = $workoutSession;
            $workoutSession->setTrainer($this);
        }

        return $this;
    }

    public function removeWorkoutSession(WorkoutSession $workoutSession): self
    {
        if ($this->workoutSessions->contains($workoutSession)) {
            $this->workoutSessions->removeElement($workoutSession);
            // set the owning side to null (unless already changed)
            if ($workoutSession->getTrainer() === $this) {
                $workoutSession->setTrainer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TrainerSporter[]
     */
    public function getTrainerSporters(): Collection
    {
        return $this->trainerSporters;
    }

    public function addTrainerSporter(TrainerSporter $trainerSporter): self
    {
        if (!$this->trainerSporters->contains($trainerSporter)) {
            $this->trainerSporters[] = $trainerSporter;
            $trainerSporter->setTrainer($this);
        }

        return $this;
    }

    public function removeTrainerSporter(TrainerSporter $trainerSporter): self
    {
        if ($this->trainerSporters->contains($trainerSporter)) {
            $this->trainerSporters->removeElement($trainerSporter);
            // set the owning side to null (unless already changed)
            if ($trainerSporter->getTrainer() === $this) {
                $trainerSporter->setTrainer(null);
            }
        }

        return $this;
    }
}
