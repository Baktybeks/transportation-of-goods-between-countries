import { getAllPost, getPostById } from '@/services/posts';
import { removePost } from '@/app/blog/actions';
import { Metadata } from 'next';
import Link from 'next/link';


interface Props {
    params:{
        id:string
    }
}

export async function generateStaticParams() {
  const posts:Post[] = await getAllPost();
  return posts.map(post => ({ slug: post.id.toString() }));
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const post = await getPostById(id);
  if (post) {
    return { title: post.title };
  } else {
    throw new Error('Post not found');
  }
}

export default async function Post({ params: { id } }: Props) {
  const post = await getPostById(id);
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <form action={removePost.bind(null, id)}>
        <input type="submit" value="delete post"/>
      </form>
      <Link href={`/blog/${id}/edit`}>Edit</Link>
    </>
  );
}
