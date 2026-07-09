import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedScreenerResult } from '../types/screener';

const RESULT_HISTORY_KEY = '@spiral-spectrum/result-history';

export async function getSavedResults(): Promise<SavedScreenerResult[]> {
  const rawResults = await AsyncStorage.getItem(RESULT_HISTORY_KEY);

  if (!rawResults) {
    return [];
  }

  try {
    const parsedResults = JSON.parse(rawResults);

    if (!Array.isArray(parsedResults)) {
      return [];
    }

    return parsedResults.filter(isSavedScreenerResult);
  } catch {
    return [];
  }
}

export async function saveResult(
  result: Omit<SavedScreenerResult, 'id' | 'completedAt'>
): Promise<SavedScreenerResult> {
  const savedResults = await getSavedResults();

  const nextResult: SavedScreenerResult = {
    ...result,
    id: `${Date.now()}`,
    completedAt: new Date().toISOString(),
  };

  const nextResults = [nextResult, ...savedResults];

  await AsyncStorage.setItem(RESULT_HISTORY_KEY, JSON.stringify(nextResults));

  return nextResult;
}

export async function clearSavedResults(): Promise<void> {
  await AsyncStorage.removeItem(RESULT_HISTORY_KEY);
}

function isSavedScreenerResult(value: unknown): value is SavedScreenerResult {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const result = value as SavedScreenerResult;

  return (
    typeof result.id === 'string' &&
    typeof result.completedAt === 'string' &&
    typeof result.totalScore === 'number' &&
    typeof result.maxScore === 'number' &&
    Array.isArray(result.domainScores)
  );
}