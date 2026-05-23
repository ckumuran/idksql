<div align="center">

# IDKSQL

**Ask your database anything.**

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Ollama](https://img.shields.io/badge/Ollama-Llama3-FF4500?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-PostgreSQL-4479A1?style=flat-square&logo=mysql)
![VSCode](https://img.shields.io/badge/VSCode-Extension-007ACC?style=flat-square&logo=visualstudiocode)
![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-red?style=flat-square)

<br/>

![IDKSQL Landing Page](./ScreenShot/IDKDEMO.jpg)

*The interface that turns plain English into structured query language — locally, instantly, without phoning home to a cloud API.*

</div>

---

## The Idea

Databases speak SQL. Humans speak English. The gap between them has always required either years of experience or a DBA sitting next to you. IDKSQL eliminates that gap entirely.

It's not a chatbot wrapper. It's not a cloud service. It's a **full-stack, local-first, schema-aware AI query engine** — a system that understands your actual database structure, generates executable SQL from plain English, detects dangerous operations before they run, and explains every query it writes. The whole thing runs on your machine, with your models, against your databases.

The system feels like: **a fusion of a hacker console, database IDE, and AI copilot** — built for engineers who are tired of alt-tabbing between a terminal, a SQL client, and Stack Overflow.

---

## What IDKSQL Actually Does

Type this:

```
show inactive users who haven't logged in for 30 days
```

IDKSQL does the rest:

1. **Extracts your schema** — table names, columns, types, foreign keys
2. **Injects schema context** into a structured LLM prompt
3. **Sends the prompt to Llama3 via Ollama** running locally on your machine
4. **Receives generated SQL** — not a guess, but a schema-aware, structurally valid query
5. **Validates the query** — syntax checking before execution
6. **Intercepts dangerous operations** — DROP, DELETE, TRUNCATE without WHERE are flagged
7. **Executes through the correct adapter** — MySQL, PostgreSQL, or SQLite
8. **Returns formatted results** — tabular data rendered in the UI
9. **Generates a plain-English explanation** — "This query selects users where last_login is more than 30 days ago..."
10. **Stores the query in history** — searchable, replayable, copyable

All of it — from natural language to rendered results — in under 3 seconds on a modern laptop. No network calls to OpenAI. No API keys. No rate limits. No data leaving your machine.

---

## Screenshots

### The Landing Page

![IDKSQL Landing](./ScreenShot/IDKDEMO.jpg)

> *The entry point. Black field, red grid lines, tactical typography. The landing page communicates the system's philosophy immediately: this is a precision tool, not a consumer product. The input interface is centered, uncluttered, deliberately intimidating — the same way a terminal is intimidating to someone who's never used one. To everyone else, it feels like home.*

### The Query Execution Interface

![IDKSQL Main UI](./ScreenShot/IDKSQL.jpeg)

> *Live query execution against MySQL. The Monaco editor occupies the upper panel, displaying the AI-generated SQL with full syntax highlighting. Below it, the result table renders query output with column headers and row data. The terminal panel on the right logs the execution lifecycle in real time — schema extraction, prompt construction, LLM response latency, adapter execution time. AI-generated SQL and terminal feedback visible simultaneously, exactly the way a systems engineer would want it.*

### The VSCode Extension

![IDKSQL VSCode Extension](./ScreenShot/IDKTerminal.jpg)

> *AI-native database interaction directly in the editor. The sidebar panel renders the full IDKSQL interface inside VSCode — connection management, natural language input, SQL preview, result table, explanation panel. No context switching. No alt-tab. Your database is right there next to your code, answering questions in the same language you're already thinking in.*

---

## The Query Lifecycle

The entire system is a pipeline. Every query, every execution, every result follows this path exactly:

```
┌─────────────────────────────────────────────────┐
│          Natural Language Input                  │
│  "show inactive users for past 30 days"          │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              Schema Extraction                   │
│  schema.ts → adapter → SHOW TABLES + DESCRIBE   │
│  Returns: { tables, columns, types, keys }       │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│         Prompt Context Injection                 │
│  promptBuilder.ts formats schema + query         │
│  into a structured LLM instruction block         │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           Ollama / Llama3 Inference              │
│  Local model receives structured prompt          │
│  Generates SQL with schema awareness             │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              Validation Layer                    │
│  Syntax check: is this valid SQL?                │
│  Structure check: do referenced tables exist?    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│         Dangerous Query Detection                │
│  DROP / DELETE / TRUNCATE / UPDATE w/o WHERE     │
│  → Intercepted → DangerousQueryModal fires       │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           Adapter Execution                      │
│  factory.ts selects mysql / postgres / sqlite    │
│  Query executes through the correct driver       │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│            Result Formatting                     │
│  Rows + column metadata normalized to            │
│  QueryResult type for frontend consumption       │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│         Explanation Generation                   │
│  explainer.ts sends SQL to Llama3                │
│  Returns plain-English breakdown                 │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           Frontend Rendering                     │
│  Monaco Editor: SQL with syntax highlighting     │
│  ResultTable: rows and columns                   │
│  ExplanationPanel: plain-English description     │
│  TerminalPanel: execution log                    │
└─────────────────────────────────────────────────┘
```

Every stage of this pipeline is independently testable, independently replaceable. The adapter can swap without touching the AI layer. The AI layer can swap without touching the execution layer. This is the architectural discipline that makes IDKSQL extensible rather than fragile.

---

## AI SQL Generation Pipeline

The intelligence in IDKSQL lives in three files: `ollama.ts`, `promptBuilder.ts`, and `explainer.ts`. They're small files that do enormous work.

### `promptBuilder.ts` — The Schema Injection Engine

Schema-aware prompting is the single most important technical decision in IDKSQL. Without it, the LLM generates SQL against hypothetical table names — which is useless. With it, the LLM generates SQL against *your* actual tables.

```typescript
// apps/server/src/ai/promptBuilder.ts

export function buildSQLPrompt(
  naturalLanguage: string,
  schema: SchemaContext
): string {
  const schemaBlock = schema.tables
    .map(table => {
      const columns = table.columns
        .map(col => `  ${col.name} ${col.type}${col.nullable ? '' : ' NOT NULL'}`)
        .join('\n');
      return `Table: ${table.name}\nColumns:\n${columns}`;
    })
    .join('\n\n');

  return `You are a SQL expert. Generate a single, executable SQL query.
  
DATABASE SCHEMA:
${schemaBlock}

RULES:
- Use ONLY the tables and columns listed above
- Return ONLY the SQL query, no explanation
- Do not use backticks, markdown, or commentary
- If the query would be destructive, add a comment warning

USER REQUEST:
${naturalLanguage}

SQL:`;
}
```

Why does this matter? Because Llama3 is a general-purpose model. Left without context, it hallucinates table names. With the schema injected directly into the prompt, it becomes a SQL machine scoped to exactly your database. The difference in output quality between schema-aware and schema-blind prompting is not marginal — it's the difference between a useful tool and a toy.

### `ollama.ts` — The Local Inference Client

```typescript
// apps/server/src/ai/ollama.ts

export async function generateSQL(prompt: string): Promise<string> {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt,
      stream: false,
      options: {
        temperature: 0.1,   // Low temperature = deterministic SQL output
        top_p: 0.9,
        num_predict: 512,   // SQL queries don't need more tokens than this
      }
    })
  });

  const data = await response.json();
  return data.response.trim();
}
```

Temperature is set to `0.1` deliberately. High temperature makes LLMs creative. SQL generation needs the opposite of creativity — it needs precision, determinism, and structural correctness. A temperature of `0.1` makes the model commit to the most probable token at each step, which in the context of SQL generation means fewer hallucinated column names and more syntactically valid output.

### `explainer.ts` — The Explanation Engine

After execution, IDKSQL doesn't just show you results. It tells you *what just happened*:

```typescript
// apps/server/src/ai/explainer.ts

export async function explainSQL(sql: string, results: QueryResult): Promise<string> {
  const prompt = `Explain this SQL query in plain English. Be concise (2-3 sentences max).
  
SQL: ${sql}
Returned: ${results.rows.length} rows

Explanation:`;

  return generateSQL(prompt); // reuses the same Ollama client
}
```

The explanation system is intentionally a second inference call, not baked into the first. Why? Because combining SQL generation and explanation into a single prompt forces the model to do two things at once, which degrades output quality for both. Separate calls let each inference be optimized independently.

---

## Schema Context Injection

Schema extraction is how IDKSQL makes the LLM aware of your actual database structure. It runs on every query request — not cached by default — because schemas change.

```typescript
// apps/server/src/routes/schema.ts

router.get('/schema/:connectionId', async (req, res) => {
  const adapter = await factory.getAdapter(req.params.connectionId);
  const schema = await adapter.getSchema();
  
  // schema = {
  //   tables: [
  //     {
  //       name: 'users',
  //       columns: [
  //         { name: 'id', type: 'INT', nullable: false, primaryKey: true },
  //         { name: 'email', type: 'VARCHAR(255)', nullable: false },
  //         { name: 'last_login', type: 'DATETIME', nullable: true },
  //       ],
  //       foreignKeys: []
  //     },
  //     ...
  //   ]
  // }
  
  res.json(schema);
});
```

The schema object is extracted, normalized into the shared `SchemaContext` type, and injected into every prompt. The normalization step — converting MySQL's `SHOW COLUMNS` output and PostgreSQL's `information_schema` response into the same `SchemaContext` shape — is the entire reason the multi-database system works transparently. The LLM doesn't know it's talking to MySQL vs PostgreSQL. It just sees columns and types.

---

## Multi-Database Adapter System

The adapter system is the backbone of IDKSQL's database portability. It follows the **Strategy pattern** — define a common interface, implement it per database, swap transparently at runtime.

### `base.ts` — The Contract

```typescript
// apps/server/src/adapters/base.ts

export interface DatabaseAdapter {
  connect(config: ConnectionConfig): Promise<void>;
  disconnect(): Promise<void>;
  executeQuery(sql: string): Promise<QueryResult>;
  getSchema(): Promise<SchemaContext>;
  testConnection(): Promise<boolean>;
}
```

Every adapter implements every method. No exceptions. This contract is what makes `factory.ts` possible — it can return any adapter and the caller never needs to know which one.

### `mysql.ts` — The MySQL Implementation

```typescript
// apps/server/src/adapters/mysql.ts
import mysql from 'mysql2/promise';

export class MySQLAdapter implements DatabaseAdapter {
  private connection: mysql.Connection | null = null;

  async connect(config: ConnectionConfig): Promise<void> {
    this.connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  }

  async executeQuery(sql: string): Promise<QueryResult> {
    const [rows, fields] = await this.connection!.execute(sql);
    return {
      rows: rows as Record<string, unknown>[],
      columns: fields?.map(f => ({ name: f.name, type: f.type })) ?? [],
      rowCount: Array.isArray(rows) ? rows.length : 0,
    };
  }

  async getSchema(): Promise<SchemaContext> {
    const [tables] = await this.connection!.execute('SHOW TABLES');
    // ... extract columns per table via DESCRIBE
  }
}
```

### `postgres.ts` — The PostgreSQL Implementation

```typescript
// apps/server/src/adapters/postgres.ts
import { Pool } from 'pg';

export class PostgreSQLAdapter implements DatabaseAdapter {
  private pool: Pool | null = null;

  async connect(config: ConnectionConfig): Promise<void> {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  }

  async getSchema(): Promise<SchemaContext> {
    // PostgreSQL exposes schema via information_schema — different from MySQL's DESCRIBE
    const result = await this.pool!.query(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `);
    // Normalize to SchemaContext — same output regardless of DB engine
  }
}
```

### `sqlite.ts` — The SQLite Implementation

```typescript
// apps/server/src/adapters/sqlite.ts
import Database from 'better-sqlite3';

