import React, { useEffect, useState } from "react";

/**

* 45-Day Sprint Checklist - TSX
*
* Usage:
* * Save as 45-day-sprint.tsx in your React project.
* * Import and render: <Sprint45 />
*
* Features:
* * Daily tasks for 45 days (detailed items)
* * Check/uncheck tasks (state persisted to localStorage)
* * Filter by week or search by keyword
* * Export checklist progress as CSV
* * Progress bar and stats
*
* Note: This file is self-contained and uses plain inline styles to avoid external CSS libs.
  */

/* -------------------------
Data: 45 days of tasks
Each day is an object: { day: number, week: number, title, tasks: [ ... ] }
------------------------- */

type TaskItem = {
id: string;
label: string;
done?: boolean;
};

type Day = {
day: number;
week: number;
title: string;
tasks: TaskItem[];
};

const makeId = (d: number, i: number) => `d${d}_t${i}`;

const DAYS: Day[] = (() => {
const days: Day[] = [];
// Helper to push Day
const pushDay = (dayNum: number, weekNum: number, title: string, tasks: string[]) => {
const taskObjs = tasks.map((t, i) => ({ id: makeId(dayNum, i + 1), label: t, done: false }));
days.push({ day: dayNum, week: weekNum, title, tasks: taskObjs });
};

/* Week 1: Knowledge ingestion & baseline */
pushDay(1, 1, "Project kickoff & file audit", [
"Create project folder & repo (placeholder)",
"Inventory all WA PDFs uploaded (CRARMF, Tools 1-5, Practice Guidelines)",
"Standardize filenames and create metadata spreadsheet (title, year, doc_type)",
]);
pushDay(2, 1, "Design metadata schema and chunk plan", [
"Set chunk size (recommend 500-750 tokens) and overlap (50-80)",
"Define metadata fields: doc_title, tool_number, section, page_range, jurisdiction",
"Prepare CSV manifest for ingestion",
]);
pushDay(3, 1, "PDF cleaning & OCR (if needed)", [
"Run OCR on scanned PDFs or images",
"Extract text and validate readability",
"Fix broken characters and add basic section headings",
]);
pushDay(4, 1, "RAG ingestion test (small subset)", [
"Upload 2-3 sample PDF chunks to Dify's RAG",
"Run retrieval tests for 5 sample queries (indicators, risk factors)",
"Record retrieval quality and tweak chunk settings",
]);
pushDay(5, 1, "Design DB schema (first draft)", [
"Draft JSON schemas for Clients, CaseNotes, RiskAssessment",
"Map which fields will be populated from forms (Tool 1-5)",
"Decide primary keys and relation fields",
]);
pushDay(6, 1, "Create sample test records", [
"Create 3 anonymized client records (different stages)",
"Create 2 example case notes and 2 risk assessments",
"Store samples in Dify or local JSON for testing",
]);
pushDay(7, 1, "Weekly review & refine KB", [
"Review retrieval problems & tag noisy docs",
"Revise metadata where necessary",
"Document the ingestion process step-by-step",
]);

/* Week 2: Database and template standardization */
pushDay(8, 2, "Finalize JSON schemas", [
"Finalize Clients/CaseNotes/RiskAssessment/SafetyPlan/Referral schemas",
"Include field types, allowed enums, and required fields",
"Add examples to each schema",
]);
pushDay(9, 2, "Implement DB in Dify / or Coze (Coze DB optional)", [
"Create data tables and fields in Dify project",
"Import the 3 sample clients",
"Test read and write operations via Dify UI",
]);
pushDay(10, 2, "Standardize document templates", [
"Create template for Case Note (section headings)",
"Create template for Safety Plan (Tool 4 structure)",
"Create template for Referral (Tool 5 format)",
]);
pushDay(11, 2, "Map form fields to JSON schema", [
"For each tool (1-5) map form fields to DB fields",
"Create a mapping table (form_field -> db_field)",
"Plan the auto-fill flow from extracted_entities",
]);
pushDay(12, 2, "Build simple document generator pipeline", [
"Prototype converting JSON -> Markdown -> PDF",
"Test with 1 case note and 1 safety plan",
"Ensure attachments include source citations",
]);
pushDay(13, 2, "Design access control model", [
"Define roles: intake, caseworker, supervisor, admin",
"Define permissions for read/write/export",
"Plan audit logging fields",
]);
pushDay(14, 2, "Weekly review + security checklist", [
"Review role permissions",
"Confirm data encryption in transit/storage options",
"Document retention policy draft (consult legal later)",
]);

/* Week 3: Agents - prototyping */
pushDay(15, 3, "Meeting-Prep Agent prototype", [
"Write Meeting-Prep Agent prompt (use sample data)",
"Test agent retrieving client history and producing a 1-page summary",
"Add RAG citations in the response",
]);
pushDay(16, 3, "Risk Assessment Agent prototype", [
"Implement deterministic rules for hard red flags (choking, strangulation)",
"Create scoring rubric and example calculations",
"Test with two high/medium/low scenarios",
]);
pushDay(17, 3, "CaseNote Agent prototype", [
"Create prompt to convert structured inputs into formatted case note",
"Test with partial transcripts + structured answers",
"Validate extracted_fields JSON for downstream use",
]);
pushDay(18, 3, "Safety Plan Agent prototype", [
"Create Safety Plan template mapping",
"Prompt to produce personalized plan with placeholders",
"Test PDF export flow",
]);
pushDay(19, 3, "Referral Agent prototype", [
"Build referral email template + Tool 5 fill",
"Ensure each referral contains evidence snippets and supervisor notice",
"Test with two destination services",
]);
pushDay(20, 3, "Document Generation Agent prototype", [
"Integrate generator with previous agent outputs",
"Test a complete document pack generation (case note + safety plan + referral)",
"Add footer metadata (generated_by, timestamp, sources)",
]);
pushDay(21, 3, "Weekly integration test", [
"Run end-to-end on 1 sample client meeting",
"Collect issues, refine prompts and mappings",
"Document lessons learned",
]);

/* Week 4: Workflows A & B - productionize */
pushDay(22, 4, "Workflow A: Pre-meeting productionize", [
"Create Dify workflow for Meeting Prep: input clientID -> Meeting-Prep Agent -> show summary",
"Add UI step (preview) for worker",
"Add 'Start Meeting' and lock client record behavior",
]);
pushDay(23, 4, "Workflow B: Post-meeting productionize", [
"Create Dify workflow for Post-Meeting: collect structured inputs -> CaseNote Agent -> write DB",
"Add branching for referral/safety plan triggers",
"Add audit log write step",
]);
pushDay(24, 4, "Integration: Pre + Post meeting flow", [
"Test sequence: Start meeting -> take notes -> finish -> auto generate pack",
"Ensure ID and versioning for case notes",
"Document UI prompts workers see",
]);
pushDay(25, 4, "Implement optimistic locking & pending change queue", [
"Implement editing lock on meeting start",
"Implement pending changes list for concurrent edits",
"Set lock TTL (e.g., 60 minutes)",
]);
pushDay(26, 4, "Add RAG citations visible in UI", [
"Show top 2 evidence citations on pre-meeting summary",
"Add link to the source doc and page",
"Create 'view source' modal",
]);
pushDay(27, 4, "Create worker quick-actions", [
"Buttons: Create Safety Plan Draft, Create Referral Draft, Flag for Supervisor",
"Connect quick actions to respective agents",
"Test workflow triggers",
]);
pushDay(28, 4, "Weekly review & QA", [
"Run 3 sample meetings with edge-case inputs",
"Log failures and adjust prompts",
"Capture supervisor feedback",
]);

/* Week 5: Workflows C-G & orchestration */
pushDay(29, 5, "Workflow C: Risk Assessment automation", [
"Finalize the deterministic rule-engine (hard flags)",
"Set up LLM-based explanation and scoring fallback",
"Test auto-assigning risk level and human_review_required flag",
]);
pushDay(30, 5, "Workflow D: Safety Plan builder", [
"Finalize Tool 4 mapping and template placeholders",
"Make safety plan editable by worker after generation",
"Link safety plan to client record",
]);
pushDay(31, 5, "Workflow E: Referral pipeline", [
"Finalize referral flow: draft -> supervisor approval -> send",
"Template for email & attachments",
"Add referral status tracking in DB",
]);
pushDay(32, 5, "Workflow F: MACM (multi-agency) support", [
"Define criteria for MACM trigger (rules)",
"Generate multi-agency summary pack",
"Create calendar/meeting export (ics) for case conference",
]);
pushDay(33, 5, "Workflow G: Full Document Pack creation", [
"Implement combined pipeline to create full pack on-demand",
"Include export & download links",
"Attach audit metadata and sources",
]);
pushDay(34, 5, "Orchestrator: fan-out & aggregation", [
"Create Orchestrator workflow that can call multiple agents in parallel",
"Implement merge logic for conflicting outputs (priority rules)",
"Implement timeouts and retries",
]);
pushDay(35, 5, "Run end-to-end parallel scenario tests", [
"Simulate a meeting with live 'red flag' disclosure to test orchestration",
"Validate supervisor queue behavior and notification",
"Log processing times and optimize",
]);

/* Week 6: Supervisor + Permissions + UX */
pushDay(36, 6, "Supervisor Agent & queue", [
"Build Supervisor Agent prompt (synthesise evidence & actions)",
"Create supervisor queue UI (pending approvals)",
"Test approve/reject/ask-more-info flows",
]);
pushDay(37, 6, "Implement role-based access and audit trails", [
"Enforce read/write rules per role",
"Log actions with user_id, timestamp, reason",
"Implement soft-delete & retention metadata",
]);
pushDay(38, 6, "UX polish for worker flows", [
"Refine UI text for clarity and safety instructions",
"Add inline warnings for red flags (urgent visuals)",
"Add confirmation modals for sending referrals",
]);
pushDay(39, 6, "Localisation & translations (basic)", [
"Add placeholders for multilingual support (Chinese/English)",
"Ensure templates can accept translated fields",
"Plan for later inclusion of Aboriginal languages",
]);
pushDay(40, 6, "Backup, export & data portability", [
"Create export snapshot for DB / RAG indices",
"Test CSV and JSON exports of case histories",
"Document restore steps",
]);
pushDay(41, 6, "Weekly review + supervisor feedback loop", [
"Collect feedback from 2 supervisors & 3 workers",
"Prioritise top 10 UX / safety changes",
"Plan next iteration",
]);

/* Week 7: Testing, validation, & pilot */
pushDay(42, 7, "Acceptance testing & edge-cases", [
"Run acceptance tests (at least 10 scenarios including high-risk)",
"Validate citations for each sensitive recommendation",
"Ensure supervisor review blocks automated sends",
]);
pushDay(43, 7, "Pilot preparation & training materials", [
"Create worker quick-start guide (1 page)",
"Create supervisor training checklist",
"Make short demo video (5-7 min)",
]);
pushDay(44, 7, "Pilot run with small team", [
"Run 1-week pilot with 2 workers and 1 supervisor",
"Log issues and response times",
"Collect structured feedback",
]);
pushDay(45, 7, "Wrap-up, handover & next roadmap", [
"Document final architecture and export Dify artifacts",
"Prepare handover package: workflows, prompts, schemas, RAG snapshot",
"Plan phase 2 (fine-tune models, supervisor dashboard, scaling)",
]);

return days;
})();

