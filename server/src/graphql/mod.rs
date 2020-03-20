use juniper::{EmptyMutation, RootNode};

use crate::model::query::Query;

pub type Schema = RootNode<'static, Query, EmptyMutation<()>>;

pub fn schema() -> Schema {
    Schema::new(Query, EmptyMutation::<()>::new())
}