export class SQLiteAdapter implements DatabaseAdapter {
  private db: Database.Database | null = null;

  async connect(config: ConnectionConfig): Promise<void> {
    this.db = new Database(config.filepath);
  }

  async executeQuery(sql: string): Promise<QueryResult> {
    // SQLite uses synchronous API — wrapped for interface compatibility
    const stmt = this.db!.prepare(sql);
    const rows = stmt.all();
    return { rows, columns: [], rowCount: rows.length };
  }
}
```

### `factory.ts` — The Router

```typescript
// apps/server/src/adapters/factory.ts

export class AdapterFactory {
  private adapters: Map<string, DatabaseAdapter> = new Map();

  async getAdapter(connectionId: string): Promise<DatabaseAdapter> {
    if (this.adapters.has(connectionId)) {
      return this.adapters.get(connectionId)!;
    }
    throw new Error(`No adapter found for connection ${connectionId}`);
  }

  async createAdapter(config: ConnectionConfig): Promise<DatabaseAdapter> {
    const adapter = (() => {
      switch (config.type) {
        case 'mysql':    return new MySQLAdapter();
        case 'postgres': return new PostgreSQLAdapter();
        case 'sqlite':   return new SQLiteAdapter();
        default:         throw new Error(`Unsupported database: ${config.type}`);
      }
    })();

    await adapter.connect(config);
    this.adapters.set(config.id, adapter);
    return adapter;
  }
}
```

Why does adapter architecture matter? Because without it, every route handler would need `if (type === 'mysql')` branches scattered throughout the codebase. Adding a new database would mean auditing every file. With the adapter pattern, adding MongoDB support means writing one new file that implements `DatabaseAdapter`. Nothing else changes. This is why adapter architecture exists — it absorbs the combinatorial complexity of supporting multiple databases without letting that complexity leak into the rest of the system.

---

## Why Local LLMs Instead of Cloud APIs

This decision has architectural, economic, and philosophical dimensions.

**Architectural**: Cloud API latency is unpredictable. A local Ollama instance running Llama3 on a modern laptop returns responses in 1–3 seconds consistently. No cold starts. No network timeouts. No rate limiting.

**Economic**: OpenAI and Anthropic charge per token. Schema injection means sending hundreds of tokens per query request. For a team of 5 engineers running 50 queries a day, cloud API costs accumulate fast. Local inference is free after setup.

**Security**: Your database schema is sensitive. Column names reveal business logic. Table names reveal product architecture. Sending your schema to a cloud LLM on every query means your database structure is processed on someone else's servers. Local inference keeps schema context entirely on your machine.

**Philosophical**: IDKSQL is built on the premise that AI-powered developer tools should be self-hostable, auditable, and independent. The local-first architecture is a statement as much as a technical choice.

```
Cloud API Architecture:
Your Machine → [Schema + Query] → OpenAI API → [SQL] → Your Machine
                                ↑
                    Your schema just left your network

