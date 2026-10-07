// Copied verbatim from the frontend repo's data/projects.ts, data/experience.ts, data/github.ts
// so the DB starts out matching what's currently live on the site.

export const projectsSeed = [
  {
    slug: "e-learning-platform",
    name: "E-Learning Platform",
    kind: "Edtech · full-stack",
    status: "production",
    summary:
      "Course platform with 50+ REST APIs, Razorpay payments, multi-layer caching and resumable multi-GB video uploads. 10K+ downloads on the Play Store.",
    role: "Backend engineer — Code Brew Labs",
    featured: true,
    tech: [
      "Node.js", "TypeScript", "MongoDB", "Redis", "Bull", "AWS S3", "S3 Multipart",
      "STS", "Razorpay", "GitHub Actions", "Jest", "React",
    ],
    links: {
      github: "",
      live: "https://play.google.com/store/apps/details?id=com.rahulmalodia&hl=en_IN",
    },
    overview:
      "A full-stack learning platform where students browse a catalog, buy courses, packages and events, and stream long-form video. Instructors upload content; admins manage catalog, pricing, promos and access.",
    problem:
      "The platform had to serve read-heavy catalog traffic at low latency under high concurrency, take payments without ever double-charging or leaking access, and let instructors upload multi-GB videos over unreliable connections without restarting from zero.",
    contribution: [
      "Architected the backend — 50+ RESTful APIs across authentication, course management, payments and admin, with role-based access control.",
      "Owned the entire payment flow on Razorpay: order creation, signature verification, automated refunds, promo codes, loyalty points and GST e-invoice generation for course, package and event purchases.",
      "Built a multi-layer cache (in-memory + Redis) with Pub/Sub invalidation across instances, cutting API latency ~60% under high-concurrency traffic.",
      "Designed asynchronous, event-driven pipelines on Bull with retry, backoff and dead-letter handling to hold up throughput and fault tolerance under load.",
      "Built a secure S3 multipart upload pipeline using presigned URLs and STS tokens for resumable multi-GB video uploads across unstable networks.",
      "Set up CI/CD with GitHub Actions and wrote Jest unit + integration tests to catch regressions before deploy.",
      "Built React frontend modules (Context API, memoization, Axios) with a reusable component architecture for course management and user dashboards.",
    ],
    challenges: [
      { title: "Latency under concurrency", detail: "Catalog and course-detail reads dominated traffic and spiked hard. A two-tier cache (process memory in front of Redis) with Pub/Sub invalidation keeps every instance consistent on writes and dropped API latency ~60%." },
      { title: "Payment correctness", detail: "Retries and duplicate callbacks can double-charge or grant access without payment. Every Razorpay callback is signature-verified and idempotent; refunds, promos and loyalty points all resolve against one order record." },
      { title: "Large, unreliable uploads", detail: "Instructors upload multi-GB videos on flaky networks. Multipart upload with short-lived presigned URLs and STS credentials lets a client resume from the last completed part instead of restarting." },
      { title: "Throughput and failure isolation", detail: "Email, invoicing and post-purchase work can't block the request path or lose events. Bull queues with retry, exponential backoff and a dead-letter queue absorb spikes and quarantine poison jobs." },
    ],
    solution:
      "A layered Node.js/TypeScript service: thin controllers, a service layer that owns business rules, repositories over MongoDB. Reads go through the two-tier cache; writes publish invalidation. Payments run through a single order record with idempotent callbacks. Background work is queued on Bull. Uploads are brokered as multipart sessions against S3. CI/CD runs tests on every push via GitHub Actions.",
    features: [
      "Course, package and event purchases", "Razorpay payments, refunds, promo codes, loyalty points",
      "GST e-invoice generation", "Role-based access (student / instructor / admin)",
      "Resumable multi-GB video uploads", "Instructor and admin dashboards", "CI/CD with automated tests",
    ],
    architecture: [
      "React client (Context API, Axios)", "REST API — Node.js + TypeScript, RBAC",
      "Two-tier cache — in-memory + Redis (Pub/Sub invalidation)", "Bull queues — email, invoicing, post-purchase jobs",
      "MongoDB (primary data)", "AWS S3 — multipart video storage (presigned URLs + STS)", "External — Razorpay",
    ],
    outcome:
      "~60% reduction in API latency under high-concurrency traffic. Payment flow (orders, refunds, promos, GST e-invoicing) shipped end to end and running in production. The app has 10K+ downloads on the Play Store.",
    order: 0,
  },
  {
    slug: "portl-fitness",
    name: "Portl Fitness App",
    kind: "Health & fitness · backend",
    status: "production",
    summary: "Backend for a Shark Tank–featured fitness app — auth, workout analytics and admin reporting.",
    role: "Backend engineer — Code Brew Labs",
    featured: true,
    tech: ["Node.js", "TypeScript", "MongoDB", "MongoDB Aggregation", "REST APIs"],
    links: { github: "", live: "https://play.google.com/store/apps/details?id=com.portl.fitness&hl=en_IN" },
    overview:
      "Backend services for the Portl Fitness app (featured on Shark Tank): user authentication, workout tracking and analytics, and reporting for the admin team.",
    problem:
      "The product needed reliable auth and a way to turn a stream of raw workout events into weekly, monthly and yearly insights that admins could actually read — without slow, hand-rolled report queries.",
    contribution: [
      "Built authentication and core user services in Node.js, MongoDB and TypeScript.",
      "Built workout analytics — capturing activity and deriving per-user progress and trends.",
      "Developed analytics services using MongoDB aggregation pipelines to generate weekly, monthly and yearly insights for administrative dashboards.",
      "Built admin reporting endpoints on top of those aggregations.",
    ],
    challenges: [
      { title: "Reporting without heavy queries", detail: "Time-bucketed insights (week / month / year) are expensive if computed naively per request. MongoDB aggregation pipelines do the grouping and rollups in the database, close to the data." },
      { title: "Consistent time bucketing", detail: "Weekly / monthly / yearly boundaries have to be stable and timezone-correct so numbers don't shift between runs. Bucketing is centralized in the aggregation stage, not spread across callers." },
    ],
    solution:
      "Workout events are stored in MongoDB and rolled up through aggregation pipelines that produce the exact time buckets the admin dashboards need. Auth and user services follow the same layered Node.js/TypeScript structure as the rest of the platform.",
    features: ["User authentication", "Workout tracking and analytics", "Weekly / monthly / yearly insight generation", "Admin reporting endpoints"],
    architecture: ["Mobile client", "REST API — Node.js + TypeScript", "Analytics services — MongoDB aggregation pipelines", "MongoDB (events + rollups)"],
    outcome: "Analytics and reporting live in production for a Shark Tank–featured consumer app. TODO: add a store or press link if you'd like one shown.",
    order: 1,
  },
  {
    slug: "healthcare-data-systems",
    name: "Healthcare Data & Real-Time Systems",
    kind: "Healthtech · backend / data",
    status: "archived",
    summary: "SQL performance work, automated archiving, real-time comms, and Azure data pipelines for a healthcare product.",
    role: "Software Engineer — UpfrontHealthCare",
    featured: true,
    tech: ["MySQL", "SQL", "Stored Procedures", "Partitioning", "WebSockets", "Server-Sent Events", "Azure Data Factory", "Azure Dataflows"],
    links: { github: "", live: "" },
    overview:
      "Backend and data work for a healthcare platform: making reporting fast, keeping the production database lean, pushing real-time updates to clients, and moving large datasets reliably through Azure.",
    problem:
      "Reporting queries were slow and getting slower as data grew, the production database carried years of cold data it didn't need, clients needed live updates, and large healthcare datasets had to be ingested and cleaned before they were trustworthy.",
    contribution: [
      "Optimized high-latency SQL reporting queries with indexing, partitioning and execution-plan analysis, significantly improving retrieval performance.",
      "Built an automated data-archiving system using MySQL stored procedures and partitioning strategies to take cold data off the primary production database.",
      "Built low-latency real-time communication with WebSockets and Server-Sent Events, handling concurrent connections efficiently.",
      "Integrated and managed healthcare data pipelines on Azure Data Factory for processing and transforming large datasets.",
      "Implemented data cleansing and transformation workflows with Azure Dataflows to remove duplicates and improve data quality before storage.",
    ],
    challenges: [
      { title: "Queries that degrade with scale", detail: "Reporting slowed as tables grew. Execution-plan analysis drove targeted indexes and table partitioning so hot queries only touch the partitions they need." },
      { title: "A production DB carrying dead weight", detail: "Years of cold rows inflate every scan and backup. Scheduled stored procedures move aged data into partitioned archive tables automatically." },
      { title: "Real-time fan-out", detail: "Clients need live updates without polling. WebSockets for bidirectional flows and SSE for one-way streams, chosen per use case to keep connection handling cheap." },
      { title: "Trustworthy ingestion", detail: "Raw healthcare data has duplicates and inconsistencies. Azure Data Factory pipelines plus Dataflows cleansing steps normalize and de-duplicate before anything is stored." },
    ],
    solution:
      "Database layer: indexing + partitioning informed by execution plans, and stored-procedure-driven archiving on a schedule. Application layer: WebSocket and SSE channels for real-time updates. Data layer: Azure Data Factory orchestration with Dataflows for cleansing and transformation ahead of storage.",
    features: ["Optimized SQL reporting", "Automated, partitioned data archiving", "WebSocket + SSE real-time updates", "Azure Data Factory ingestion pipelines", "Dataflows-based cleansing and de-duplication"],
    architecture: ["Clients (real-time: WebSocket / SSE)", "Application services", "MySQL — indexed + partitioned; archive tables", "Scheduled stored procedures — archiving", "Azure Data Factory + Dataflows — ingest, clean, transform"],
    outcome: "Significantly faster reporting, a lighter production database, and reliable ingestion of large healthcare datasets.",
    order: 2,
  },
];

