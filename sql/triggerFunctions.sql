DROP TRIGGER IF EXISTS change_username_trigger ON "user" CASCADE;

CREATE OR REPLACE FUNCTION change_username() RETURNS trigger AS 
$change_username_trigger$
  BEGIN
    IF NEW.username <> OLD.username THEN
      UPDATE image SET username = OLD.username WHERE image.username = NEW.username;
      UPDATE post SET username = OLD.username WHERE post.username = NEW.username;
      UPDATE group_post SET username = OLD.username WHERE group_post.username = NEW.username;
      UPDATE follow_user SET follower_id = OLD.username WHERE follow_user.follower_id = NEW.username;
      UPDATE follow_user SET followee_id = OLD.username WHERE follow_user.followee_id = NEW.username;
      UPDATE follow_animal SET follower_id = OLD.username WHERE follow_animal.follower_id = NEW.username;
      UPDATE comment SET username = OLD.username WHERE comment.username = NEW.username;
      UPDATE favorite SET username = OLD.username WHERE favorite.username = NEW.username;
    END IF; 

    RETURN NEW;
  END;
$change_username_trigger$ LANGUAGE plpgsql;

CREATE TRIGGER change_username_trigger 
AFTER UPDATE ON "user"
  FOR EACH ROW EXECUTE PROCEDURE change_username();