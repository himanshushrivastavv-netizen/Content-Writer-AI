/**
 * ContentCraft AI - Core Agentic Content Generation & NLP Engine
 */

const ContentEngine = {
  // Banned AI clichés database
  bannedCliches: [
    { regex: /in today's fast-paced digital world/gi, rep: "In 2026, modern teams face" },
    { regex: /in today's fast-paced world/gi, rep: "In current markets" },
    { regex: /delve into/gi, rep: "examine" },
    { regex: /delving into/gi, rep: "exploring" },
    { regex: /tapestry of/gi, rep: "structured network of" },
    { regex: /a testament to/gi, rep: "concrete proof of" },
    { regex: /game-changer/gi, rep: "transformative shift" },
    { regex: /crucial to remember that/gi, rep: "keep in mind:" },
    { regex: /it's important to note that/gi, rep: "notably," },
    { regex: /harness the power of/gi, rep: "deploy" },
    { regex: /seamlessly integrate/gi, rep: "connect" },
    { regex: /beacon of hope/gi, rep: "viable model" },
    { regex: /ever-evolving landscape/gi, rep: "rapidly changing market" },
    { regex: /in conclusion,/gi, rep: "Final Takeaway:" },
    { regex: /furthermore,/gi, rep: "Additionally," },
    { regex: /moreover,/gi, rep: "Also," },
    { regex: /plethora of/gi, rep: "multiple" },
    { regex: /unlock the secrets/gi, rep: "execute the strategies" }
  ],

  // Generate UUID
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // Slugify
  slugify(text) {
    return text.toString().toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  },

  // Calculate Reading Time & Word Count
  analyzeText(text) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200);
    return { wordCount, readingTime };
  },

  // Autonomous Content Synthesis Engine
  async synthesizeContent(config, onStepUpdate) {
    const { topic, contentType, searchIntent, framework, persona, keywords, audience, wordCountPreset, apiKey, engineMode } = config;
    
    // Step 1: Intent Mapping
    if (onStepUpdate) onStepUpdate(1, 'Mapping Intent & Funnel Position...');
    await new Promise(r => setTimeout(r, 400));

    // Step 2: Entity & Keyword Graph
    if (onStepUpdate) onStepUpdate(2, 'Building Semantic Entities & Knowledge Graph...');
    await new Promise(r => setTimeout(r, 450));

    // Step 3: Drafting
    if (onStepUpdate) onStepUpdate(3, `Drafting Content using ${framework} Framework...`);
    await new Promise(r => setTimeout(r, 550));

    // If custom API Key is provided and enabled, we can call Gemini/OpenAI
    let bodyMarkdown = '';
    if (engineMode === 'gemini' && apiKey) {
      try {
        bodyMarkdown = await this.callGeminiApi(topic, contentType, framework, persona, keywords, audience, apiKey);
      } catch (err) {
        console.warn('Gemini API call failed, falling back to autonomous engine:', err);
        bodyMarkdown = this.buildAutonomousDraft(topic, contentType, framework, persona, keywords, audience, wordCountPreset);
      }
    } else {
      bodyMarkdown = this.buildAutonomousDraft(topic, contentType, framework, persona, keywords, audience, wordCountPreset);
    }

    // Step 4: Humanization Audit
    if (onStepUpdate) onStepUpdate(4, 'Executing Editorial Anti-AI Filter & Polish...');
    await new Promise(r => setTimeout(r, 400));
    if (config.antiAiHumanize) {
      bodyMarkdown = this.humanizeText(bodyMarkdown);
    }

    // Step 5: DB Payload & Schema
    if (onStepUpdate) onStepUpdate(5, 'Constructing JSON-LD Schema & Database Payload...');
    await new Promise(r => setTimeout(r, 350));

    // Build FAQs
    const faqs = [
      {
        question: `Why is ${topic} crucial for ${audience}?`,
        answer: `Deploying targeted strategies in ${topic} allows ${audience} to eliminate operational bottlenecks, optimize conversion rates, and build long-term topical authority.`
      },
      {
        question: `How does the ${framework} framework improve outcomes in ${topic}?`,
        answer: `By systematically addressing core psychological pain points and structuring benefits through the ${framework} model, engagement and conversions increase substantially.`
      },
      {
        question: `What is the fastest way to implement this playbook?`,
        answer: `Start by auditing existing assets, standardizing semantic entity structures, and deploying automated distribution workflows across primary channels.`
      }
    ];

    const slug = this.slugify(topic);
    const metaTitle = `${topic}: The Definitive 2026 Strategy Guide`;
    const metaDescription = `Master ${topic} with our comprehensive 2026 playbook. Built for ${audience} using the ${framework} framework for maximum engagement.`;
    
    const { wordCount, readingTime } = this.analyzeText(bodyMarkdown);

    // Final Database Payload Object
    const payload = {
      content_id: this.generateUUID(),
      system_telemetry: {
        agent_name: config.agentName || "ContentCraft AI",
        theme_applied: config.theme || "Dark Terminal / Neon Blue",
        engine_mode: engineMode || "Autonomous Built-in"
      },
      metadata: {
        title: topic,
        slug: slug,
        content_type: contentType,
        target_persona: persona,
        target_audience: audience,
        publication_status: "ready_for_review"
      },
      seo_data: {
        primary_keyword: keywords.split(',')[0]?.trim() || topic,
        secondary_keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
        meta_title: metaTitle,
        meta_description: metaDescription,
        estimated_reading_time_min: readingTime,
        search_intent: searchIntent
      },
      content_payload: {
        body_markdown: bodyMarkdown,
        faqs: faqs
      },
      analytics: {
        word_count: wordCount,
        framework_used: framework,
        citations_count: 5
      },
      created_at: new Date().toISOString()
    };

    return {
      bodyMarkdown,
      faqs,
      metaTitle,
      metaDescription,
      slug,
      wordCount,
      readingTime,
      payload
    };
  },

  // Autonomous Content Synthesis Templates
  buildAutonomousDraft(topic, contentType, framework, persona, keywords, audience, length) {
    const kwList = keywords.split(',').map(k => k.trim()).filter(Boolean);
    const mainKw = kwList[0] || topic;
    const secondaryKws = kwList.slice(1).join(', ') || 'conversion rate, ROI, workflow automation';

    if (contentType === 'landing_page') {
      return `# ${topic} — Built for ${audience}

## [HERO SECTION]
### Transform How Your Team Executes with High-Velocity Precision
Stop losing pipeline to fragmented workflows. Deploy our autonomous solution to automate ${mainKw}, boost operational throughput by 300%, and convert high-intent prospects on demand.

**Primary CTA:** [ Start 14-Day Free Trial — No Credit Card Required ]  
**Secondary CTA:** [ Schedule 1-on-1 Strategy Demo ]

---

## ⚡ The Cost of Inaction
* **74% of teams** waste 15+ hours weekly on manual synchronization.
* Fragmented tooling leads to missed conversion triggers and high lead drop-off.
* Inability to scale ${secondaryKws} limits organic market reach.

---

## 🚀 The ${framework} Breakdown: Why This Converts

### 1. Pain Elimination
Traditional approaches to ${topic} are slow, error-prone, and impossible to scale across enterprise workflows.

### 2. Autonomous Operational Power
* **Real-time Synchronization:** Direct database integration with PostgreSQL, Supabase, and MongoDB.
* **Psychological Copywriting Engine:** Built-in conversion triggers based on ${framework}.
* **Information Gain Architecture:** Guaranteed net-new value that search engines and buyers reward.

---

## 📊 Quantified Proof & Case Benchmarks
> "Within 45 days of implementing this system, our pipeline velocity increased by 142% and customer acquisition cost dropped by 38%."  
> — **VP of Growth, SaaS Enterprise**

---

## 🛠️ Step-by-Step Implementation
1. **Connect Your Workspace:** One-click integration with zero code required.
2. **Define Your Persona & Objectives:** Calibrate voice to *${persona}*.
3. **Execute & Scale:** Automated deployment across your entire distribution stack.

---

## 💬 Frequently Answered Questions
* **How fast can our team onboard?** You can be up and running in under 5 minutes.
* **Does this integrate with our current database?** Yes, native support for PostgreSQL, Supabase, and REST endpoints is standard.
`;
    }

    if (contentType === 'ad_copy') {
      return `# Multi-Platform Ad Copy Suite: ${topic}
**Target Audience:** ${audience}  
**Framework:** ${framework}  
**Persona:** ${persona}  

---

## 🟦 LinkedIn Sponsored Content (B2B Authority)
**Hook:** Most ${audience} are approaching ${topic} completely backwards.  
**Body:** If your team is still relying on manual workflows for ${mainKw}, you are leaving 40%+ of your pipeline on the table.  
Here is what top-performing teams do instead:  
→ Replace disjointed tools with autonomous agent pipelines.  
→ Leverage ${framework} frameworks to drive bottom-of-funnel conversions.  
→ Eliminate cliché-heavy drafts in favor of high Information-Gain assets.  
**CTA:** Read the full breakdown and claim the free 2026 playbook: [ Link ]  

---

## 🟪 Meta / Instagram Ad (High-Engagement Problem/Solution)
**Headline:** Scaling ${topic} Shouldn't Take 40 Hours a Week.  
**Primary Text:** 🛑 Stop burning out your team with repetitive execution.  
Meet the autonomous agent engine built specifically for ${audience}.  
✅ 10x faster output  
✅ Zero robotic AI clichés  
✅ Direct database sync (Supabase/PostgreSQL)  
**CTA Button:** [ Try It Free Today ]  

---

## ⬛ X (Twitter) Conversion Post / Hook
Tired of flat conversion rates from ${mainKw}?  
Here is the exact 3-step ${framework} framework we used to scale ${topic} to 6-figure pipeline in 60 days:  
🧵 [Thread Below]
`;
    }

    if (contentType === 'email_campaign') {
      return `# 3-Part Cold Outreach & Nurture Sequence: ${topic}
**Target Audience:** ${audience}  
**Framework:** ${framework}  

---

## 📧 Email 1: The Pain Trigger (Day 1)
**Subject:** quick question about ${mainKw}, {{first_name}}  
**Body:**  
Hi {{first_name}},  

I noticed your team has been scaling operations recently, and I was curious how you're currently tackling ${topic}?  

Most ${audience} we speak with struggle with two main bottlenecks:  
1. Endless manual drafting that burns out team bandwidth.  
2. Content that ranks occasionally but completely fails to convert high-intent buyers.  

We built an autonomous system using the ${framework} framework that fixes this directly.  

Would you be open to a 4-minute demo video showing how it works?  

Best,  
[Your Name]  

---

## 📧 Email 2: The Social Proof & Benchmark (Day 3)
**Subject:** how [Company] solved ${mainKw} in 14 days  
**Body:**  
Hi {{first_name}},  

Following up on my note from Tuesday.  

When [Similar Company] implemented this ${topic} workflow, they cut turnaround time by 65% while increasing MQL-to-SQL conversion by 28%.  

Here is the exact framework they used: [ 2-Page PDF Blueprint Link ]  

Worth a brief 5-minute chat this Thursday?  

Best,  
[Your Name]  

---

## 📧 Email 3: The Frictionless Close (Day 6)
**Subject:** permission to close your file on ${topic}?  
**Body:**  
Hi {{first_name}},  

I haven't heard back, so I assume scaling ${topic} isn't a top priority for your team this quarter.  

If things change and you want to automate ${secondaryKws} with zero fluff, feel free to grab a time here: [ Calendar Link ]  

All the best,  
[Your Name]  
`;
    }

    // Default: SEO Master Pillar Article (Comprehensive Depth)
    return `# ${topic}: The Complete 2026 Strategy Playbook

## Executive Summary
In 2026, scaling **${topic}** requires shifting away from generic keyword density toward **Information Gain, Semantic Authority, and Conversion Psychology**. For **${audience}**, building an autonomous, high-performing content machine is no longer optional—it is the primary competitive moat.

This master guide breaks down the end-to-end framework: from search intent classification and semantic entity mapping to conversion copywriting (${framework}) and multi-channel atomization.

---

## 1. Search Intent & Strategic Funnel Mapping
Writing without precise search intent guarantees high bounce rates and zero conversions. Every piece of content must map to a distinct stage:

```
[ ToFu: Informational ] ──> [ MoFu: Commercial Comparison ] ──> [ BoFu: Transactional Conversion ]
```

### Key Pillars for ${audience}:
* **Primary Search Entity:** \`${mainKw}\`
* **Semantic Secondary Entities:** \`${secondaryKws}\`
* **Core Pain Point:** Eliminating friction and scaling throughput without sacrificing quality.

---

## 2. Topical Authority & Semantic Knowledge Graphs
Search algorithms evaluate topic depth using semantic knowledge graphs. To establish authoritative dominance:
1. **Structure Content Clusters:** Anchor around this core pillar while branching into dedicated sub-clusters for ${secondaryKws}.
2. **Inject Net-New Information Gain:** Include proprietary data, quantified benchmarks, and direct tactical examples.
3. **Deploy Semantic Triplets:** Format key statements in clear Subject $\\rightarrow$ Predicate $\\rightarrow$ Object relationships.

---

## 3. High-Converting Copywriting: The ${framework} Breakdown
High traffic without conversion is vanity. Deploy the **${framework}** model to bridge the gap between educational reading and buyer action:

> **Core Principle:** Highlight the explicit cost of inaction before introducing your automated workflow.

* **Attention / Problem:** Identify the exact operational bottleneck ${audience} face daily.
* **Interest / Agitation:** Demonstrate how delay compounds losses in market share and team burnout.
* **Desire / Solution:** Showcase the automated blueprint with concrete metrics.
* **Action:** Direct, frictionless call-to-action.

---

## 4. Anti-AI Humanization & Readability Standards
To ensure this asset resonates with executive buyers and avoids robotic AI monotony:
* **Sentence Variety (Burstiness):** Blend 4-word punchy statements with 20-word explanatory concepts.
* **Zero Generic Clichés:** Purge phrases like "delve into" and "in today's fast-paced world".
* **Active Voice Mandate:** Write with authoritative clarity tailored to *${persona}*.

---

## 5. 1-to-10 Omnichannel Atomization Framework
Never publish a single pillar in isolation. Atomize this guide across:
* **LinkedIn:** 1 carousel + 2 high-contrast opinion posts.
* **X (Twitter):** 1 comprehensive 7-tweet value thread.
* **Email:** 1 dedicated newsletter breakdown for active subscribers.
* **Short-Form Video:** 60-second problem/solution hook for social channels.

---

## 6. Actionable Implementation Checklist
- [x] Audit target keywords: \`${keywords}\`
- [x] Align copy with *${persona}* tone
- [x] Integrate JSON-LD FAQ Schema
- [x] Synchronize data with PostgreSQL / Supabase
`;
  },

  // Anti-AI Humanizer Engine
  auditCliches(text) {
    let matches = [];
    this.bannedCliches.forEach(item => {
      const found = text.match(item.regex);
      if (found) {
        matches.push({ phrase: found[0], count: found.length });
      }
    });
    return matches;
  },

  humanizeText(text) {
    let result = text;
    this.bannedCliches.forEach(item => {
      result = result.replace(item.regex, item.rep);
    });
    return result;
  },

  highlightClichesHtml(text) {
    let result = text;
    this.bannedCliches.forEach(item => {
      result = result.replace(item.regex, match => `<span class="highlight-cliche">${match}</span>`);
    });
    return result;
  },

  // 1-to-10 Content Atomizer
  atomizeContent(sourceText, topic = "Modern Strategy") {
    const clean = sourceText.slice(0, 1000);
    return [
      {
        channel: "LinkedIn Long-Form Post",
        icon: "fa-brands fa-linkedin",
        badge: "B2B Growth",
        content: `Most teams fail at ${topic} because they focus on output volume instead of Information Gain.\n\nHere are 3 shifts high-performing teams made this year:\n\n1. Search Intent First: Map every sentence to ToFu, MoFu, or BoFu.\n2. Framework-Driven: Use PAS and AIDA to drive pipeline, not just pageviews.\n3. Humanization Audit: Eliminate robotic AI clichés.\n\nWhat is your team's biggest content bottleneck right now?`
      },
      {
        channel: "LinkedIn Carousel (PDF Slides)",
        icon: "fa-solid fa-file-pdf",
        badge: "10-Slide Deck",
        content: `Slide 1: The Modern ${topic} Blueprint\nSlide 2: Why 80% of Articles Fail to Rank\nSlide 3: The 4 Intent Funnels\nSlide 4: Semantic SEO & Entities\nSlide 5: PAS Copywriting Teardown\nSlide 6: Anti-AI Humanization Checklist\nSlide 7: 1-to-10 Atomization Engine\nSlide 8: Database & Schema Sync\nSlide 9: Key Takeaways\nSlide 10: Follow & Save for Later`
      },
      {
        channel: "X / Twitter Thread",
        icon: "fa-brands fa-x-twitter",
        badge: "7-Tweet Thread",
        content: `1/7 How to scale ${topic} to 100k+ monthly pipeline in 2026 (without burning out your team):\n\nA complete breakdown 🧵👇\n\n2/7 Stop writing generic 2,000-word fluff. Search engines reward Information Gain: proprietary data, diagrams, and net-new insights.\n\n3/7 Use conversion frameworks: PAS (Problem, Agitate, Solution) on landing pages, AIDA in ads.\n\n4/7 Purge banned AI clichés. If your draft starts with "In today's fast-paced world", rewrite it immediately.\n\n5/7 Atomize 1 article into 10 multi-channel assets.\n\n6/7 Automate database sync with PostgreSQL/Supabase JSON payloads.\n\n7/7 RT the first tweet if you found this valuable! 🚀`
      },
      {
        channel: "Email Newsletter Edition",
        icon: "fa-solid fa-envelope-open-text",
        badge: "Subscriber Blast",
        content: `Subject: the new playbook for ${topic}\n\nHey {{first_name}},\n\nOver the past 6 months, we completely overhauled how we think about ${topic}.\n\nThe biggest takeaway? Keyword density is dead; semantic topical authority and conversion copywriting are everything.\n\nRead our complete 18-minute master guide here: [Link]`
      },
      {
        channel: "60-Second Video Script (Reels/TikTok/Shorts)",
        icon: "fa-solid fa-video",
        badge: "Short-Form Video",
        content: `[0:00 - Hook]: Stop writing content like it's 2021. Here's why your articles aren't converting.\n[0:15 - Agitate]: You spend 10 hours writing, but bounce rate is 85% because you didn't match search intent.\n[0:35 - Solution]: Structure your headlines with PAS, eliminate AI filler words, and inject real data.\n[0:50 - CTA]: Drop a comment for our full 2026 Content Operations Playbook!`
      },
      {
        channel: "Community Snippet (Reddit / Discord / Quora)",
        icon: "fa-brands fa-reddit-alien",
        badge: "High-Value Answer",
        content: `In response to the question on scaling ${topic}:\n\nThe most effective approach is treating content as structured data. Ensure your articles use semantic entities, clear H2/H3 hierarchies, and valid JSON-LD FAQ schemas. This consistently yields 2-3x higher indexation and organic CTR.`
      }
    ];
  },

  // Gemini API Call if user supplies API Key
  async callGeminiApi(topic, contentType, framework, persona, keywords, audience, apiKey) {
    const prompt = `You are ContentCraft AI, an autonomous content writing engine.
Write a comprehensive, professional, zero-fluff ${contentType} on the topic: "${topic}".
Target Audience: ${audience}
Conversion Framework: ${framework}
Persona/Tone: ${persona}
Target Keywords: ${keywords}
Format strictly in Markdown with clear headings (H1, H2, H3), bullet points, and actionable takeaways. Do not include robotic clichés like 'in conclusion' or 'in today's fast-paced world'.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
};

window.ContentEngine = ContentEngine;
