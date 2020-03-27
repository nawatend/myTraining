<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\WorkoutSessionRepository")
 */
class WorkoutSession
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $imagePath;

    /**
     * @ORM\Column(type="integer")
     */
    private $cardioLevel;

    /**
     * @ORM\Column(type="integer")
     */
    private $muscleLevel;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Trainer", inversedBy="workoutSessions")
     */
    private $trainer;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Exercise", mappedBy="workoutSession")
     */
    private $exercises;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Feedback", mappedBy="workoutSession", orphanRemoval=true)
     */
    private $feedback;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\WorkoutSessionSporter", mappedBy="workoutsession", orphanRemoval=true)
     */
    private $workoutSessionSporters;

    public function __construct()
    {
        $this->exercises = new ArrayCollection();
        $this->feedback = new ArrayCollection();
        $this->workoutSessionSporters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getCardioLevel(): ?int
    {
        return $this->cardioLevel;
    }

    public function setCardioLevel(int $cardioLevel): self
    {
        $this->cardioLevel = $cardioLevel;

        return $this;
    }

    public function getMuscleLevel(): ?int
    {
        return $this->muscleLevel;
    }

    public function setMuscleLevel(int $muscleLevel): self
    {
        $this->muscleLevel = $muscleLevel;

        return $this;
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

    /**
     * @return Collection|Exercise[]
     */
    public function getExercises(): Collection
    {
        return $this->exercises;
    }

    public function addExercise(Exercise $exercise): self
    {
        if (!$this->exercises->contains($exercise)) {
            $this->exercises[] = $exercise;
            $exercise->addWorkoutSession($this);
        }

        return $this;
    }

    public function removeExercise(Exercise $exercise): self
    {
        if ($this->exercises->contains($exercise)) {
            $this->exercises->removeElement($exercise);
            $exercise->removeWorkoutSession($this);
        }

        return $this;
    }

    /**
     * @return Collection|Feedback[]
     */
    public function getFeedback(): Collection
    {
        return $this->feedback;
    }

    public function addFeedback(Feedback $feedback): self
    {
        if (!$this->feedback->contains($feedback)) {
            $this->feedback[] = $feedback;
            $feedback->setWorkoutSession($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): self
    {
        if ($this->feedback->contains($feedback)) {
            $this->feedback->removeElement($feedback);
            // set the owning side to null (unless already changed)
            if ($feedback->getWorkoutSession() === $this) {
                $feedback->setWorkoutSession(null);
            }
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
            $workoutSessionSporter->setWorkoutsession($this);
        }

        return $this;
    }

    public function removeWorkoutSessionSporter(WorkoutSessionSporter $workoutSessionSporter): self
    {
        if ($this->workoutSessionSporters->contains($workoutSessionSporter)) {
            $this->workoutSessionSporters->removeElement($workoutSessionSporter);
            // set the owning side to null (unless already changed)
            if ($workoutSessionSporter->getWorkoutsession() === $this) {
                $workoutSessionSporter->setWorkoutsession(null);
            }
        }

        return $this;
    }
}
