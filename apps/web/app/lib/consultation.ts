export const REVENUE_OPTIONS = [
  "Under $1 million",
  "$1 million – $5 million",
  "$5 million – $10 million",
  "$10 million – $50 million",
  "$50 million – $100 million",
  "$100 million+",
  "Prefer not to say",
] as const;

export const CONSULTATION_FIELDS = [
  { name: "name", label: "Your name", autoComplete: "name", maxLength: 100 },
  { name: "email", label: "Work email", autoComplete: "email", maxLength: 254 },
  {
    name: "role",
    label: "Your role",
    autoComplete: "organization-title",
    maxLength: 150,
  },
  {
    name: "company",
    label: "Company name",
    autoComplete: "organization",
    maxLength: 200,
  },
] as const;

export function validEmail(value: string) {
  return (
    value.length <= 254 && /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(value)
  );
}

export function parseConsultation(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const fields: Record<string, string> = {};
  for (const { name, maxLength } of CONSULTATION_FIELDS) {
    const field = input[name];
    if (
      typeof field !== "string" ||
      !field.trim() ||
      field.length > maxLength ||
      Array.from(field).some(
        (char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127,
      )
    )
      return null;
    fields[name] = field.trim();
  }
  if (
    !validEmail(fields.email!) ||
    !REVENUE_OPTIONS.includes(input.revenue as (typeof REVENUE_OPTIONS)[number])
  )
    return null;
  return {
    name: fields.name!,
    email: fields.email!,
    role: fields.role!,
    company: fields.company!,
    revenue: input.revenue as string,
  };
}
