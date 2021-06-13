import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_content", "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const source = fs.readFileSync(fullPath, "utf8");
  const { content: markdown, data: frontmatter } = matter(source);

  frontmatter.slug = realSlug;
  frontmatter.year = slug.match(/\d\d\d\d/)[0];

  return { markdown, frontmatter };
}

export function getAllPosts() {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.published < post2.published ? -1 : 1));

  return posts;
}
