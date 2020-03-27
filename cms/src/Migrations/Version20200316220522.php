<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200316220522 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE feedback (id INT AUTO_INCREMENT NOT NULL, sender_id INT NOT NULL, workout_session_id INT NOT NULL, message LONGTEXT NOT NULL, rate INT DEFAULT NULL, seen TINYINT(1) NOT NULL, INDEX IDX_D2294458F624B39D (sender_id), INDEX IDX_D2294458D1BA355 (workout_session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE progress (id INT AUTO_INCREMENT NOT NULL, sporter_id INT NOT NULL, exercise_id INT NOT NULL, date VARCHAR(255) NOT NULL, value JSON NOT NULL, INDEX IDX_2201F246E53C25F2 (sporter_id), INDEX IDX_2201F246E934951A (exercise_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458F624B39D FOREIGN KEY (sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458D1BA355 FOREIGN KEY (workout_session_id) REFERENCES workout_session (id)');
        $this->addSql('ALTER TABLE progress ADD CONSTRAINT FK_2201F246E53C25F2 FOREIGN KEY (sporter_id) REFERENCES sporter (id)');
        $this->addSql('ALTER TABLE progress ADD CONSTRAINT FK_2201F246E934951A FOREIGN KEY (exercise_id) REFERENCES exercise (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE feedback');
        $this->addSql('DROP TABLE progress');
    }
}
