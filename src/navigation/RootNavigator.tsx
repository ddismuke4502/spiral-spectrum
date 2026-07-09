import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { TestScreen } from '../screens/TestScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ResourcesScreen } from '../screens/ResourcesScreen';
import type { DomainScore } from '../types/screener';

export type RootStackParamList = {
  Welcome: undefined;
  Test: undefined;
  Results: {
    totalScore: number;
    maxScore: number;
    domainScores: DomainScore[];
  };
  History: undefined;
  Resources: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#101014',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: '#08080B',
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: 'Spiral Spectrum' }}
      />

      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ title: 'Screening Test' }}
      />

      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Results' }}
      />

      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'History' }}
      />

      <Stack.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{ title: 'Resources' }}
      />
    </Stack.Navigator>
  );
}