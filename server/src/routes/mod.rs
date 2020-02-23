pub mod graphql;

pub use rocket::Route;

pub fn routes() -> Vec<Route> {
    vec![graphql::routes()].concat()
}
