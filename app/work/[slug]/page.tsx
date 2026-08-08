import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/ProjectPage";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectIndex,
} from "@/lib/data/projects";
import { SITE_NAME } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: `Not Found — ${SITE_NAME}` };
  }

  return {
    title: `${project.title} — ${SITE_NAME}`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const index = getProjectIndex(slug);

  return (
    <main className="pt-16">
      <ProjectPage project={project} index={index} />
    </main>
  );
}
