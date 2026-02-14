// src/i18n/he.ts — Hebrew translation bundle (complete)
import type { Translations } from './types';

const he: Translations = {
  // Home
  'home.title': "התופים של ג'ונתן",
  'home.subtitle': 'מה בא לך לעשות?',
  'home.training': 'אימון',
  'home.library': 'ספרייה',

  // Header
  'header.title': "🥁 התופים של ג'ונתן",
  'header.backLabel': 'חזרה לדף הבית',

  // Training
  'training.emptyTitle': 'אין עדיין תרגילים!',
  'training.emptyMessage': 'בקש מההורה שלך להוסיף תרגילים כדי להתחיל.',
  'training.errorTitle': 'משהו השתבש',
  'training.errorMessage': 'נסה לרענן את הדף או להתחיל מחדש.',

  // Exercise
  'exercise.progress': 'תרגיל {{current}} מתוך {{total}}',
  'exercise.pickLesson': 'בחר שיעור:',
  'exercise.pickForMe': '🎲 בחר בשבילי!',
  'exercise.done': 'סיימתי! לתרגיל הבא ←',
  'exercise.previous': '→ הקודם',
  'exercise.startOver': 'התחל מחדש',
  'exercise.changeLesson': '→ בחר שיעור אחר',
  'exercise.noLessonsTitle': 'אין שיעורים זמינים',
  'exercise.noLessonsMessage': 'לתרגיל הזה אין שיעורים. בקש מההורה שלך לבדוק את ההגדרות.',

  // Completion
  'completion.title': 'כל הכבוד!',
  'completion.fallbackMessage': 'עבודה מעולה היום!',
  'completion.startAgain': '🔄 התחל שוב',

  // Library
  'library.title': 'ספרייה',
  'library.lessonCount_one': 'שיעור {{count}} לגלות',
  'library.lessonCount_other': '{{count}} שיעורים לגלות',
  'library.searchResultCount_one': 'תוצאה {{count}} עבור "{{query}}"',
  'library.searchResultCount_other': '{{count}} תוצאות עבור "{{query}}"',
  'library.emptyTitle': 'הספרייה ריקה',
  'library.emptyMessage': 'אין עדיין שיעורים! בקש מההורה שלך להוסיף.',
  'library.noResultsTitle': 'לא נמצאו שיעורים',
  'library.noResultsMessage': 'נסה מילים אחרות או בדוק את האיות!',
  'library.filterAll': 'הכל',
  'library.filterSongs': 'שירים',
  'library.filterBeats': 'ביטים',
  'library.filterFundamentals': 'בסיס',
  'library.filterAriaLabel': 'סינון לפי סוג שיעור',

  // Library List
  'libraryList.songs': 'שירים',
  'libraryList.beats': 'ביטים',
  'libraryList.fundamentals': 'בסיס',
  'libraryList.emptyTitle': 'אין עדיין שיעורים',
  'libraryList.emptyMessage': 'לא נמצאו שיעורים. בקש מההורה שלך להוסיף!',

  // Lesson Detail
  'lessonDetail.backToLibrary': 'חזרה לספרייה →',
  'lessonDetail.links': 'קישורים',
  'lessonDetail.notFoundTitle': 'שיעור לא נמצא',
  'lessonDetail.notFoundMessage': 'לא הצלחנו למצוא שיעור עם מזהה "{{id}}". ייתכן שהוא הוסר.',

  // Lesson Types
  'lessonType.song': 'שיר',
  'lessonType.drumBeat': 'ביט תופים',
  'lessonType.fundamental': 'יסודות',

  // Difficulty
  'difficulty.beginner': 'מתחיל',
  'difficulty.intermediate': 'בינוני',
  'difficulty.advanced': 'מתקדם',

  // Themes
  'theme.ocean': 'אוקיינוס',
  'theme.sunset': 'שקיעה',
  'theme.toggleAriaLabel': 'ערכת נושא נוכחית: {{label}}. הקש להחלפה.',
  'theme.toggleTitle': 'ערכת נושא: {{label}}',

  // Search
  'search.placeholder': 'חיפוש שיעורים…',
  'search.ariaLabel': 'חיפוש שיעורים',
  'search.clearAriaLabel': 'נקה חיפוש',
  'search.matchTitle': 'נמצא בכותרת',
  'search.matchDescription': 'נמצא בתיאור',
  'search.matchLink': 'נמצא בקישור',

  // YouTube
  'youtube.openOnYouTube': 'פתח ביוטיוב',
  'youtube.openFallback': 'פתח את הסרטון ביוטיוב',

  // Language
  'language.switchAriaLabel': 'החלף שפה',

  // Meta
  'meta.title': "התופים של ג'ונתן",
  'meta.description': "אימון ספריית התופים של ג'ונתן",
  'meta.noscript': 'האפליקציה הזו צריכה JavaScript כדי לעבוד. הפעל JavaScript בהגדרות הדפדפן.',
};

export default he;
