import { Outlet } from "@remix-run/react";

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return <div>An unexpected error occurred: {error.message}</div>;
}

export default function PostsRoute() {
    return <Outlet />
}