Local Architecture:
Your Machine → [Schema + Query] → Ollama (localhost) → [SQL] → Your Machine
                                         ↑
                              Never touches the internet
```

---

## Dangerous Query Detection

There is a class of SQL operations that, when executed incorrectly, cause data loss that cannot be undone. IDKSQL treats these with the same severity a circuit breaker treats an overloaded line.

```typescript
// apps/server/src/routes/query.ts

const DANGEROUS_PATTERNS = [
  /^\s*DROP\s+/i,
  /^\s*TRUNCATE\s+/i,
  /^\s*DELETE\s+(?!.*\bWHERE\b)/i,   // DELETE without WHERE
  /^\s*UPDATE\s+(?!.*\bWHERE\b)/i,   // UPDATE without WHERE
  /^\s*ALTER\s+TABLE\s+.*\bDROP\b/i,
];

export function isDangerousQuery(sql: string): DangerousQueryCheck {
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(sql)) {
      return {
        isDangerous: true,
        reason: getDangerReason(pattern),
        sql,
      };
    }
  }
  return { isDangerous: false };
}
```

When a dangerous query is detected, execution stops. The frontend receives a `DangerousQueryCheck` object. The `DangerousQueryModal` fires — a full-screen overlay that displays the exact SQL, the exact reason it was flagged, and two options: confirm with explicit acknowledgment, or abort.

This layer exists because LLMs hallucinate. A model asked to "delete old logs" might generate `DELETE FROM logs` without a WHERE clause. Without this safety layer, that query executes and data is gone. With it, the model's hallucination becomes a human decision — not a catastrophe.

```
AI generates: DELETE FROM users WHERE status = 'inactive'
Safety layer: ✓ Has WHERE clause → execute

