import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Sparkles, Clock } from "lucide-react";

interface LessonInterfaceProps {
  lessonId: string;
  onBack: () => void;
}

const LessonInterface = ({ lessonId, onBack }: LessonInterfaceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [aiCoachFeedback, setAiCoachFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock lesson data - in real app this would come from API
  const lessons = {
    "marketing-ad-copy": {
      id: "marketing-ad-copy",
      title: "AI-Powered Ad Copy Creation",
      description: "Learn to create compelling ad copy using AI tools",
      estimatedTime: "8 mins",
      role: "Marketing",
      steps: [
        {
          type: "learn",
          title: "Understanding AI Ad Copy Principles",
          content: "AI can help you create more effective ad copy by analyzing successful patterns and suggesting improvements. Key principles include clarity, emotional appeal, and strong calls-to-action.",
          tips: ["Keep your target audience in mind", "Test multiple variations", "Focus on benefits over features"]
        },
        {
          type: "practice",
          title: "Create Your First AI Ad Copy",
          content: "Now it's your turn! Create an ad copy for a fitness app targeting busy professionals. Use the AI coach to guide you.",
          prompt: "Write a Facebook ad copy for a fitness app called 'FitLife' targeting busy professionals aged 25-40. Focus on convenience and quick workouts.",
          expectedElements: ["Target audience mention", "App name", "Key benefit", "Call to action"]
        },
        {
          type: "feedback",
          title: "AI Coach Review",
          content: "Let's review your ad copy with our AI coach and see how it can be improved."
        }
      ]
    },
    "hr-job-description": {
      id: "hr-job-description",
      title: "AI-Assisted Job Description Writing",
      description: "Create compelling job descriptions that attract top talent",
      estimatedTime: "10 mins",
      role: "HR",
      steps: [
        {
          type: "learn",
          title: "Modern Job Description Best Practices",
          content: "AI can help you write job descriptions that are inclusive, engaging, and effective at attracting qualified candidates. Focus on clear responsibilities, growth opportunities, and company culture.",
          tips: ["Use inclusive language", "Highlight growth opportunities", "Be specific about requirements", "Include company values"]
        },
        {
          type: "practice",
          title: "Write a Software Developer Job Description",
          content: "Create a job description for a mid-level software developer position at a startup. Make it engaging and inclusive.",
          prompt: "Write a job description for a Mid-Level Software Developer at a fast-growing fintech startup. Include responsibilities, requirements, and what makes this role exciting.",
          expectedElements: ["Clear role title", "Key responsibilities", "Required skills", "Company culture", "Growth opportunities"]
        },
        {
          type: "feedback",
          title: "AI Coach Review",
          content: "Let's analyze your job description and make it even more compelling for candidates."
        }
      ]
    },
    "support-response": {
      id: "support-response",
      title: "AI-Enhanced Customer Support",
      description: "Handle customer inquiries with AI-powered responses",
      estimatedTime: "7 mins",
      role: "Customer Support",
      steps: [
        {
          type: "learn",
          title: "Empathetic AI-Assisted Responses",
          content: "Learn to use AI to craft responses that are both efficient and empathetic. AI can help you address customer concerns while maintaining a personal touch.",
          tips: ["Acknowledge the customer's feelings", "Provide clear solutions", "Use positive language", "Follow up appropriately"]
        },
        {
          type: "practice",
          title: "Handle a Billing Complaint",
          content: "A customer is frustrated about an unexpected charge on their account. Craft a response that addresses their concern professionally.",
          prompt: "Customer says: 'I was charged $29.99 but I thought I was on the free plan. This is ridiculous!' Write a helpful, empathetic response.",
          expectedElements: ["Acknowledge frustration", "Apologize for confusion", "Explain the situation", "Offer solution", "Next steps"]
        },
        {
          type: "feedback",
          title: "AI Coach Review",
          content: "Let's review your response and see how to make it even more effective and empathetic."
        }
      ]
    },
    "ops-automation": {
      id: "ops-automation",
      title: "Workflow Automation with AI",
      description: "Streamline operations using AI-powered automation",
      estimatedTime: "12 mins",
      role: "Operations",
      steps: [
        {
          type: "learn",
          title: "Identifying Automation Opportunities",
          content: "AI can help identify repetitive tasks and suggest automation workflows. Learn to spot processes that can be streamlined and improved.",
          tips: ["Look for repetitive tasks", "Consider data processing needs", "Think about approval workflows", "Focus on time-consuming processes"]
        },
        {
          type: "practice",
          title: "Design an Invoice Processing Workflow",
          content: "Design an automated workflow for processing incoming invoices using AI tools.",
          prompt: "Describe a workflow to automatically process incoming invoices: extract data, validate information, route for approval, and update accounting systems.",
          expectedElements: ["Data extraction step", "Validation process", "Approval routing", "System integration", "Error handling"]
        },
        {
          type: "feedback",
          title: "AI Coach Review",
          content: "Let's optimize your workflow design and identify additional automation opportunities."
        }
      ]
    }
  };

  const lesson = lessons[lessonId as keyof typeof lessons];

  const currentStepData = lesson.steps[currentStep];

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitForReview = () => {
    // Generate AI feedback based on lesson type
    const feedbackTemplates = {
      "marketing-ad-copy": `Great start! Your ad copy includes key elements. Here are some suggestions to make it even better:

✅ **What's working well:**
- Clear target audience identification
- Addresses a genuine pain point
- Includes a call-to-action

🚀 **Suggestions for improvement:**
1. Add a specific time benefit (e.g., "5-minute workouts")
2. Include a stronger emotional hook
3. Make the call-to-action more urgent
4. Add social proof or statistics

**Improved version:**
"Busy professional? Get fit in just 5 minutes with FitLife! Our AI-powered workouts fit perfectly into your hectic schedule. Join 50k+ professionals who've transformed their health without sacrificing career goals. Download FitLife now - your future self will thank you!"

This version is more specific, emotionally engaging, and includes social proof.`,

      "hr-job-description": `Excellent foundation! Your job description captures the key elements. Here's how to make it even more compelling:

✅ **What's working well:**
- Clear role title and responsibilities
- Mentions required skills
- Shows company personality

🚀 **Suggestions for improvement:**
1. Use more inclusive language (avoid gender-coded words)
2. Highlight growth opportunities more prominently
3. Add specific examples of projects they'll work on
4. Include company values and culture

**Enhanced version:**
"Mid-Level Software Developer - Join Our Fintech Revolution! 🚀

Ready to shape the future of finance? We're seeking a passionate developer to build cutting-edge solutions that help millions manage their money better.

What you'll do:
• Develop secure, scalable financial applications
• Collaborate with cross-functional teams on user-focused features
• Mentor junior developers and shape our tech culture

This role offers tremendous growth opportunities in a fast-paced, learning-focused environment."`,

      "support-response": `Well done! Your response shows empathy and addresses the issue. Here's how to make it even more effective:

✅ **What's working well:**
- Acknowledges customer frustration
- Takes responsibility appropriately
- Offers a clear solution

🚀 **Suggestions for improvement:**
1. Start with stronger empathy acknowledgment
2. Explain the situation more clearly
3. Provide multiple solution options
4. Include proactive follow-up

**Improved response:**
"I completely understand your frustration about this unexpected charge - that would be concerning for anyone! I sincerely apologize for the confusion.

Let me explain what happened and fix this immediately:
[Explanation of billing situation]

Here's what I can do for you right away:
1. [Immediate solution]
2. [Alternative option]

I'll also follow up in 24 hours to ensure everything is resolved to your satisfaction. Is there anything else I can help clarify?"`,

      "ops-automation": `Great workflow design! You've identified key automation points. Here's how to optimize it further:

✅ **What's working well:**
- Clear step-by-step process
- Identifies key automation points
- Considers error handling

🚀 **Suggestions for improvement:**
1. Add specific validation rules
2. Include performance metrics tracking
3. Define escalation procedures
4. Consider integration with existing systems

**Optimized workflow:**
"1. AI Document Processing: Extract data with 95% accuracy threshold
2. Smart Validation: Cross-check against vendor database and historical patterns
3. Intelligent Routing: Auto-approve under $500, route higher amounts based on department rules
4. Integration Hub: Update accounting system, notify stakeholders, track processing time
5. Continuous Learning: Monitor accuracy, update rules based on patterns"

This workflow includes specific thresholds, performance tracking, and continuous improvement mechanisms.`
    };

    const feedback = feedbackTemplates[lessonId as keyof typeof feedbackTemplates] || feedbackTemplates["marketing-ad-copy"];
    setAiCoachFeedback(feedback);
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            {lesson.estimatedTime}
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {lesson.steps.length}
            </span>
          </div>
          <Progress value={(currentStep + 1) / lesson.steps.length * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    {currentStepData.type === 'learn' && <Lightbulb className="w-4 h-4 text-white" />}
                    {currentStepData.type === 'practice' && <Sparkles className="w-4 h-4 text-white" />}
                    {currentStepData.type === 'feedback' && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{currentStepData.title}</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {currentStepData.content}
                </p>

                {currentStepData.type === 'learn' && currentStepData.tips && (
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Key Tips:</h3>
                    <ul className="space-y-1">
                      {currentStepData.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentStepData.type === 'practice' && (
                  <div className="space-y-4">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">Your Task:</h3>
                      <p className="text-sm text-muted-foreground">{currentStepData.prompt}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Response:
                      </label>
                      <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={`Write your ${lesson.role.toLowerCase()} response here...`}
                        className="min-h-32"
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitForReview} 
                      variant="hero"
                      disabled={!userInput.trim()}
                      className="w-full"
                    >
                      Get AI Coach Feedback
                    </Button>
                  </div>
                )}

                {currentStepData.type === 'feedback' && showFeedback && (
                  <div className="bg-gradient-secondary border border-border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">AI Coach Feedback</h3>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-line text-muted-foreground">
                        {aiCoachFeedback}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button 
                    variant="default"
                    onClick={handleNext}
                    disabled={currentStep === lesson.steps.length - 1}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Coach Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Coach</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground">
                    I'm here to guide you through this lesson. Feel free to experiment with different approaches!
                  </p>
                </div>
                
                {currentStepData.type === 'practice' && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <p className="text-primary text-xs font-medium mb-1">Pro Tip:</p>
                    <p className="text-muted-foreground text-xs">
                      Start with your target audience, then mention the key benefit that solves their problem.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Lesson Progress</h3>
              <div className="space-y-2">
                {lesson.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      index < currentStep 
                        ? 'bg-success text-white' 
                        : index === currentStep 
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index < currentStep ? <CheckCircle className="w-3 h-3" /> : index + 1}
                    </div>
                    <span className={`text-sm ${
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInterface;