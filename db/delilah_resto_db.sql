-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema delilahdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilahdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilahdb` DEFAULT CHARACTER SET utf8 ;
USE `delilahdb` ;

-- -----------------------------------------------------
-- Table `delilahdb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilahdb`.`user` ;

CREATE TABLE IF NOT EXISTS `delilahdb`.`user` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `fullname` VARCHAR(70) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `adress` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `token` TEXT NULL DEFAULT NULL,
  `is_admin` TINYINT(2) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;

INSERT INTO `delilahdb`.`user` (`user_name`, `fullname`, `email`, `phone`, `adress`, `password`, `is_admin`) VALUES ('superUser', 'Miguel Calle', 'miguelcalle@mail.com', '0123456789', 'Calle Falsa 123', 'pass0123', '1');
INSERT INTO `delilahdb`.`user` (`user_name`, `fullname`, `email`, `phone`, `adress`, `password`, `is_admin`) VALUES ('bootUser', 'Pedro Gomez', 'pedrogomez@mail.com', '9876543210', 'Carretera Falsa 456', 'word3210', '0');
INSERT INTO `delilahdb`.`user` (`user_name`, `fullname`, `email`, `phone`, `adress`, `password`, `is_admin`) VALUES ('bootUser2', 'Paco Lopez', 'pacolopez@mail.com', '2143658709', 'Avenida Falsa 789', 'pass0987', '0');

-- -----------------------------------------------------
-- Table `delilahdb`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilahdb`.`orders` ;

CREATE TABLE IF NOT EXISTS `delilahdb`.`orders` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_time` DATETIME NOT NULL DEFAULT current_timestamp(),
  `total` FLOAT NOT NULL,
  `state` VARCHAR(45) NOT NULL DEFAULT 'nuevo',
  `user_id` INT(10) UNSIGNED NOT NULL,
  `paymentmethod` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_orders_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `delilahdb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilahdb`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilahdb`.`product` ;

CREATE TABLE IF NOT EXISTS `delilahdb`.`product` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `price` FLOAT NOT NULL,
  `product_image` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;

INSERT INTO `delilahdb`.`product` (`product_name`, `price`) VALUES ('Hamburguesa Clasica', '350');
INSERT INTO `delilahdb`.`product` (`product_name`, `price`) VALUES ('Sandwich Veggie', '310');
INSERT INTO `delilahdb`.`product` (`product_name`, `price`) VALUES ('Bagel de Salmó', '425');
INSERT INTO `delilahdb`.`product` (`product_name`, `price`) VALUES ('Ensalada Veggie', '340');
INSERT INTO `delilahdb`.`product` (`product_name`, `price`) VALUES ('Focaccia', '300');
INSERT INTO `delilahdb`.`product` (`product_name`, `price`) VALUES ('Sandwich Focaccia', '440');

-- -----------------------------------------------------
-- Table `delilahdb`.`orderdetail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilahdb`.`orderdetail` ;

CREATE TABLE IF NOT EXISTS `delilahdb`.`orderdetail` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `quantity` INT(10) UNSIGNED NOT NULL,
  `subtotal` FLOAT UNSIGNED NOT NULL,
  `product_id` INT(10) UNSIGNED NOT NULL,
  `orders_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_OrderDetail_Product1_idx` (`product_id` ASC),
  INDEX `fk_orderdetail_orders1_idx` (`orders_id` ASC),
  CONSTRAINT `fk_OrderDetail_Product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `delilahdb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderdetail_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `delilahdb`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
