export interface FiltersJobsType {}

export type PropertyCategory =
  'positionLevel' | 'employmentType' | 'workMode' | 'salary' | 'city' | 'jobThemes';

export type SelectedFilters = Record<PropertyCategory, Set<string>>;
