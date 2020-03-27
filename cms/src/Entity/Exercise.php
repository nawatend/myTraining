<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ExerciseRepository")
 */
class Exercise
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
    private $imagePath;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $videoPath;

    /**
     * @ORM\Column(type="integer")
     */
    private $cardioLevel;

    /**
     * @ORM\Column(type="integer")
     */
    private $muscleLevel;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $mainInfo = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\WorkoutSession", inversedBy="exercises")
     */
    private $workoutSession;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Progress", mappedBy="exercise", orphanRemoval=true)
     */
    private $progresses;

    public function __construct()
    {
        $this->workoutSession = new ArrayCollection();
        $this->progresses = new ArrayCollection();
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

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getVideoPath(): ?string
    {
        return $this->videoPath;
    }

    public function setVideoPath(string $videoPath): self
    {
        $this->videoPath = $videoPath;

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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getMainInfo(): ?array
    {
        return $this->mainInfo;
    }

    public function setMainInfo(?array $mainInfo): self
    {
        $this->mainInfo = $mainInfo;

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

    /**
     * @return Collection|WorkoutSession[]
     */
    public function getWorkoutSession(): Collection
    {
        return $this->workoutSession;
    }

    public function addWorkoutSession(WorkoutSession $workoutSession): self
    {
        if (!$this->workoutSession->contains($workoutSession)) {
            $this->workoutSession[] = $workoutSession;
        }

        return $this;
    }

    public function removeWorkoutSession(WorkoutSession $workoutSession): self
    {
        if ($this->workoutSession->contains($workoutSession)) {
            $this->workoutSession->removeElement($workoutSession);
        }

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
            $progress->setExercise($this);
        }

        return $this;
    }

    public function removeProgress(Progress $progress): self
    {
        if ($this->progresses->contains($progress)) {
            $this->progresses->removeElement($progress);
            // set the owning side to null (unless already changed)
            if ($progress->getExercise() === $this) {
                $progress->setExercise(null);
            }
        }

        return $this;
    }
}
