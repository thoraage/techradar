alter table "public"."evaluations" add constraint "evaluations_technology_field_id_technology_id_user_id_key" unique ("technology_field_id", "technology_id", "user_id");
