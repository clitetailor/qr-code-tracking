use juniper::tests::model::Database;
use rocket::{response::content, Route, State};

use crate::graphql::Schema;

pub fn routes() -> Vec<Route> {
    routes![graphql_playground, post_graphql_handler]
}

#[rocket::get("/graphql")]
fn graphql_playground() -> content::Html<String> {
    juniper_rocket::playground_source("/graphql")
}

#[rocket::post("/graphql", data = "<request>")]
fn post_graphql_handler(
    context: State<Database>,
    request: juniper_rocket::GraphQLRequest,
    schema: State<Schema>,
) -> juniper_rocket::GraphQLResponse {
    request.execute(&schema, &context)
}

#[rocket::get("/graphql?<request>")]
fn get_graphql_handler(
    context: State<Database>,
    request: juniper_rocket::GraphQLRequest,
    schema: State<Schema>,
) -> juniper_rocket::GraphQLResponse {
    request.execute(&schema, &context)
}
