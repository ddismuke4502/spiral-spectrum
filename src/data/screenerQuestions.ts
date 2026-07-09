import { ScreenerQuestion } from '../types/screener';

export const screenerQuestions: ScreenerQuestion[] = [
  {
    id: 1,
    domain: 'social',
    text: 'I often feel like I have to study social situations instead of understanding them automatically.',
  },
  {
    id: 2,
    domain: 'sensoryMotor',
    text: 'Certain sounds, lights, textures, or smells can affect me more strongly than they seem to affect others.',
  },
  {
    id: 3,
    domain: 'focusedInterests',
    text: 'I can spend a long time learning about a specific topic because it feels deeply interesting or important to me.',
  },
  {
    id: 4,
    domain: 'communication',
    text: 'I sometimes need extra time to understand what someone really wants from a conversation.',
  },
  {
    id: 5,
    domain: 'social',
    text: 'Group conversations can feel difficult to follow, especially when multiple people speak quickly.',
  },
  {
    id: 6,
    domain: 'focusedInterests',
    text: 'Unexpected changes to plans or routines can feel disruptive, even when the change is small.',
  },
  {
    id: 7,
    domain: 'communication',
    text: 'I sometimes rehearse or plan what I am going to say before speaking with someone.',
  },
  {
    id: 8,
    domain: 'sensoryMotor',
    text: 'I may notice small visual details, sounds, or patterns that other people do not seem to notice.',
  },
  {
    id: 9,
    domain: 'social',
    text: 'I usually understand facial expressions and body language without needing to think about them.',
    reverseScored: true,
  },
  {
    id: 10,
    domain: 'communication',
    text: 'I sometimes take language literally when other people expect me to infer a hidden meaning.',
  },
  {
    id: 11,
    domain: 'focusedInterests',
    text: 'I prefer when tasks, expectations, or instructions are clear and predictable.',
  },
  {
    id: 12,
    domain: 'sensoryMotor',
    text: 'When I am overwhelmed, I may need quiet, space, movement, or another way to reset.',
  },
  {
    id: 13,
    domain: 'social',
    text: 'After social events, I may need time alone to recover my energy.',
  },
  {
    id: 14,
    domain: 'communication',
    text: 'It can be hard for me to know when it is my turn to speak in a conversation.',
  },
  {
    id: 15,
    domain: 'focusedInterests',
    text: 'I can become uncomfortable when I am pulled away from something I am deeply focused on.',
  },
  {
    id: 16,
    domain: 'sensoryMotor',
    text: 'I often feel physically comfortable in many different environments without needing adjustments.',
    reverseScored: true,
  },
];