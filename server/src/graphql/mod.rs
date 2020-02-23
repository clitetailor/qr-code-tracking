use juniper::{
    tests::{model::Database, schema::Query},
    EmptyMutation, RootNode,
};

pub type Schema = RootNode<'static, Query, EmptyMutation<Database>>;

pub fn schema() -> Schema {
    Schema::new(Query, EmptyMutation::<Database>::new())
}
