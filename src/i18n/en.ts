// src/i18n/en.ts — English translation bundle
import type { Translations } from './types';

const en: Translations = {
  // Home
  'home.title': "Jonathan's Drums",
  'home.subtitle': 'What do you want to do?',
  'home.training': 'Training',
  'home.library': 'Library',

  // Header
  'header.title': "🥁 Jonathan's Drums",
  'header.backLabel': 'Go to home',

  // Training
  'training.emptyTitle': 'No exercises set up yet!',
  'training.emptyMessage': 'Ask your parent to add some exercises to get started.',
  'training.errorTitle': 'Something went wrong',
  'training.errorMessage': 'Try refreshing the page or starting a new session.',

  // Exercise
  'exercise.progress': 'Exercise {{current}} of {{total}}',
  'exercise.pickLesson': 'Pick a lesson:',
  'exercise.pickForMe': '🎲 Pick for me!',
  'exercise.done': 'Done! Next exercise →',
  'exercise.previous': '← Previous',
  'exercise.startOver': 'Start over',
  'exercise.changeLesson': '← Pick a different lesson',
  'exercise.noLessonsTitle': 'No lessons available',
  'exercise.noLessonsMessage': 'This exercise has no valid lessons. Ask your parent to check the training config.',

  // Completion
  'completion.title': 'Amazing Job!',
  'completion.fallbackMessage': 'Great job today!',
  'completion.startAgain': '🔄 Start Again',

  // Library
  'library.title': 'Library',
  'library.lessonCount_one': '{{count}} lesson to explore',
  'library.lessonCount_other': '{{count}} lessons to explore',
  'library.searchResultCount_one': '{{count}} result for "{{query}}"',
  'library.searchResultCount_other': '{{count}} results for "{{query}}"',
  'library.emptyTitle': 'Library is empty',
  'library.emptyMessage': 'No lessons set up yet! Ask your parent to add some.',
  'library.noResultsTitle': 'No lessons found',
  'library.noResultsMessage': 'Try different words or check your spelling!',
  'library.filterAll': 'All',
  'library.filterSongs': 'Songs',
  'library.filterBeats': 'Beats',
  'library.filterFundamentals': 'Fundamentals',
  'library.filterAriaLabel': 'Filter by lesson type',

  // Library List
  'libraryList.songs': 'Songs',
  'libraryList.beats': 'Drum Beats',
  'libraryList.fundamentals': 'Fundamentals',
  'libraryList.emptyTitle': 'No lessons yet',
  'libraryList.emptyMessage': 'No lessons found. Ask your parent to add some!',

  // Lesson Detail
  'lessonDetail.backToLibrary': '← Back to Library',
  'lessonDetail.links': 'Links',
  'lessonDetail.notFoundTitle': 'Lesson not found',
  'lessonDetail.notFoundMessage': 'We couldn\'t find a lesson with ID "{{id}}". It might have been removed.',

  // Lesson Types
  'lessonType.song': 'Song',
  'lessonType.drumBeat': 'Drum Beat',
  'lessonType.fundamental': 'Fundamental',

  // Difficulty
  'difficulty.beginner': 'Beginner',
  'difficulty.intermediate': 'Intermediate',
  'difficulty.advanced': 'Advanced',

  // Themes
  'theme.ocean': 'Ocean',
  'theme.sunset': 'Sunset',
  'theme.toggleAriaLabel': 'Current theme: {{label}}. Tap to switch.',
  'theme.toggleTitle': 'Theme: {{label}}',

  // Search
  'search.placeholder': 'Search lessons…',
  'search.ariaLabel': 'Search lessons',
  'search.clearAriaLabel': 'Clear search',
  'search.matchTitle': 'Matched in title',
  'search.matchDescription': 'Matched in description',
  'search.matchLink': 'Matched in link',

  // YouTube
  'youtube.openOnYouTube': 'Open on YouTube',
  'youtube.openFallback': 'Open video on YouTube',

  // Language
  'language.switchAriaLabel': 'Switch language',

  // Meta
  'meta.title': "Jonathan's Drums",
  'meta.description': "Jonathan's Drums Training & Library",
  'meta.noscript': 'This app needs JavaScript to run. Please enable JavaScript in your browser settings.',
};

export default en;
