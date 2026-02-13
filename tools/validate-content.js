#!/usr/bin/env node

// tools/validate-content.js — Build-time YAML content validation
// Validates content/lessons.yaml and content/training.yaml against
// JSON schemas and checks lesson reference integrity.
//
// Usage: node tools/validate-content.js
// Exit code: 0 on success, 1 on validation errors
//
// Uses dev dependencies only (js-yaml, ajv) — not in the browser bundle.

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- File paths ---
const LESSONS_PATH = resolve(ROOT, 'content/lessons.yaml');
const TRAINING_PATH = resolve(ROOT, 'content/training.yaml');
const LESSON_SCHEMA_PATH = resolve(ROOT, 'specs/001-drums-training-site/contracts/lesson-schema.json');
const TRAINING_SCHEMA_PATH = resolve(ROOT, 'specs/001-drums-training-site/contracts/training-schema.json');

// --- Helpers ---
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function error(msg) {
  console.error(`${RED}  ✗ ${msg}${RESET}`);
}

function warn(msg) {
  console.warn(`${YELLOW}  ⚠ ${msg}${RESET}`);
}

function success(msg) {
  console.log(`${GREEN}  ✓ ${msg}${RESET}`);
}

function heading(msg) {
  console.log(`\n${BOLD}${msg}${RESET}`);
}

// --- Load files ---
function loadYaml(filePath, label) {
  try {
    const raw = readFileSync(filePath, 'utf-8');
    return yaml.load(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      error(`${label} not found: ${filePath}`);
    } else if (err instanceof yaml.YAMLException) {
      error(`YAML syntax error in ${label}:`);
      console.error(`    ${err.message}`);
    } else {
      error(`Failed to read ${label}: ${err.message}`);
    }
    return null;
  }
}

function loadJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (err) {
    error(`Failed to load ${label}: ${err.message}`);
    return null;
  }
}

// --- Validation ---
let hasErrors = false;

heading('Validating Jonathan\'s Drums content...');

// 1. Load schemas
const lessonSchema = loadJson(LESSON_SCHEMA_PATH, 'lesson-schema.json');
const trainingSchema = loadJson(TRAINING_SCHEMA_PATH, 'training-schema.json');

if (!lessonSchema || !trainingSchema) {
  console.error(`\n${RED}${BOLD}Schema files missing — cannot validate.${RESET}\n`);
  process.exit(1);
}

// Set up Ajv (validateFormats: false — we don't need ajv-formats for URI checks;
// YouTube URLs are already validated via the pattern property)
const ajv = new Ajv({ allErrors: true, validateFormats: false });
const validateLesson = ajv.compile(lessonSchema);
const validateTraining = ajv.compile(trainingSchema);

// 2. Validate lessons.yaml
heading('content/lessons.yaml');

const lessonsData = loadYaml(LESSONS_PATH, 'content/lessons.yaml');

if (!lessonsData) {
  hasErrors = true;
} else if (!Array.isArray(lessonsData)) {
  error('lessons.yaml must be a YAML array of lesson objects');
  hasErrors = true;
} else {
  // Validate each lesson against schema
  const lessonIds = new Set();
  let lessonErrors = 0;

  for (let i = 0; i < lessonsData.length; i++) {
    const lesson = lessonsData[i];
    const label = lesson.id ? `"${lesson.id}"` : `(entry ${i + 1})`;

    // Check for duplicate IDs
    if (lesson.id) {
      if (lessonIds.has(lesson.id)) {
        error(`Duplicate lesson ID: ${label} — each lesson must have a unique id`);
        lessonErrors++;
      }
      lessonIds.add(lesson.id);
    }

    // JSON Schema validation
    const valid = validateLesson(lesson);
    if (!valid) {
      for (const err of validateLesson.errors) {
        const path = err.instancePath || '(root)';
        error(`Lesson ${label} → ${path}: ${err.message}`);
      }
      lessonErrors++;
    }
  }

  if (lessonErrors === 0) {
    success(`${lessonsData.length} lessons validated successfully`);
  } else {
    hasErrors = true;
  }
}

// 3. Validate training.yaml
heading('content/training.yaml');

const trainingData = loadYaml(TRAINING_PATH, 'content/training.yaml');

if (!trainingData) {
  hasErrors = true;
} else {
  // JSON Schema validation
  const valid = validateTraining(trainingData);
  if (!valid) {
    for (const err of validateTraining.errors) {
      const path = err.instancePath || '(root)';
      error(`training.yaml → ${path}: ${err.message}`);
    }
    hasErrors = true;
  } else {
    success(`${trainingData.exercises.length} exercises validated against schema`);
  }

  // 4. Lesson reference integrity
  if (lessonsData && Array.isArray(lessonsData) && trainingData?.exercises) {
    heading('Reference integrity');

    const validLessonIds = new Set(lessonsData.map((l) => l.id).filter(Boolean));
    let refErrors = 0;

    for (const exercise of trainingData.exercises) {
      if (!exercise.lessons) continue;
      for (const lessonId of exercise.lessons) {
        if (!validLessonIds.has(lessonId)) {
          error(
            `Exercise "${exercise.id}" references unknown lesson "${lessonId}" — ` +
            `this ID does not exist in content/lessons.yaml`
          );
          refErrors++;
        }
      }
    }

    if (refErrors === 0) {
      success('All exercise → lesson references are valid');
    } else {
      hasErrors = true;
    }
  }
}

// 5. Summary
heading('Result');

if (hasErrors) {
  console.error(`${RED}${BOLD}Validation failed — fix the errors above before building.${RESET}\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}All content is valid! ✓${RESET}\n`);
  process.exit(0);
}
