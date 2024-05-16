import { getAllPost } from '@/services/posts';
import { Post } from '@/common/types/api';
import { Metadata } from 'next';
import Link from 'next/link';


export const metadata: Metadata = { title: 'Blog | Next App' };


export default async function Blog() {
  const posts = await getAllPost();
  return <>
    <h1>Blog page</h1>

    <ul className="posts">
      {posts.map((post: Post) => (
        <li key={post.id} className="post-item">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>

    <Link href="/blog/new" className="add-new">
            Add new post
    </Link>
  </>;
}
