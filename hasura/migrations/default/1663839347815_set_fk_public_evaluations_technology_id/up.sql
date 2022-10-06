alter table "public"."evaluations"
  add constraint "evaluations_technology_id_fkey"
  foreign key ("technology_id")
  references "public"."technologies"
  ("id") on update restrict on delete restrict;
