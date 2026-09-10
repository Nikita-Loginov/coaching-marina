import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/shared/config/seo.config";

import { getPrograms } from "@/entities/program/model/program.queries";
import { getTeams } from "@/entities/team/model/team.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  const [programs, teams] = await Promise.all([getPrograms(), getTeams()]);

  const programUrls: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.id}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...programUrls,
    {
      url: `${baseUrl}/education`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/legal`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    
  ];
}
