<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200316212947 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sporter DROP FOREIGN KEY FK_64E3DFFC9D86650F');
        $this->addSql('DROP INDEX UNIQ_64E3DFFC9D86650F ON sporter');
        $this->addSql('ALTER TABLE sporter CHANGE user_id_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE sporter ADD CONSTRAINT FK_64E3DFFCA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64E3DFFCA76ED395 ON sporter (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sporter DROP FOREIGN KEY FK_64E3DFFCA76ED395');
        $this->addSql('DROP INDEX UNIQ_64E3DFFCA76ED395 ON sporter');
        $this->addSql('ALTER TABLE sporter CHANGE user_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE sporter ADD CONSTRAINT FK_64E3DFFC9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64E3DFFC9D86650F ON sporter (user_id_id)');
    }
}
