import { useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/node";
import { getPost } from "../../models/post.server";

export const loader = async ({params}: LoaderArgs) => {
    return json({
        post: await getPost(params.slug!),
    });
}

export default function Post() {
    const {post} = useLoaderData<typeof loader>();
    return <main className="mx-auto max-w-4xl">
        <h1 className="my-6 border-b-2 text-center text-3xl">{post?.slug ?? "Post not found"}</h1>
    </main>
}