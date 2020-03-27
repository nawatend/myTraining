<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200323225949 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE trainer_sporter (id INT AUTO_INCREMENT NOT NULL, trainer_id INT NOT NULL, sporter_id INT NOT NULL, INDEX IDX_A8DCE633FB08EDF6 (trainer_id), UNIQUE INDEX UNIQ_A8DCE633E53C25F2 (sporter_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE workout_session_sporter (id INT AUTO_INCREMENT NOT NULL, workoutsession_id INT NOT NULL, sporter_id INT NOT NULL, INDEX IDX_B8167769E792A96 (workoutsession_id), INDEX IDX_B8167769E53C25F2 (sporter_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE trainer_sporter ADD CONSTRAINT FK_A8DCE633FB08EDF6 FOREIGN KEY (trainer_id) REFERENCES trainer (id)');
        $this->addSql('ALTER TABLE trainer_sporter ADD CONSTRAINT FK_A8DCE633E53C25F2 FOREIGN KEY (sporter_id) REFERENCES sporter (id)');
        $this->addSql('ALTER TABLE workout_session_sporter ADD CONSTRAINT FK_B8167769E792A96 FOREIGN KEY (workoutsession_id) REFERENCES workout_session (id)');
        $this->addSql('ALTER TABLE workout_session_sporter ADD CONSTRAINT FK_B8167769E53C25F2 FOREIGN KEY (sporter_id) REFERENCES sporter (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE trainer_sporter');
        $this->addSql('DROP TABLE workout_session_sporter');
    }
}
