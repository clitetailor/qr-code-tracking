#![feature(decl_macro, proc_macro_hygiene)]

#[macro_use]
extern crate rocket;

mod graphql;
mod routes;

use juniper::tests::model::Database;

fn main() {
    rocket::ignite()
        .manage(Database::new())
        .manage(graphql::schema())
        .mount("/", routes::routes())
        .launch();
}
