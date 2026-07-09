import axios from 'axios';
import { defaultResources } from '../data/defaultResources';
import { EducationalResource } from '../types/resource';

const RESOURCES_URL =
  process.env.EXPO_PUBLIC_RESOURCES_URL ??
  'https://raw.githubusercontent.com/ddismuke4502/spiral-spectrum/main/src/data/resources.json';

function isValidResource(value: unknown): value is EducationalResource {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const resource = value as EducationalResource;

  return (
    typeof resource.id === 'string' &&
    typeof resource.title === 'string' &&
    typeof resource.description === 'string' &&
    typeof resource.source === 'string' &&
    typeof resource.url === 'string'
  );
}

export async function fetchEducationalResources(): Promise<EducationalResource[]> {
  try {
    const response = await axios.get<unknown>(RESOURCES_URL, {
      timeout: 6000,
    });

    if (!Array.isArray(response.data)) {
      return defaultResources;
    }

    const resources = response.data.filter(isValidResource);

    return resources.length > 0 ? resources : defaultResources;
  } catch {
    return defaultResources;
  }
}