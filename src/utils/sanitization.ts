/**
 * Sanitizes an optional string value.
 * Converts undefined, null, empty strings, or whitespace-only strings to null.
 * Trims non-empty strings.
 */
export function sanitizeString(value?: string | null): string | null {
  if (value === undefined || value === null) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Validates and sanitizes a date string for PostgreSQL DATE type.
 * Returns the trimmed date string if valid (non-empty and parseable date), otherwise null.
 * Prevents PostgreSQL syntax errors such as "invalid input syntax for type date: ''".
 */
export function sanitizeDate(value?: string | null): string | null {
  const sanitized = sanitizeString(value);
  if (!sanitized) return null;

  const parsed = Date.parse(sanitized);
  if (isNaN(parsed)) return null;

  return sanitized;
}

/**
 * Required fields payload interface for onboarding profile validation.
 */
export interface ProfileOnboardingFields {
  fullName: string;
  dateOfBirth: string;
  location: string;
  jobTitle: string;
  networkingGoal: string;
  profileVisibility: string;
  selectedSkills: string[];
}

/**
 * Validates all required onboarding fields before submitting data to Supabase.
 * Returns a user-friendly error message if validation fails, or null if valid.
 */
export function validateOnboardingData(data: ProfileOnboardingFields): string | null {
  if (!sanitizeString(data.fullName)) {
    return "Please enter your full name.";
  }

  if (!sanitizeDate(data.dateOfBirth)) {
    return "Please select your date of birth.";
  }

  if (!sanitizeString(data.location)) {
    return "Please enter your location.";
  }

  if (!sanitizeString(data.jobTitle)) {
    return "Please enter your profession.";
  }

  if (!sanitizeString(data.networkingGoal)) {
    return "Please select what you are looking for.";
  }

  if (!sanitizeString(data.profileVisibility)) {
    return "Please select profile visibility.";
  }

  if (!Array.isArray(data.selectedSkills) || data.selectedSkills.length < 3) {
    return "Please select at least 3 skills.";
  }

  return null;
}
