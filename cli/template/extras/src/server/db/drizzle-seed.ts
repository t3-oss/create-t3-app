import { db } from ".";
import { posts } from "./schema";

const firstPost = await db.insert(posts).values({
    name: "My first blog post",
});