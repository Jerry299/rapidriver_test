// I would be using fetch and not axios as the project made little HTTP requests and there is no need to add a dependency
import { getCommentsUrl } from "./url";

export interface CommentsProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getComments = async (): Promise<CommentsProps[]> => {
  const res = await fetch(`${getCommentsUrl}`);
  const result = res.json();
  return result;
};

export const postComment = async ({ postId, id, name, email, text }) => {
  const res = await fetch(`${getCommentsUrl}`, {
    method: "POST",
    body: JSON.stringify({
      postId,
      id,
      name,
      email,
      text,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = res.json();
  return result;
};
