table! {
    credentials (id) {
        id -> Uuid,
        email -> Varchar,
        user_id -> Int4,
        salt -> Varchar,
        pass_hash -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

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

joinable!(credentials -> users (user_id));

allow_tables_to_appear_in_same_query!(credentials, invitations, users,);
