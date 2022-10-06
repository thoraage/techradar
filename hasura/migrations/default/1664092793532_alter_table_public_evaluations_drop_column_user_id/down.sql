alter table "public"."evaluations" add constraint "evaluations_technology_field_id_technology_id_user_id_key" unique (technology_field_id, technology_id, user_id);
alter table "public"."evaluations"
  add constraint "evaluations_user_id_fkey"
  foreign key (user_id)
  references "public"."users"
  (id) on update restrict on delete restrict;
alter table "public"."evaluations" alter column "user_id" drop not null;
alter table "public"."evaluations" add column "user_id" int4;
