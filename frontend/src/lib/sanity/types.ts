export type ProjectStatus = "planned" | "active" | "completed";

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  coverImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
    alt?: string;
  };
  relatedLinks?: Array<{
    _key: string;
    title: string;
    url: string;
  }>;
};
