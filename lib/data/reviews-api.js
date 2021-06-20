import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const reviewsDirectory = join(process.cwd(), "_content", "reviews");

export function getReviewSlugs() {
  return fs.readdirSync(reviewsDirectory);
}

export function getReviewsBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(reviewsDirectory, `${realSlug}.md`);
  const source = fs.readFileSync(fullPath, "utf8");
  const { content: markdown, data: frontmatter } = matter(source);

  frontmatter.slug = realSlug;
  frontmatter.year = slug.match(/\d\d\d\d/)[0];

  return { markdown, frontmatter };
}

export function getAllReviews() {
  const slugs = getReviewSlugs();

  const posts = slugs
    .map((slug) => getReviewsBySlug(slug))
    .sort((post1, post2) => (post1.published < post2.published ? -1 : 1));

  return posts;
}
