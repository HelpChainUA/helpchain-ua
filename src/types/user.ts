export type UserData = {
  id?: number;
  isLoggedIn: boolean;
  firstName?: string;
  lastName?: string;
  onboardingStep?: number;
  ageRange?: AgeRange;
  locationId?: string;
  locationLabel?: string;
  jobSearchLocations?: string[];
  willingToRelocate?: boolean;
  housingAssistancePreference?: HousingAssistancePreference;
  targetJobs?: string[];
  opportunities?: OpportunityType[];
  employmentTypes?: EmploymentTypePreference[];
  salary?: string;
};

export type AgeRange =
  | "AGE_18_24"
  | "AGE_25_29"
  | "AGE_30_34"
  | "AGE_35_39"
  | "AGE_40_44"
  | "AGE_45_54"
  | "AGE_55_PLUS";

export type HousingAssistancePreference =
  | "NO"
  | "JOB_WITH_HOUSING_ONLY"
  | "NEED_HELP_MOVING"
  | "CONSIDERING_OPTIONS";

export type OpportunityType =
  | "COURSES"
  | "ENGLISH_CLASSES"
  | "INTERNSHIPS"
  | "PAID_WORK_ONLY";

export type EmploymentTypePreference =
  | "FULL_TIME"
  | "PART_TIME"
  | "BOTH_FLEXIBLE";
