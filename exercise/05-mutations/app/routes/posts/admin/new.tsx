// 🐨 implement the action function here.
// 1. accept the request object
// 2. get the formData from the request
// 3. get the title, slug, and markdown from the formData
// 4. call the createPost function from your post.model.ts
// 5. redirect to "/posts/admin".

import { Form, useActionData } from "@remix-run/react";
import { ActionArgs, json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createPost } from "../../../models/post.server";
import invariant from "tiny-invariant";


export async function action({request}: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  invariant(typeof title === "string", "title isn't a string");
  const slug = formData.get('slug');
  invariant(typeof slug === "string", "slug isn't a string");
  const markdown = formData.get('markdown');
  invariant(typeof markdown === "string", "markdown isn't a string");

  const errors = {
    title: !title ? "Title required" : "",
    slug: !slug ? "Slug required" : "",
    markdown: !markdown ? "Markdown required": "",
  }

  const hasErrors = Object.values(errors).some((error) => error !== "");
  if (hasErrors) {
    return json(errors);
  }
  
  const newPost = await createPost(title, slug, markdown);
  return redirect(`/posts/${newPost.slug}`);
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData<typeof action>();
  
  return (
    // 🐨 change this to a <Form /> component from @remix-run/react
    // 🐨 and add method="post" to the form.
    <Form method="post" >
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input type="text" name="slug" className={inputClassName} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
