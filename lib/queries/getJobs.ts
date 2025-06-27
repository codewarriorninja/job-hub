export const getJobs = async ({
    q,
    type,
    location,
  }: {
    q?: string;
    type?: string;
    location?: string;
  }) => {
    const params = new URLSearchParams();
  
    if (q) params.append("q", q);
    if (type) params.append("type", type);
    if (location) params.append("location", location);
  
    const res = await fetch(`/api/jobs?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch jobs");
  
    return res.json();
  };
  