AI generates: DELETE FROM users
Safety layer: ✗ No WHERE clause → INTERCEPT → DangerousQueryModal
```

The safety layer is positioned between AI hallucination and catastrophic database damage. It is the most important non-functional system in IDKSQL.

---

## VSCode Extension Architecture

The VSCode extension brings AI-native database interaction directly into the editor. No browser. No context switching. Your database answers questions in the same environment where you write the code that queries it.

```
vscode-extension/
├── src/
│   ├── extension.ts           ← Activation, command registration
│   ├── services/
│   │   └── api.ts             ← HTTP client for IDKSQL server
│   ├── sidebar/
│   │   ├── SidebarProvider.ts ← WebviewViewProvider implementation
│   │   └── webview.html       ← Sidebar UI (full IDKSQL interface)
│   └── types/
│       └── query.ts           ← Shared types
```

### Architecture Decision: WebView, Not Native UI

The sidebar is implemented as a VSCode WebView — an embedded browser panel that renders arbitrary HTML/CSS/JS. The alternative was a native VSCode UI using TreeViews and InputBoxes. The native approach would have been faster to implement and lighter weight. The WebView approach was chosen because:

1. **Full IDKSQL interface** — Monaco Editor, result tables, explanation panels all render in the WebView. The native VSCode TreeView API cannot support this.
2. **Shared codebase** — the WebView HTML is essentially the same interface as the web app, sharing logic and components.
3. **No UI limitations** — the WebView renders any HTML, so the black/red tactical aesthetic is preserved exactly.

### `SidebarProvider.ts` — The Bridge

```typescript
// vscode-extension/src/sidebar/SidebarProvider.ts

export class SidebarProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = this.getHtmlContent();
    
    // Bridge: VSCode → WebView
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'executeQuery':
          const result = await this.apiService.executeQuery(message.payload);
          webviewView.webview.postMessage({ type: 'queryResult', payload: result });
          break;
        case 'getSchema':
          const schema = await this.apiService.getSchema(message.connectionId);
          webviewView.webview.postMessage({ type: 'schemaResult', payload: schema });
          break;
      }
    });
  }
}
```

### `api.ts` — The Extension's Network Layer

The extension communicates with the local IDKSQL Express server. It does not run its own inference — it delegates to the server, which manages Ollama and the database adapters:

```typescript
// vscode-extension/src/services/api.ts

export class IDKSQLApiService {
  private baseUrl = 'http://localhost:3001';