/* -------------------------
Helper: Persistent state keys
------------------------- */
const STORAGE_KEY = "fdv_sprint45_v1";

/* -------------------------
Component
------------------------- */

export default function Sprint45(): JSX.Element {
const [data, setData] = useState<Day[]>(DAYS);
const [stateMap, setStateMap] = useState<Record<string, boolean>>({});
const [filterWeek, setFilterWeek] = useState<number | "all">("all");
const [search, setSearch] = useState("");
const [showOnlyPending, setShowOnlyPending] = useState(false);

// Load saved state
useEffect(() => {
try {
const raw = localStorage.getItem(STORAGE_KEY);
if (raw) {
const parsed = JSON.parse(raw);
setStateMap(parsed);
} else {
// initialize map from DAYS
const initMap: Record<string, boolean> = {};
DAYS.forEach((d) => d.tasks.forEach((t) => (initMap[t.id] = false)));
setStateMap(initMap);
}
} catch (e) {
console.warn("Failed to load saved sprint state", e);
}
}, []);

// Persist on change
useEffect(() => {
localStorage.setItem(STORAGE_KEY, JSON.stringify(stateMap));
}, [stateMap]);

const toggleTask = (id: string) =>
setStateMap((m) => ({ ...m, [id]: !m[id] }));

const clearAll = () => {
if (!confirm("Clear all progress? This cannot be undone.")) return;
const newMap: Record<string, boolean> = {};
DAYS.forEach((d) => d.tasks.forEach((t)
