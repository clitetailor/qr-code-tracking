#![feature(decl_macro, proc_macro_hygiene)]

#[macro_use]
extern crate rocket;

mod database;
mod graphql;
mod model;
mod routes;

use dotenv::dotenv;

fn main() {
    dotenv().ok();

    rocket::ignite()
        .manage(graphql::schema())
        .mount("/", routes::routes())
        .launch();
}
