use juniper;

use juniper::FieldResult;

use crate::model::post::Post;

pub struct Query;

#[juniper::object]
impl Query {
    fn get_posts() -> FieldResult<Vec<Post>> {
        Ok(vec![
            Post {
                title: String::from("Hello, World"),
                content: String::from("This is the first post from Juniper GraphQL")
            }
        ])
    }
}
