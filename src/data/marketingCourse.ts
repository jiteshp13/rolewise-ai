export interface Lesson {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: "hands-on" | "project" | "practice";
  prerequisites?: string[];
  steps: LessonStep[];
}

export interface LessonStep {
  type: "learn" | "practice" | "feedback" | "quiz";
  title: string;
  content: string;
  tips?: string[];
  prompt?: string;
  expectedElements?: string[];
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseProgress {
  completedLessons: string[];
  currentLesson: string | null;
  lessonProgress: Record<string, number>; // lesson id -> step index
  totalPoints: number;
  achievements: string[];
  streak: number;
  lastActivityDate: string;
}

export const marketingCourse: Lesson[] = [
  {
    id: "marketing-fundamentals",
    title: "AI Marketing Fundamentals",
    description: "Learn the basics of AI-powered marketing and how to get started",
    estimatedTime: "12 mins",
    difficulty: "Beginner",
    type: "hands-on",
    steps: [
      {
        type: "learn",
        title: "What is AI Marketing?",
        content: "AI marketing uses artificial intelligence to analyze customer data, predict behaviors, and automate marketing tasks. It helps you create more personalized campaigns, optimize ad spending, and improve customer experiences.",
        tips: [
          "AI can analyze millions of data points instantly",
          "Personalization increases engagement by 80%", 
          "Start small with one AI tool before expanding",
          "Always maintain human oversight and creativity"
        ]
      },
      {
        type: "quiz",
        title: "Knowledge Check",
        content: "Test your understanding of AI marketing basics",
        quizQuestions: [
          {
            question: "What is the primary benefit of AI in marketing?",
            options: [
              "Completely replacing human marketers",
              "Analyzing data and personalizing experiences at scale",
              "Making marketing campaigns more expensive",
              "Only working with large companies"
            ],
            correctAnswer: 1,
            explanation: "AI excels at processing large amounts of data to create personalized experiences that would be impossible to do manually at scale."
          },
          {
            question: "When starting with AI marketing, you should:",
            options: [
              "Implement every AI tool available",
              "Start with one tool and learn it well",
              "Only use AI for email marketing",
              "Wait until you have a large budget"
            ],
            correctAnswer: 1,
            explanation: "Starting with one AI tool allows you to learn its capabilities thoroughly and see measurable results before expanding."
          }
        ]
      },
      {
        type: "practice",
        title: "Identify AI Opportunities",
        content: "Think about your current marketing challenges and identify where AI could help. List 3 specific areas where AI could improve your marketing efforts.",
        prompt: "List 3 marketing challenges you face and explain how AI could help solve each one. Be specific about the tools or approaches you might use.",
        expectedElements: [
          "Specific marketing challenge",
          "AI solution explanation", 
          "Expected outcome",
          "Implementation approach"
        ]
      }
    ]
  },
  {
    id: "ai-content-creation",
    title: "AI-Powered Content Creation",
    description: "Master creating compelling content with AI assistance",
    estimatedTime: "15 mins",
    difficulty: "Beginner",
    type: "hands-on",
    prerequisites: ["marketing-fundamentals"],
    steps: [
      {
        type: "learn",
        title: "Content Creation with AI",
        content: "AI can help you generate ideas, write drafts, optimize headlines, and adapt content for different platforms. The key is learning to prompt effectively and maintain your brand voice.",
        tips: [
          "Always provide context about your audience",
          "Include your brand tone and style in prompts",
          "Use AI as a starting point, then refine",
          "Test different variations to see what works"
        ]
      },
      {
        type: "practice",
        title: "Write AI-Assisted Blog Post",
        content: "Create a blog post outline and introduction for a topic relevant to your business using AI assistance.",
        prompt: "Choose a topic relevant to your industry and create: 1) A compelling headline, 2) A detailed outline with 5 main points, 3) An engaging introduction paragraph. Use AI to help generate ideas and refine your content.",
        expectedElements: [
          "Attention-grabbing headline",
          "Logical content structure",
          "Engaging introduction",
          "Clear value proposition",
          "Target audience consideration"
        ]
      },
      {
        type: "practice",
        title: "Social Media Adaptation",
        content: "Take your blog content and adapt it for different social media platforms.",
        prompt: "Using your blog post content, create: 1) A LinkedIn post (professional tone), 2) A Twitter thread (3-4 tweets), 3) An Instagram caption with hashtags. Show how AI can help adapt content for different platforms.",
        expectedElements: [
          "Platform-appropriate tone",
          "Optimal post length",
          "Relevant hashtags",
          "Clear call-to-action",
          "Consistent brand message"
        ]
      }
    ]
  },
  {
    id: "ai-ad-copy-mastery",
    title: "AI Ad Copy Mastery",
    description: "Create high-converting ad copy using AI tools and proven frameworks",
    estimatedTime: "18 mins",
    difficulty: "Intermediate",
    type: "hands-on",
    prerequisites: ["ai-content-creation"],
    steps: [
      {
        type: "learn",
        title: "Ad Copy Frameworks and AI",
        content: "Learn proven frameworks like AIDA (Attention, Interest, Desire, Action) and PAS (Problem, Agitation, Solution) and how AI can help you apply them effectively.",
        tips: [
          "Start with a proven framework",
          "Use AI to generate multiple variations",
          "Test emotional vs. logical appeals",
          "Always include a clear call-to-action"
        ]
      },
      {
        type: "practice",
        title: "Facebook Ad Campaign",
        content: "Create a complete Facebook ad campaign for a product or service using AI assistance.",
        prompt: "Create a Facebook ad campaign with: 1) Primary headline, 2) Ad copy (2-3 sentences), 3) Call-to-action button, 4) Three ad variations for A/B testing. Target audience: working professionals aged 25-45 interested in productivity tools.",
        expectedElements: [
          "Compelling headline",
          "Benefit-focused copy",
          "Clear call-to-action",
          "Target audience alignment",
          "A/B test variations"
        ]
      },
      {
        type: "practice",
        title: "Google Ads Creation",
        content: "Write Google Ads copy optimized for search intent and character limits.",
        prompt: "Create Google Ads for the same product/service: 1) 3 headlines (30 chars each), 2) 2 descriptions (90 chars each), 3) Display URL path. Focus on search intent and include keywords naturally.",
        expectedElements: [
          "Character limit compliance",
          "Keyword integration",
          "Search intent matching",
          "Compelling descriptions",
          "Relevant display URL"
        ]
      }
    ]
  },
  {
    id: "email-marketing-ai",
    title: "AI-Enhanced Email Marketing",
    description: "Build effective email campaigns with AI for segmentation and personalization",
    estimatedTime: "20 mins",
    difficulty: "Intermediate",
    type: "project",
    prerequisites: ["ai-ad-copy-mastery"],
    steps: [
      {
        type: "learn",
        title: "AI Email Marketing Strategy",
        content: "AI can help with subject line optimization, send time prediction, content personalization, and automated sequences. Learn to balance automation with authentic communication.",
        tips: [
          "Personalize beyond just using names",
          "Segment based on behavior, not just demographics",
          "Test subject lines extensively",
          "Monitor engagement metrics closely"
        ]
      },
      {
        type: "practice",
        title: "Welcome Email Series",
        content: "Design a 3-email welcome sequence that introduces new subscribers to your brand.",
        prompt: "Create a 3-email welcome series: Email 1: Welcome & set expectations, Email 2: Valuable content/resource, Email 3: Social proof & next steps. Include subject lines and timing between emails.",
        expectedElements: [
          "Engaging subject lines",
          "Clear value proposition",
          "Progressive engagement",
          "Social proof elements",
          "Strategic timing"
        ]
      },
      {
        type: "practice",
        title: "Segmentation Strategy",
        content: "Develop an AI-powered email segmentation strategy for better targeting.",
        prompt: "Create an email segmentation strategy using AI insights: 1) Define 4 customer segments, 2) Describe the content strategy for each, 3) Explain how AI can help personalize messages, 4) Set up automated triggers.",
        expectedElements: [
          "Clear segment definitions",
          "Targeted content strategy",
          "Personalization approach",
          "Automation triggers",
          "Performance metrics"
        ]
      }
    ]
  },
  {
    id: "marketing-analytics-ai",
    title: "AI Marketing Analytics & Optimization",
    description: "Use AI to analyze performance and optimize marketing campaigns",
    estimatedTime: "25 mins",
    difficulty: "Advanced",
    type: "project",
    prerequisites: ["email-marketing-ai"],
    steps: [
      {
        type: "learn",
        title: "AI Analytics and Attribution",
        content: "AI can help you understand complex customer journeys, predict lifetime value, and optimize attribution models. Learn to use data to make better marketing decisions.",
        tips: [
          "Focus on actionable insights, not just data",
          "Use predictive analytics for budget allocation",
          "Track micro-conversions, not just sales",
          "Regularly audit your attribution model"
        ]
      },
      {
        type: "practice",
        title: "Campaign Performance Analysis",
        content: "Analyze a multi-channel marketing campaign and create optimization recommendations.",
        prompt: "Given campaign data (Email: 2.5% CTR, Social: 1.8% CTR, Paid Ads: 3.2% CTR, total budget $5000, 150 conversions), use AI thinking to: 1) Identify best performing channels, 2) Recommend budget reallocation, 3) Suggest 3 optimization tactics.",
        expectedElements: [
          "Data interpretation",
          "Channel performance comparison",
          "Budget optimization plan",
          "Specific improvement tactics",
          "Expected outcomes"
        ]
      },
      {
        type: "practice",
        title: "Predictive Marketing Plan",
        content: "Create a data-driven marketing plan using AI insights for the next quarter.",
        prompt: "Develop a Q1 marketing plan using AI analytics: 1) Predict customer acquisition costs by channel, 2) Identify seasonal trends, 3) Plan content calendar based on engagement patterns, 4) Set realistic goals with AI forecasting.",
        expectedElements: [
          "Data-driven predictions",
          "Seasonal considerations",
          "Content planning",
          "Realistic goal setting",
          "ROI projections"
        ]
      }
    ]
  }
];

export const defaultProgress: CourseProgress = {
  completedLessons: [],
  currentLesson: null,
  lessonProgress: {},
  totalPoints: 0,
  achievements: [],
  streak: 0,
  lastActivityDate: new Date().toISOString()
};

export const achievements = [
  {
    id: "first-lesson",
    name: "Getting Started",
    description: "Complete your first lesson",
    points: 50
  },
  {
    id: "content-creator",
    name: "Content Creator",
    description: "Complete the AI Content Creation lesson",
    points: 100
  },
  {
    id: "ad-expert",
    name: "Ad Copy Expert", 
    description: "Master AI-powered ad creation",
    points: 150
  },
  {
    id: "email-pro",
    name: "Email Marketing Pro",
    description: "Complete the email marketing course",
    points: 200
  },
  {
    id: "analytics-master",
    name: "Analytics Master",
    description: "Finish the complete marketing course",
    points: 300
  },
  {
    id: "streak-7",
    name: "Weekly Warrior",
    description: "Maintain a 7-day learning streak",
    points: 75
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Score 100% on all quizzes",
    points: 125
  }
];