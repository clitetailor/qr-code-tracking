use juniper;

#[derive(juniper::GraphQLObject)]
pub struct Post {
    pub title: String,
    pub content: String,
}
