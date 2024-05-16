import NewPostForm from '@/components/newPostForm/NewPostForm';
import { redirect } from 'next/navigation';


export default function NewPost() {

  return (
    <div>
      <h1>Create new post</h1>
      <NewPostForm
        onSuccess={async (id:string) => {
          'use server';
          redirect(`/blog/${id}`);
        }}
      />
    </div>
  );
}