export const experienceSeed = [
  {
    period: "Feb 2024 — Present",
    role: "Software Engineer",
    company: "Code Brew Labs",
    location: "Chandigarh",
    points: [
      "Architected the backend for an E-learning platform (Node.js, MongoDB, Redis, AWS S3) — 50+ REST APIs across auth, courses, payments and admin with role-based access control.",
      "Owned the full payment flow with Razorpay: order creation, signature verification, automated refunds, promo codes, loyalty points and GST e-invoice generation.",
      "Built multi-layer caching (in-memory + Redis) with Pub/Sub invalidation, cutting API latency ~60% under high-concurrency traffic.",
      "Designed event-driven pipelines on Bull with retry, backoff and dead-letter handling for throughput and fault tolerance.",
      "Set up CI/CD with GitHub Actions and wrote Jest unit + integration tests to catch regressions before deploy.",
      "Built a secure S3 multipart upload pipeline (presigned URLs + STS tokens) for resumable multi-GB course-video uploads over unstable networks.",
      "Developed backend services for the Portl Fitness app (Shark Tank featured) — auth, workout analytics and admin reporting in Node.js, MongoDB and TypeScript.",
      "Mentored 4 interns: code reviews, best practices and backend guidance on Node.js and MongoDB.",
    ],
    order: 0,
  },
  {
    period: "Jun 2023 — Jan 2024",
    role: "Software Engineer",
    company: "UpfrontHealthCare",
    location: "Mohali",
    points: [
      "Optimized high-latency SQL reporting queries with indexing, partitioning and execution-plan analysis for significantly faster data retrieval.",
      "Built an automated data-archiving system using MySQL stored procedures and partitioning to reduce load on the primary production database.",
      "Built low-latency real-time communication with WebSockets and Server-Sent Events, handling concurrent connections efficiently.",
      "Integrated healthcare data pipelines on Azure Data Factory and built cleansing/transformation workflows with Azure Dataflows to improve data quality before storage.",
    ],
    order: 1,
  },
  {
    period: "2019 — 2023",
    role: "B.Tech, Computer Science",
    company: "Chitkara University",
    location: "CGPA 9.4 / 10",
    points: [
      "LeetCode (chirag_0401): 400+ problems solved; Top SQL 50 and 100 Days badges. Strong in recursion, backtracking and trees.",
    ],
    order: 2,
  },
];

export const githubSeed = {
  profile: "https://github.com/chirag858",
  handle: "chirag858",
  leetcode: "https://leetcode.com/u/chirag_0401/",
  blurb:
    "Consistent problem-solving practice and backend experiments. 400+ problems solved on LeetCode, with Top SQL 50 and 100 Days badges — strongest in recursion, backtracking and trees.",
  repos: [
    { name: "repo-one", description: "TODO: pick a real repository — a utility, experiment or project you want to show.", language: "TypeScript", href: "https://github.com/chirag858" },
    { name: "repo-two", description: "TODO: pick a real repository.", language: "JavaScript", href: "https://github.com/chirag858" },
    { name: "repo-three", description: "TODO: pick a real repository.", language: "TypeScript", href: "https://github.com/chirag858" },
  ],
  highlights: ["400+ LeetCode problems solved", "Top SQL 50 + 100 Days badges", "Recursion, backtracking and trees"],
};