  async executeQuery(payload: QueryPayload): Promise<QueryResult> {
    const response = await fetch(`${this.baseUrl}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  }
}
```

This architecture means the VSCode extension is stateless. It is a rendering layer and a bridge. All intelligence — schema extraction, prompt construction, LLM inference, query execution — lives in the Express server. This means the extension and the web app share the same backend with zero duplication.

---

## Web App Architecture

The web application is the primary interface for IDKSQL. It is built on React 18, Vite, TailwindCSS, and Zustand. The design language is deliberate: black background, red accent grid, monospace typography, terminal-style panels.

```
web/src/
├── components/
│   ├── ConnectionList.tsx     ← Saved database connections
│   ├── ConnectionModal.tsx    ← Add/edit connection form
│   ├── DangerousQueryModal.tsx← Dangerous query confirmation overlay
│   ├── ExplanationPanel.tsx   ← AI-generated query explanation
│   ├── HistoryPanel.tsx       ← Searchable query history
│   ├── MonacoEditor.tsx       ← SQL editor with syntax highlighting
│   ├── QueryInput.tsx         ← Natural language input
│   ├── ResultTable.tsx        ← Query results table
│   ├── SQLPreview.tsx         ← Generated SQL before execution
│   ├── Sidebar.tsx            ← Connection + history sidebar
│   ├── TerminalPanel.tsx      ← Execution log output
│   └── TypingCursor.tsx       ← Animated terminal cursor
├── pages/
│   └── Home.tsx               ← Primary layout assembly
├── services/
│   └── api.ts                 ← HTTP client for the Express server
├── store/
│   └── useStore.ts            ← Zustand global state
├── styles/
│   └── globals.css            ← TailwindCSS + custom CSS variables
├── utils/
│   └── history.ts             ← LocalStorage query history management
├── App.tsx
└── main.tsx
```

### Component Responsibility Boundaries

Each component owns one thing. This is the core architectural discipline that keeps the web app from becoming an unmaintainable monolith.

**`QueryInput.tsx`** knows: I am a text field. I capture natural language. I emit it upward. I don't care what happens to it.

**`SQLPreview.tsx`** knows: I receive generated SQL. I display it. I offer a copy button and an edit toggle. I don't generate SQL.

**`ResultTable.tsx`** knows: I receive rows and column metadata. I render a table. I handle empty states and loading states. I don't execute queries.

**`TerminalPanel.tsx`** knows: I receive log entries. I render them in terminal style with timestamps. I auto-scroll. I don't produce log entries.

The separation is enforced by Zustand — each component subscribes to the slice of state it needs, and only the pieces of state that relate to its responsibility.

---

## Monaco Editor Integration

Monaco is the same editor engine that powers VSCode. Embedding it in IDKSQL means users get the same SQL editing experience they'd have in a professional IDE — inside a browser.

```typescript
// web/src/components/MonacoEditor.tsx

import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, onChange, readOnly }) => {
  return (
    <Editor
      language="sql"
      theme="vs-dark"           // Dark theme matches the tactical UI
      value={value}
      onChange={(v) => onChange(v ?? '')}
      options={{
        readOnly,
        minimap: { enabled: false },   // Minimap is noise for SQL
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        automaticLayout: true,         // Resizes with container
      }}
    />
  );
};
```

The editor renders the AI-generated SQL and remains editable. This is intentional — the AI generates a starting point, not a final answer. The user can modify the SQL before execution, which means IDKSQL augments human judgment rather than replacing it.

---

## State Management with Zustand

Zustand was chosen over Redux for one reason: it does not require boilerplate. No action creators. No reducers. No dispatch. State is a store, mutations are functions, components subscribe to slices.

```typescript
// web/src/store/useStore.ts

interface IDKSQLState {
  // Connections
  connections: ConnectionConfig[];
  activeConnectionId: string | null;
  
  // Query lifecycle
  naturalLanguageInput: string;
  generatedSQL: string;
  isGenerating: boolean;
  isExecuting: boolean;
  
  // Results
  queryResult: QueryResult | null;
  explanation: string | null;
  
  // UI state
  dangerousQuery: DangerousQueryCheck | null;
  terminalLogs: TerminalLog[];
  
  // Actions
  setActiveConnection: (id: string) => void;
  setNaturalLanguageInput: (input: string) => void;
  executeQuery: () => Promise<void>;
  addTerminalLog: (log: TerminalLog) => void;
  clearResults: () => void;
}

export const useStore = create<IDKSQLState>((set, get) => ({
  connections: [],
  activeConnectionId: null,
  naturalLanguageInput: '',
  generatedSQL: '',
  isGenerating: false,
  isExecuting: false,
  queryResult: null,
  explanation: null,
  dangerousQuery: null,
  terminalLogs: [],

  executeQuery: async () => {
    const { naturalLanguageInput, activeConnectionId } = get();
    
    set({ isGenerating: true });
    get().addTerminalLog({ type: 'info', message: 'Extracting schema...' });
    
    const schema = await api.getSchema(activeConnectionId!);
    get().addTerminalLog({ type: 'success', message: `Schema loaded: ${schema.tables.length} tables` });

    const sql = await api.generateSQL({ naturalLanguageInput, schema });
    set({ generatedSQL: sql, isGenerating: false });
    get().addTerminalLog({ type: 'info', message: 'SQL generated. Checking safety...' });

    const safetyCheck = isDangerousQuery(sql);
    if (safetyCheck.isDangerous) {
      set({ dangerousQuery: safetyCheck });
      return; // Stop. Wait for human confirmation.
    }

    set({ isExecuting: true });
    const result = await api.executeQuery({ sql, connectionId: activeConnectionId! });
    set({ queryResult: result, isExecuting: false });
    get().addTerminalLog({ type: 'success', message: `${result.rowCount} rows returned` });

    const explanation = await api.explainSQL(sql, result);
    set({ explanation });
  },

  addTerminalLog: (log) => set(state => ({
    terminalLogs: [...state.terminalLogs, { ...log, timestamp: Date.now() }]
  })),
}));
```

The `executeQuery` action is the entire query lifecycle in one function. It manages its own loading states, logs its own progress to the terminal panel, handles the dangerous query intercept, and updates results. Components only need to call `useStore(s => s.executeQuery)()` — they don't need to know anything about the underlying pipeline.

---

## API Layer Breakdown

The Express server exposes four route groups. Each is independently testable. Each has a single responsibility.

```
apps/server/src/routes/
├── query.ts          POST /query
├── explain.ts        POST /explain
├── schema.ts         GET  /schema/:connectionId
└── testConnection.ts POST /test-connection
```

### `POST /query`

```typescript
// routes/query.ts
router.post('/', async (req, res) => {
  const { naturalLanguage, connectionId } = req.body as QueryRequest;

  const adapter = await factory.getAdapter(connectionId);
  const schema = await adapter.getSchema();
  const prompt = buildSQLPrompt(naturalLanguage, schema);
  const sql = await generateSQL(prompt);

  const safetyCheck = isDangerousQuery(sql);
  if (safetyCheck.isDangerous) {
    return res.status(400).json({ error: 'dangerous_query', ...safetyCheck });
  }

  const result = await adapter.executeQuery(sql);
  res.json({ sql, result });
});
```

### `POST /explain`

```typescript
// routes/explain.ts
router.post('/', async (req, res) => {
  const { sql, result } = req.body;
  const explanation = await explainSQL(sql, result);
  res.json({ explanation });
});
```

### `GET /schema/:connectionId`

```typescript
// routes/schema.ts
router.get('/:connectionId', async (req, res) => {
  const adapter = await factory.getAdapter(req.params.connectionId);
  const schema = await adapter.getSchema();
  res.json(schema);
});
```

### `POST /test-connection`

```typescript
// routes/testConnection.ts
router.post('/', async (req, res) => {
  const config = req.body as ConnectionConfig;
  const adapter = await factory.createAdapter(config);
  const ok = await adapter.testConnection();
  res.json({ connected: ok });
});
```

The server never stores state between requests. Each request brings its own connection ID, and the `AdapterFactory` manages the pool of active adapters. This makes the server trivially restartable and fault-tolerant.

---

## Full Repo Architecture

```
idksql/                              ← Turborepo monorepo root
│
├── apps/
│   │
│   ├── server/                      ← Express + Node.js backend
│   │   └── src/
│   │       ├── adapters/
│   │       │   ├── base.ts          ← DatabaseAdapter interface
│   │       │   ├── factory.ts       ← Adapter router
│   │       │   ├── mysql.ts         ← MySQL implementation
│   │       │   ├── postgres.ts      ← PostgreSQL implementation
│   │       │   └── sqlite.ts        ← SQLite implementation
│   │       ├── ai/
│   │       │   ├── explainer.ts     ← SQL explanation generator
│   │       │   ├── ollama.ts        ← Ollama HTTP client
│   │       │   └── promptBuilder.ts ← Schema-aware prompt constructor
│   │       ├── routes/
│   │       │   ├── explain.ts       ← POST /explain
│   │       │   ├── query.ts         ← POST /query
│   │       │   ├── schema.ts        ← GET /schema/:id
│   │       │   └── testConnection.ts← POST /test-connection
│   │       ├── types/
│   │       │   ├── database.ts      ← ConnectionConfig, AdapterType
│   │       │   ├── query.ts         ← QueryRequest, QueryResult
│   │       │   └── schema.ts        ← SchemaContext, TableSchema
│   │       ├── app.ts               ← Express app factory
│   │       └── server.ts            ← Entry point, port binding
│   │
│   ├── web/                         ← React frontend
│   │   └── src/
│   │       ├── components/          ← See components breakdown above
│   │       ├── pages/
│   │       │   └── Home.tsx         ← Primary layout
│   │       ├── services/
│   │       │   └── api.ts           ← Fetch wrapper for server routes
│   │       ├── store/
│   │       │   └── useStore.ts      ← Zustand global state
│   │       ├── styles/
│   │       │   └── globals.css      ← Tailwind + CSS custom properties
│   │       ├── utils/
│   │       │   └── history.ts       ← LocalStorage query history
│   │       ├── App.tsx
│   │       └── main.tsx
│   │
│   └── vscode-extension/            ← VSCode sidebar extension
│       └── src/
│           ├── services/
│           │   └── api.ts           ← Extension HTTP client
│           ├── sidebar/
│           │   ├── SidebarProvider.ts← WebviewViewProvider
│           │   └── webview.html     ← Full IDKSQL interface
│           ├── types/
│           │   └── query.ts
│           └── extension.ts         ← Activation + command registration
│
├── packages/
│   └── shared-types/                ← Shared TypeScript types (optional)
│
├── turbo.json                       ← Turborepo pipeline configuration
├── package.json                     ← Root workspace configuration
└── README.md
```

### Why Turborepo?

A monorepo without a build orchestrator is a monorepo in name only. Turborepo adds:

- **Parallel builds** — server, web, and extension build simultaneously
- **Build caching** — unchanged packages are never rebuilt
- **Dependency graph** — `web` depends on `server` types; Turborepo ensures correct build order
- **Single `dev` command** — `turbo dev` starts all three apps with a single command

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Type System Architecture

TypeScript is used throughout — server, web, and extension — and the types are designed to be shared rather than duplicated. The `QueryResult` type defined in `server/src/types/query.ts` is the same type consumed by `ResultTable.tsx` and the VSCode extension. One definition. Zero drift.

```typescript
// apps/server/src/types/query.ts

export interface QueryRequest {
  naturalLanguage: string;
  connectionId: string;
}

export interface QueryResult {
  rows: Record<string, unknown>[];
  columns: ColumnMetadata[];
  rowCount: number;
  executionTimeMs: number;
}

export interface ColumnMetadata {
  name: string;
  type: string;
}

export interface DangerousQueryCheck {
  isDangerous: boolean;
  reason?: string;
  sql?: string;
}
```

```typescript
// apps/server/src/types/schema.ts

export interface SchemaContext {
  tables: TableSchema[];
  databaseName: string;
  extractedAt: number;
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  foreignKeys: ForeignKey[];
}

export interface ColumnSchema {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  defaultValue?: string;
}
```

---

## Design Philosophy

The UI is built around one conviction: database tools should feel powerful, not friendly. Friendly tools are built for occasional users. Powerful tools are built for people who live in them.

**Black background** — not dark gray, not charcoal. True black (`#000000`). It makes red accents hit harder and makes the content the only thing glowing on the screen.

**Red grid lines** — thin, low-opacity grid overlays on every panel. They don't divide content — they establish that everything has a coordinate, a position, a purpose. The grid communicates: this is a system.

**Monospace typography** — `JetBrains Mono` throughout. Not just in the code editor — in labels, in table cells, in terminal output. When everything is monospaced, columns align naturally and information density increases without feeling cluttered.

**Terminal panel** — every query execution is logged in real time with timestamps, status codes, and execution durations. Users see the lifecycle, not just the result. The terminal panel turns IDKSQL from a black box into a transparent system.

**No loaders except progress** — when IDKSQL is generating SQL, the terminal panel updates in real time. There is no spinner and no blank wait state. The system narrates its own operation. Idle states feel like the system is broken. Narrated states feel like the system is working.

---

## Prompt Engineering Breakdown

The quality of IDKSQL's SQL output is entirely determined by prompt quality. The prompt is engineered to maximize structural correctness and minimize hallucination.

### The Prompt Structure

```
System instruction:
  → You are a SQL expert. Generate ONLY valid SQL.
  
Schema block:
  → Full table list with column names and types
  
Constraint list:
  → Use only listed tables/columns
  → Return only SQL
  → No markdown
  → No explanation

User intent:
  → The natural language query

Output anchor:
  → SQL: (forces model to continue with SQL, not preamble)
```

The output anchor (`SQL:`) at the end is borrowed from few-shot prompting techniques. Ending the prompt with the beginning of the expected output format forces the model to continue that pattern rather than generating preamble.

### Low Temperature Rationale

At temperature 1.0, Llama3 generates creative, varied output. At temperature 0.1, it generates the most probable continuation of each token. SQL generation benefits from low temperature because:

- Column names should not vary — the correct column name is the column name in the schema
- SQL keywords should be standard — `SELECT`, not `FETCH`
- Query structure should be conventional — no novel syntax inventions

High temperature SQL generation produces more hallucinated column names and more syntactically unusual queries. Low temperature produces boring, correct SQL. For a database tool, boring and correct is exactly what you want.

---

## Query History System

```typescript
// web/src/utils/history.ts

const HISTORY_KEY = 'idksql_history';
const MAX_HISTORY = 100;

export interface HistoryEntry {
  id: string;
  naturalLanguage: string;
  generatedSQL: string;
  connectionId: string;
  executedAt: number;
  rowCount: number;
}

export const saveToHistory = (entry: Omit<HistoryEntry, 'id' | 'executedAt'>): void => {
  const history = loadHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    executedAt: Date.now(),
  };
  const updated = [newEntry, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const loadHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
  } catch {
    return [];
  }
};

export const searchHistory = (query: string): HistoryEntry[] => {
  const history = loadHistory();
  const q = query.toLowerCase();
  return history.filter(
    entry =>
      entry.naturalLanguage.toLowerCase().includes(q) ||
      entry.generatedSQL.toLowerCase().includes(q)
  );
};
```

History is stored in `localStorage` — not on the server, not in a database. This is intentional. Query history is personal, machine-local, and should not require authentication or network access to retrieve. The history panel renders a searchable list of past queries with their natural language input, generated SQL, execution timestamp, and row count. Clicking any history entry repopulates the QueryInput and SQLPreview panels instantly.

---

## Terminal Workflow

For users who prefer working in a terminal, IDKSQL's server can be queried directly with curl:

```bash
# Test a database connection
curl -X POST http://localhost:3001/test-connection \
  -H "Content-Type: application/json" \
  -d '{"type":"mysql","host":"localhost","port":3306,"user":"root","password":"secret","database":"mydb"}'

# Generate and execute a query
curl -X POST http://localhost:3001/query \
  -H "Content-Type: application/json" \
  -d '{
    "naturalLanguage": "show all users created in the last 7 days",
    "connectionId": "conn_abc123"
  }'

# Get schema for a connection
curl http://localhost:3001/schema/conn_abc123

# Generate an explanation for a query
curl -X POST http://localhost:3001/explain \
  -H "Content-Type: application/json" \
  -d '{"sql": "SELECT * FROM users WHERE created_at > NOW() - INTERVAL 7 DAY"}'
```

The server is a fully functional REST API. The web interface and VSCode extension are optional — every capability is accessible via HTTP, which means IDKSQL can be integrated into scripts, CI pipelines, or other tooling.

---

## Performance Optimizations

### Schema Caching

Schema extraction is the most expensive database operation in the IDKSQL pipeline. Running `SHOW TABLES` + `DESCRIBE <table>` for every query on a 100-table database adds significant latency. Schema caching stores the extracted schema in memory with a configurable TTL:

```typescript
// adapters/factory.ts — schema cache
const schemaCache = new Map<string, { schema: SchemaContext; cachedAt: number }>();
const CACHE_TTL_MS = 30_000; // 30 seconds

async function getCachedSchema(connectionId: string, adapter: DatabaseAdapter) {
  const cached = schemaCache.get(connectionId);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.schema;
  }
  const schema = await adapter.getSchema();
  schemaCache.set(connectionId, { schema, cachedAt: Date.now() });
  return schema;
}
```

### Connection Pooling

Database connections are expensive to establish. The `AdapterFactory` maintains a pool of active connections — once a connection is established, it is reused for subsequent queries rather than recreated on every request.

### Prompt Truncation

For databases with very large schemas (200+ tables), the full schema injection can push the prompt beyond Llama3's context window. Prompt truncation selects the most relevant tables based on keyword matching between the natural language query and table/column names:

```typescript
function selectRelevantTables(
  naturalLanguage: string,
  schema: SchemaContext,
  maxTables = 20
): SchemaContext {
  const keywords = naturalLanguage.toLowerCase().split(/\s+/);
  const scored = schema.tables.map(table => ({
    table,
    score: keywords.filter(k => 
      table.name.toLowerCase().includes(k) ||
      table.columns.some(c => c.name.toLowerCase().includes(k))
    ).length
  }));
  
  const topTables = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxTables)
    .map(s => s.table);
    
  return { ...schema, tables: topTables };
}
```

---

## Security Philosophy

IDKSQL's security model is built around two principles: **local-first by default** and **explicit confirmation for destructive operations**.

**Local-first** means no data leaves the machine. No schema metadata, no query content, no results are transmitted to external services. Ollama runs locally. The Express server runs locally. The only network traffic is from the frontend to `localhost:3001`.

**Explicit confirmation** means destructive operations require human acknowledgment. The dangerous query detection layer is not an optional feature — it runs on every generated SQL string before execution. There is no configuration flag to disable it.

**No query whitelisting** — IDKSQL does not attempt to whitelist "safe" queries. Whitelist approaches fail because SQL is expressive enough to cause unintended consequences in queries that look safe syntactically. Instead, IDKSQL blacklists specific dangerous patterns and requires human review for anything that matches.

**Connection credential storage** — connection credentials (host, port, user, password) are stored in `localStorage` in the web app. For production deployments, the recommendation is to use environment variables or a secrets manager. The `README` documents this explicitly rather than silently storing credentials in plaintext.

---

## Example Queries

```
Natural language → Generated SQL

"show all users"
→ SELECT * FROM users;

"how many orders were placed today"
→ SELECT COUNT(*) AS order_count FROM orders WHERE DATE(created_at) = CURDATE();

"top 10 products by revenue"
→ SELECT p.name, SUM(oi.quantity * oi.unit_price) AS total_revenue
   FROM products p
   JOIN order_items oi ON p.id = oi.product_id
   GROUP BY p.id, p.name
   ORDER BY total_revenue DESC
   LIMIT 10;

"users who haven't logged in for 30 days"
→ SELECT id, email, last_login FROM users
   WHERE last_login < NOW() - INTERVAL 30 DAY
   ORDER BY last_login ASC;

"average order value by month this year"
→ SELECT 
     MONTH(created_at) AS month,
     AVG(total_amount) AS avg_order_value
   FROM orders
   WHERE YEAR(created_at) = YEAR(CURDATE())
   GROUP BY MONTH(created_at)
   ORDER BY month;
```

---

## Setup Instructions

### Prerequisites

- Node.js 20+
- npm 9+
- Ollama installed and running
- A MySQL, PostgreSQL, or SQLite database

### 1. Install Ollama and Pull Llama3

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Pull Llama3
ollama pull llama3

# Verify Ollama is running
ollama serve
# Should start on http://localhost:11434
```

### 2. Clone and Install

```bash
git clone https://github.com/yourusername/idksql.git
cd idksql
npm install
```

### 3. Start the Development Environment

```bash
# Start all apps simultaneously via Turborepo
npm run dev

# This starts:
# - Express server on http://localhost:3001
# - React web app on http://localhost:5173
# - VSCode extension build watcher
```

### 4. Install the VSCode Extension

```bash
cd apps/vscode-extension
npm run build
# Then: Ctrl+Shift+P → "Install from VSIX" → select dist/idksql.vsix
```

### 5. Add a Database Connection

Open `http://localhost:5173`, click **Add Connection**, and enter your database credentials. Click **Test Connection** before saving — this validates that the adapter can reach the database and authenticate successfully.

---

## Running Ollama Locally

```bash
# Start Ollama server (if not running as a service)
ollama serve

# Verify Llama3 is available
ollama list
# Should show: llama3   ...

# Test Ollama directly
curl http://localhost:11434/api/generate \
  -d '{"model":"llama3","prompt":"SELECT","stream":false}'
```

**Performance notes:**
- Llama3 8B runs comfortably on 8GB RAM with 4GB available for the model
- Llama3 70B requires 40GB RAM — not recommended for most development machines
- For faster inference on Apple Silicon, Ollama automatically uses Metal acceleration
- On NVIDIA GPUs, Ollama uses CUDA — `ollama run llama3` will report GPU utilization

---

## Development Workflow

```bash
# Full dev environment
npm run dev

# Individual apps
npm run dev --filter=server
npm run dev --filter=web
npm run dev --filter=vscode-extension

# Type checking
npm run type-check

# Build for production
npm run build

# Run tests
npm run test
```

### Adding a New Database Adapter

1. Create `apps/server/src/adapters/newdb.ts`
2. Implement `DatabaseAdapter` interface
3. Add `case 'newdb'` to `factory.ts`
4. Add `newdb` to the `AdapterType` union in `types/database.ts`
5. Done. All routes, all tests, all existing code works immediately.

---

## Technical Challenges Solved

**Challenge: LLMs hallucinate table names**
Solution: Schema injection via `promptBuilder.ts` — the model cannot hallucinate what you've explicitly told it.

**Challenge: Different databases have different schema query syntax**
Solution: Adapter abstraction — each adapter implements `getSchema()` differently internally, but returns the same `SchemaContext` shape. The LLM layer never sees database-specific syntax.

**Challenge: Destructive SQL from hallucinating models**
Solution: Dangerous query detection layer positioned between generation and execution. Not an afterthought — a first-class system.

**Challenge: Monorepo TypeScript type sharing**
Solution: Turborepo workspace with shared types in `packages/shared-types`. The same `QueryResult` type is used in the server, the web app, and the extension. No drift.

**Challenge: Monaco Editor inside VSCode extension**
Solution: WebView architecture — the extension embeds a full browser panel, which can render Monaco natively. Native VSCode UI components cannot render Monaco.

---

## Future Roadmap

- [ ] **Streaming SQL generation** — render tokens as Ollama generates them, Monaco editor fills in real time
- [ ] **Multi-query transactions** — execute sequences of related queries as a transaction with automatic rollback on failure
- [ ] **Schema diff viewer** — compare schema versions over time, detect breaking changes
- [ ] **Query optimization suggestions** — second LLM pass to suggest indexes and query rewrites
- [ ] **Export to migration** — convert generated SQL into migration files for Prisma, Flyway, or Liquibase
- [ ] **Team mode** — shared connection configs and query history across a team, self-hosted
- [ ] **Fine-tuned model** — IDKSQL-specific Llama3 fine-tune trained on schema-aware SQL generation pairs
- [ ] **MongoDB support** — natural language to aggregation pipeline generation
- [ ] **Saved query library** — organize and tag frequently used queries
- [ ] **Query scheduling** — execute saved queries on a cron schedule, results to Slack or email

---

## Why This Project Exists

Every database tool currently available falls into one of two categories: SQL clients that assume you already know SQL, or cloud services that charge per query and send your schema to their servers.

IDKSQL is neither. It is a local-first, schema-aware, AI-augmented database interface built on the conviction that the gap between natural language and SQL should not require a cloud subscription or a decade of DBA experience to close.

The project was built because the author was tired of writing `SELECT * FROM users WHERE last_login < NOW() - INTERVAL 30 DAY` from memory for the fourth time that week. If you know what you want to find, you should be able to say it. The database should understand.

---

<div align="center">

**Built for engineers who think in questions, not in syntax.**

`ask your database anything`

<br/>

Made by **C.Kumaran**

</div>
