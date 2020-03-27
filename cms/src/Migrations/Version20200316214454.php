<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200316214454 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE exercise (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, image_path VARCHAR(255) NOT NULL, video_path VARCHAR(255) NOT NULL, cardio_level INT NOT NULL, muscle_level INT NOT NULL, type VARCHAR(255) DEFAULT NULL, main_info JSON DEFAULT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE exercise_workout_session (exercise_id INT NOT NULL, workout_session_id INT NOT NULL, INDEX IDX_FC788572E934951A (exercise_id), INDEX IDX_FC788572D1BA355 (workout_session_id), PRIMARY KEY(exercise_id, workout_session_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE exercise_workout_session ADD CONSTRAINT FK_FC788572E934951A FOREIGN KEY (exercise_id) REFERENCES exercise (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE exercise_workout_session ADD CONSTRAINT FK_FC788572D1BA355 FOREIGN KEY (workout_session_id) REFERENCES workout_session (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE exercise_workout_session DROP FOREIGN KEY FK_FC788572E934951A');
        $this->addSql('DROP TABLE exercise');
        $this->addSql('DROP TABLE exercise_workout_session');
    }
}
