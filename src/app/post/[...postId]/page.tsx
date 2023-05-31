import { Metadata } from "next";

interface PageProps {
  params: { postId: string };
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export function generateStaticParams() {
  return [
    { postId: ["a", "1"] },
    { postId: ["b", "2"] },
    { postId: ["c", "3"] },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = (await res.json()) as Post;

  return { title: data.title };
}

// 함수는 하나의 객체 매개변수를 받으며, 이 객체는 params라는 속성을 가짐
// params라는 속성은 다시 하나의 객체를 값으로 가지며, 그 객체는 postId라는 속성을 가지고 있음
const page = ({ params }: { params: { postId: string[] } }) => {
  const { postId } = params;
};

export default page;
