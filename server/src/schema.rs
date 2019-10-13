table! {
    invitations (id) {
        id -> Uuid,
        email -> Varchar,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
        middle_name -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(invitations, users,);
